const https = require('https')
const fs= require('fs')
const path = require('path')

let serve = https.createServer({
    key: fs.readFileSync(path.join(__dirname,'./ssl/key.pem')),
    cert: fs.readFileSync(path.join(__dirname,'./ssl/ca.pem'))
},(req,res)=>{

    res.setHeader('content-type','image/png,image/jpeg;charset=UTF-8') // req.headers.origin
    res.setHeader('Access-Control-Allow-Origin','http://localhost:63342') // req.headers.origin
    res.setHeader('Access-Control-Allow-Credentials', 'true')
    res.setHeader('cache-control', 'public,max-age=100000')

    let file = fs.readFileSync('dist/img/3.png')
    res.end(file)
    // console.log('url',req.url)
    // let arr=['http://localhost:63342','https://localhost:30443','https://localhost:3001','https://localhost:8081','https://172.20.189.128:8081']
    // if(arr.includes(req.headers.origin)){
    //     res.setHeader('content-type','text/html; charset=utf-8')
    //     res.setHeader('Cache-Control','no-cache')
    //     res.setHeader('Connection','keep-alive')
    //     res.setHeader('Access-Control-Allow-Origin',req.headers.origin) // req.headers.origin
    //     res.setHeader('Access-Control-Allow-Credentials', 'true')
    // }
    // res.statusCode=401
    // res.end()
    // const html = fs.readFileSync('csp.js', 'utf8');
    // res.end('csp')
})

serve.listen(3000)


