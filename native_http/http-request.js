const https = require('https')
const fs = require('fs')

const url = 'https://jsonplaceholder.typicode.com/posts'

https.get(url, (res) => {
    res.setEncoding('utf8')

    let body = ''
    
    res.on('data', (data) => {
        body += data
    })
    
    res.on('end', () => {
        fs.writeFile('data.json', body, 'utf8', (err) => {
            if (err) return err
            console.log('Just pulled all the posts and created file')
            body = JSON.parse(body);
	        body.forEach(function(data) {	
  	            console.log(`The data is: ${data.title}`)
    	    });
        })
    })
})