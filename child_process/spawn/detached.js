function main(){
    const { spawn } = require('node:child_process');
    console.log('argv[0]:',process.argv[0]) // xxx/.nvm/versions/node/v16.18.0/bin/node
    const subprocess = spawn(process.argv[0], ['child_program.js'], {
        detached: true,
        stdio: 'ignore'
    });

    subprocess.unref();
}
// main()
// 我们先执行 node detached.js
// 然后打开一个新的终端，输入 ps ax | grep node
// 可以看到  /Users/xx/.nvm/versions/node/v16.18.0/bin/node child_program.js
// todo 说明即使我们的父进程退出了。子进程还是可以独立于父进程，继续在后台运行

// 除了ignore stdio，还可以将子进程的输出重定向到文件中
function other(){
    const fs = require('node:fs');
    const { spawn } = require('node:child_process');
    const out = fs.openSync('./out.log', 'a');
    const err = fs.openSync('./out.log', 'a');
    // 子进程也能在后台运行。我们同时可以看到把out err的结果也输出到日志文件了
    const subprocess = spawn(process.argv[0], ['child_program.js'], {
        detached: true,
        stdio: [ 'ignore', out, err ]
    });

    subprocess.unref();
}

other()
