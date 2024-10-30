const { spawn } = require('node:child_process');
const subprocess = spawn('grep',['ax','a']);
const notfound = spawn('not found command');

notfound.on('error', (err) => {
    // 输出不存在的命令，就会被error监听到
    console.error('Failed to start subprocess.',err);
});
subprocess.stderr.on('data', (data) => {
    // 输入错误的命令(但是命令存在)就会进入stderr
    // subprocess stderr: grep: a: No such file or directory
    console.error(`subprocess stderr: ${data}`);
});
