const http2 = require('http2');
const fs = require('fs');
const path = require('path')
const server = http2.createSecureServer({
    key: fs.readFileSync(path.join(__dirname, './ssl/key.pem')),
    cert: fs.readFileSync(path.join(__dirname,'./ssl/ca.pem'))
},(req,res)=>{
    let origin='http://localhost:63342'
    console.log(req.url,req.headers.origin)
    if(req.headers.origin===origin){
        res.setHeader('Access-Control-Allow-Origin',req.headers.origin) // req.headers.origin
        res.setHeader('Access-Control-Allow-Credentials', 'true')
    }
    res.statusCode = 200
    let arr=['http://localhost:63342','https://localhost:3001']
    if(arr.includes(req.headers.origin)){
        res.setHeader('content-type','text/event-stream; charset=utf-8')
        res.setHeader('Cache-Control','no-cache')
        res.setHeader('Connection','keep-alive')
        res.setHeader('Access-Control-Allow-Origin',req.headers.origin) // req.headers.origin
        res.setHeader('Access-Control-Allow-Credentials', 'true')
    }
    res.setHeader('set-cookie','a="aaa";expires="Sun Jul 18 2032 10:31:45";domain=localhost')
    res.write(":连接成功，发送数据啦~\n"); // 注释，前端获取不到
    res.write('retry: 30000\n');
    let timer = setInterval(()=>{
        res.write("data: " + (new Date()) + "\n\n");
    },10000)

    // 监听连接关闭
    req.addListener('close',()=>{
        console.log('连接关闭了～')
        clearInterval(timer)
    })
});
// server.on('stream', (stream, headers) => {
//
//     stream.respond({
//         'Access-Control-Allow-Origin':'http://localhost:63342',
//         'Access-Control-Allow-Credentials':true
//     });
//
//     stream.pushStream({':path':'/'}, (err, pushStream, headers) => {
//         pushStream.respond({
//             ':status': 200,
//             'Access-Control-Allow-Origin':'http://localhost:63342'});
//         pushStream.end('data:{"time": "服务器数据"}',()=>{
//             console.log('推送结束')
//         });
//         pushStream.end('data:{"time": "服务器数据2"}',()=>{
//             console.log('推送结束')
//         });
//     });
//     stream.end('event:message')
// });

server.listen(3000,()=>{
    console.log('start')
});
