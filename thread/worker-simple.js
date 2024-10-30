const {Worker, isMainThread, parentPort, workerData} = require('worker_threads');
if (isMainThread) {
    // 刚开始处于主线程
    const worker = new Worker(__filename, {workerData: {num: 5}});
    // 创建一个子线程(当前文件作为子线程，传递数据为workerData)，监听消息
    worker.once('message', (result) => {
        console.log('square of 5 is :', result);
    })
} else {
    // 给主线程发送消息
    parentPort.postMessage(workerData.num * workerData.num)
}
