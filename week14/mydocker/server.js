const http = require('http');

http.createServer((req, res) => {
    res.end('Hello from Docker Container!');
}).listen(3000);