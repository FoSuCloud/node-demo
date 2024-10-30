const http = require('http')
const fs = require('fs')
const path = require('path')
const port = 9000;

const server =http.createServer((req,res)=>{
    console.log('url',req.url)
    // let arr=['http://localhost:80','http://192.168.65.2:3000','https://localhost:8080','http://localhost:63342','http://localhost:3001','http://localhost']
    // if(arr.includes(req.headers.origin)){
    res.setHeader('Cache-Control','no-cache')
    res.setHeader('Connection','keep-alive')
    res.setHeader('Access-Control-Allow-Origin','http://localhost:3001') // req.headers.origin
    res.setHeader('Access-Control-Allow-Credentials', 'true')
    // }
    // console.log('req',req.headers);
    setTimeout(()=>{
        res.end()
    },3000)
})

server.listen(port,()=>{
    console.log('start')
})


// const WebSocketServer = require('ws').Server
// const ws = new WebSocketServer({ port: 3000 });
//
// ws.on('connection', function connection(ws,req,res) {
//     console.log('ws : connection',req.headers,req.url)
//     ws.on('message', function incoming(message) {
//         console.log('ws',message)
//         ws.send('websocket服务器端');
//     });
//     setTimeout(()=>{
//         ws.send('11111');
//     },1000)
//     setTimeout(()=>{
//         ws.send('22222');
//     },10000)
// });
