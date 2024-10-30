const WebSocket = require('ws');

// 创建 WebSocket 服务器
const server = new WebSocket.Server({ port: 8080 });
console.log('服务端启动');
// 监听连接事件
server.on('connection', (socket) => {
    console.log('客户端已连接');
    // nodejs是非阻塞的，要一直发要么开线程要么开进程，在这里选择阻塞住主线程即可
    for(let i=0;i<100000000;i++){
        socket.send(JSON.stringify({a:'aaa',b:Math.random(),c:'hello world',d:Math.random()}));
        console.log('发送中========');
    }
    console.log('结束');
    // 监听消息事件
    socket.on('message', (data) => {
        console.log('收到消息：', data);
    });

    // 监听关闭事件
    socket.on('close', () => {
        console.log('客户端已断开连接');
    });
});
