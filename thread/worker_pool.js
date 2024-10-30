const { AsyncResource } = require('async_hooks');
const { EventEmitter } = require('events');
const path = require('path');
const { Worker } = require('worker_threads');

const kTaskInfo = Symbol('kTaskInfo');
const kWorkerFreedEvent = Symbol('kWorkerFreedEvent');

class WorkerPoolTaskInfo extends AsyncResource {
    constructor(callback) {
        super('WorkerPoolTaskInfo');
        this.callback = callback;
    }

    done(i, result) {
        // 在异步资源的执行上下文中使用提供的参数调用提供的函数。
        // 这将建立上下文，在回调前触发AsyncHooks，调用函数，在回调后触发AsyncHooks，然后恢复原来的执行上下文。
        console.log(`这是第${i}个线程`)
        this.runInAsyncScope(this.callback, null, i, result);
        this.emitDestroy();  // `TaskInfo`s are used only once.
    }
}

class WorkerPool extends EventEmitter {
    // 子线程数量
    constructor(numThreads) {
        super();
        this.workers = []; // 线程总数组
        this.freeWorkers = []; // 当前空闲的线程数组
        this.tasks = []; // 任务列表

        for (let i = 0; i < numThreads; i++)
            this.addNewWorker(i);

        // Any time the kWorkerFreedEvent is emitted, dispatch
        // the next task pending in the queue, if any.
        this.on(kWorkerFreedEvent, () => {
            if (this.tasks.length > 0) {
                const { task, callback } = this.tasks.shift();
                this.runTask(task, callback);
            }
        });
    }
    /*
    * 添加一个新的子线程
    * */
    addNewWorker(i) {
        const worker = new Worker(path.resolve(__dirname, 'task_processor.js'));
        // 监听子线程消息
        worker.on('message', (result) => {
            // In case of success: Call the callback that was passed to `runTask`,
            // remove the `TaskInfo` associated with the Worker, and mark it as free
            // again.
            worker[kTaskInfo].done(i, result);
            worker[kTaskInfo] = null;
            this.freeWorkers.push(worker);
            this.emit(kWorkerFreedEvent);
        });
        worker.on('error', (err) => {
            // In case of an uncaught exception: Call the callback that was passed to
            // `runTask` with the error.
            if (worker[kTaskInfo])
                worker[kTaskInfo].done(err, null);
            else
                this.emit('error', err);
            // Remove the worker from the list and start a new Worker to replace the
            // current one.
            this.workers.splice(this.workers.indexOf(worker), 1);
            this.addNewWorker();
        });
        this.workers.push(worker);
        this.freeWorkers.push(worker);
        this.emit(kWorkerFreedEvent);
    }
    /*
    * 执行任务
    * */
    runTask(task, callback) {
        if (this.freeWorkers.length === 0) {
            // No free threads, wait until a worker thread becomes free.
            this.tasks.push({ task, callback });
            return;
        }

        const worker = this.freeWorkers.pop();
        worker[kTaskInfo] = new WorkerPoolTaskInfo(callback);
        worker.postMessage(task);
    }
    /*
    * 销毁子线程
    * */
    close() {
        for (const worker of this.workers) worker.terminate();
    }
}

module.exports = WorkerPool;
