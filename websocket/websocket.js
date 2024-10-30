const WebSocket = require('ws');

// 创建 WebSocket 连接对象，指定连接的地址和端口
const ws = new WebSocket('ws://localhost:8080');

// 当 WebSocket 连接成功时，打印日志并发送一条消息
ws.on('open', function open() {
    console.log('WebSocket 连接成功！');
});

// 当收到 WebSocket 服务端发送的消息时，打印日志并关闭连接
ws.on('message', function incoming(data) {
    console.log(`客户端收到消息：${data}`);
});

// 当 WebSocket 连接关闭时，打印日志
ws.on('close', function close() {
    console.log('WebSocket 连接关闭！');
});
