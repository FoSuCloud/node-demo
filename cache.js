const http = require('http')
const fs = require('fs')
const crypto = require('crypto')
const port =3000;


function getHash(){
    let md5 = crypto.createHash('md5')
    md5.update('some data to hash'+new Date());
    return md5.digest('base64');
}
let etag = getHash()
let serve = http.createServer((req,res)=>{
    console.log(req.url)
    if(req.url === '/img'){
        res.setHeader('Access-Control-Allow-Origin','http://localhost:63342')
        // res.setHeader('Expires', new Date(Date.now()+300000))
        res.setHeader('cache-control','max-age=2000')
        let file = fs.readFileSync('dist/img/3.png')
        res.end(file)
    }else{
        res.end('hello')
    }
})

serve.listen(port,()=>{
    console.log('listen to '+ port)
})
