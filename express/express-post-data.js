const express= require('express')
const bodyParser = require('body-parser')


let app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use('/assets', express.static(__dirname + '/public'))

app.use((req, res, next) => {
    console.log('MIDDLEWARE')

    next()
})

app.post('/add-user', (req, res) => {
    console.log(`post request working ${req.body.email}`)
    console.log(req)
})

app.listen(3000, () => {
    console.log(`It's working`)
})