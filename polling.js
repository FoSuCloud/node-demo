
const http=require('http')
const port = 3000;

const server =http.createServer((req,res)=>{
    res.statusCode = 200
    let arr=['http://localhost:63342','http://localhost:3001']
    if(arr.includes(req.headers.origin)){
        res.setHeader('content-type','text/html; charset=utf-8')
        res.setHeader('Cache-Control','no-cache')
        res.setHeader('Connection','keep-alive')
        res.setHeader('Access-Control-Allow-Headers','content-type');
        res.setHeader('Access-Control-Allow-Origin',req.headers.origin) // req.headers.origin
        res.setHeader('Access-Control-Allow-Credentials', 'true')
    }
    res.setHeader('set-cookie','a="aaa";expires="Sun Jul 18 2032 10:31:45";domain=localhost')
    res.end(JSON.stringify(req.headers));
})


server.listen(port,()=>{
    console.log('start')
})
