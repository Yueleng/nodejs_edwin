const express = require('express')

let app = express()
const port = process.env.PORT || 9999

app.get('/', (req, res) => {
    res.send('<h1> HELLO </h1>')
})

app.get('/api', (req, res) => {
    // res.send('API PAGE')
    res.json({name: 'Edwin'})
})

app.listen(port, () => {
    console.log('It\'s working')
    console.log(port)
})