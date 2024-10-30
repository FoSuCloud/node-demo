const { spawn } = require('node:child_process');
const ps = spawn('ps', ['ax']);
const grep = spawn('grep', ['ssh']);

ps.stdout.on('data', (data) => {
    // console.log('ps输出：',data.toString())
    // todo 相当于 ps ax | grep ssh
    // ps进程输出结束 ，进入写grep进程
    grep.stdin.write(data);
    // todo 写入之后就执行 grep ssh 'tmp临时文件（ps ax输出的内容）'
    // 执行完了就被grep.stdout监听到
});

ps.stderr.on('data', (data) => {
    console.error(`ps stderr: ${data}`);
});

ps.on('close', (code) => {
    if (code !== 0) {
        console.log(`ps process exited with code ${code}`);
    }
    grep.stdin.end();
});
// 监听到 grep.stdin.write 写入的数据
grep.stdout.on('data', (data) => {
    console.log('grep.stdout:',data.toString());
});

grep.stderr.on('data', (data) => {
    console.error(`grep stderr: ${data}`);
});

grep.on('close', (code) => {
    if (code !== 0) {
        console.log(`grep process exited with code ${code}`);
    }
});
