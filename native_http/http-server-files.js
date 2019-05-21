const http = require('http')
const fs = require('fs')

http.createServer((req, res) => {
    if (req.url === '/') {
        fs.readFile('./../file_system/global.html', 'UTF-8', (err, data) => {
            res.writeHead(200, {'Content-Type': 'text/html'})
            res.end(data)
        })
    } else {
        res.writeHead(404, {'Content-Type': 'text/plain'})
        res.end('404 ERROR Could not find your data')
    }
}).listen(3000, () => {
    console.log('Server is listening on port: 3000')
})