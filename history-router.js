const http = require('http')
const fs = require('fs')
const httpPort = 3000

http.createServer((req, res) => {
    res.setHeader('Cache-Control','no-cache')
    res.setHeader('Connection','keep-alive')
    res.setHeader('Access-Control-Allow-Origin',req.headers.origin || '*') // req.headers.origin
    res.setHeader('Access-Control-Allow-Credentials', 'true')
    fs.readFile('dist/index.html', 'utf-8', (err, content) => {
        if (err) {
            console.log('We cannot open "index.html" file.')
        }

        res.writeHead(200, {
            'Content-Type': 'text/html; charset=utf-8'
        })

        res.end(content)
    })
}).listen(httpPort, () => {
    console.log('Server listening on: http://localhost:%s', httpPort)
})
