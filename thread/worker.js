const {Worker,isMainThread,parentPort,workerData} = require("worker_threads")
if(isMainThread){
    // 现在是主线程执行这端代码
    module.exports=function parseJSAsync(script){
        return new Promise((resolve, reject)=>{
            const worker = new Worker(__filename,{
                workerData: script
            })
            worker.on('message',(data)=>{
                console.log('message',data) // message { name: 'workerData', age: 11 }
                resolve(data)
            })
            worker.on('error',reject)
            worker.on('exit',(code)=>{
                if(code!==0){
                    reject(new Error(`worker stopped with exit code ${code}`))
                }
            })
        })
    }
}else{
    // 现在是子线程执行这段代码
    console.log("workerData:",workerData) // 接收到主线程传输过来的值 workerData: { name: 'parent', age: 11 }
    workerData.name="workerData"
    parentPort.postMessage(workerData);
}
