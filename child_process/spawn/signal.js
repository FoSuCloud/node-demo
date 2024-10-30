// spawn  的option参数有一个signal
// signal <AbortSignal>允许使用 AbortSignal 中止子进程。
const { spawn } = require('node:child_process');
const controller = new AbortController();
const { signal } = controller;
const grep = spawn('grep', ['ssh'], { signal });
grep.on('error', (err) => {
    console.log('err:',err)
    // This will be called with err being an AbortError if the controller aborts
});
controller.abort(); // Stops the child process
// 另一个
const controller1 = new AbortController();
// 由于spawn是异步的，所以先执行controller1.abort()，spawn子进程还未执行ps ax
const ps = spawn('ps',['ax'],{signal:controller1.signal})
ps.on('error',(err)=>{
    console.log('ps err:',err)
})
controller1.abort(); // Stops the child process
