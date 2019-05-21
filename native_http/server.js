const http = require('http')

const server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hi guys, this is Alan')
})

server.listen(3100, () => {
    console.log('Our server is running at 3100')
})

