const express = require('express')
const app = express()
const path = require('path')
const exphbs = require('express-handlebars')

console.log('__dirname:', __dirname)

// all codes in static files have root directory: __dirname/public
app.use(express.static(path.join(__dirname, 'public')))

// Set View Engine
// views/layouts/home.handlebars
// if exphbs() then app will search for views/layouts/main.handlebars
app.engine('handlebars', exphbs({defaultLayout: 'home'})) 
app.set('view engine', 'handlebars')

// Load and use routes
const home = require('./routes/home/index')
const admin = require('./routes/admin/index')
app.use('/', home)
app.use('/admin', admin)


app.listen(3000, () => {
    console.log(`Server is listening on PORT: 3000`)
})