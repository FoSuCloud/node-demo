const WorkerPool = require('./worker_pool.js');
const os = require('os');

const pool = new WorkerPool(os.cpus().length);

let finished = 0;
let sum = 100;
for (let i = 0; i < sum; i++) {
    pool.runTask({ a: 42, b: 100 }, (err, result) => {
        console.log(i, err, result);
        if (++finished === sum)
            pool.close();
    });
}
/*
* 工作流程：首先new WorkerPool 创建线程池
* 1. 执行任务runTask，在线程池中寻找一个空闲线程执行操作
* 2. 在操作执行完之前执行runInAsyncScope，调用回调函数，主线程的callback函数被执行
* 3. 执行了10次之后，销毁线程池pool.close()
* */
