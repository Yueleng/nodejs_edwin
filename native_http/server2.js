const http = require('http')

const server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('<h1>Hi guys, this is Alan</h1>')
})

server.listen(3100, () => {
    console.log('Our server is running at 3100')
})

