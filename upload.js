const http = require('http')
const port = 3000;

const server =http.createServer((req,res)=>{
    let arr=['http://localhost:18080','http://localhost:8081','http://localhost:63342','http://localhost:3001','http://localhost']
    if(arr.includes(req.headers.origin)){
        res.setHeader('Cache-Control','no-cache')
        res.setHeader('Connection','keep-alive')
        res.setHeader('Access-Control-Allow-Origin','*') // req.headers.origin
        // res.setHeader('Access-Control-Allow-Credentials', 'true')
        // res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept');
    }

    res.statusCode = 200
    let buffers = []
    req.on('data',function (chunk){
        buffers.push(chunk)
    }).on('end',function (){
        setTimeout(()=> {
            res.end(JSON.stringify({code: 0, data:{id:1}}))
        },300)
    })
})

server.listen(port,()=>{
    console.log('start')
})
