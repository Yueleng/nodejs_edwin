const express = require('express')

let app = express()

// app.use('/css', (req, res, next) => {
//     console.log('MIDDLEWARE')

//     next();
// })

app.use('/css', express.static(__dirname + '/public'))

app.use((req, res, next) => {
    console.log('MIDDLEWARE')

    next();
})

app.get('/', (req, res) => {
    res.sendFile('global.html', {root: __dirname})
})


app.listen(3000, () => {
    console.log('It\'s working')
})