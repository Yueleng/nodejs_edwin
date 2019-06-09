const express = require('express')
const app = express()
const path = require('path')
const exphbs = require('express-handlebars')

console.log('__dirname:', __dirname)

const admin = require('./routes/admin/index')
app.use('/', home)
app.use('/admin', admin)


app.listen(3000, () => {
    console.log(`Server is listening on PORT: 3000`)
})