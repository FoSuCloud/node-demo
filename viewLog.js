const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    const filePath = path.join(__dirname, '/static/candy.onnx');
    const bufferSize = 10 * 1024 * 1024; // 10KB
    console.log('url:',req.url);
    // 获取文件的大小
    const fileSize = fs.statSync(filePath).size;
    // 计算需要读取的位置和长度
    const position = Math.max(0, fileSize - bufferSize);
    const length = fileSize - position;
    res.setHeader('file-name','candy.onnx')

    res.setHeader('Cache-Control','no-cache')
    res.setHeader('Connection','keep-alive')
    res.setHeader('Access-Control-Allow-Origin','http://localhost:5500') // req.headers.origin
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Credentials', 'true')
    // res.setHeader('Content-Type', 'text/plain')
    res.setHeader('Access-Control-Expose-Headers', 'file-name')
    res.setHeader('Content-Length', String(length))
    res.setHeader('Access-Control-Allow-Headers', 'file-name, Content-Type, access-control-allow-credentials');

    // 打开文件并读取数据到响应中
    fs.open(filePath, 'r', (err, fd) => {
        if (err) {
            console.error(err);
            res.end();
            return;
        }
        const buffer = Buffer.alloc(length);

        fs.read(fd, buffer, 0, length, position, (err, bytesRead, buffer) => {
            if (err) {
                console.error(err);
                res.end();
                return;
            }

            res.write(buffer.toString("utf-8"));
            res.end();

            fs.close(fd, (err) => {
                if (err) {
                    console.error(err);
                }
            });
        });
    });
});

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});
