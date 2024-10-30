const net = require('net');
const server = net.createServer();
server.on('connection',(client) => {
    client.write('Hello ');
    client.write('World!\n');
    client.close()
})

server.listen('8000')
