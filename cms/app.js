const express = require('express')
const app = express()
const path = require('path')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

mongoose.connect('mongodb://localhost:27017/mongoose', {useNewUrlParser: true})
        .then((db) => {
            console.log('MONGO connected')
        }).catch((error) => {console.log(error)})


console.log('__dirname:', __dirname)

// all codes in static files have root directory: __dirname/public
app.use(express.static(path.join(__dirname, 'public')))

// Set View Engine
// views/layouts/home.handlebars
// if exphbs() without parameter, then app will search for views/layouts/main.handlebars
app.engine('handlebars', exphbs({defaultLayout: 'home'})) 
app.set('view engine', 'handlebars')

// Body Parser
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

// Load and use routes
const home = require('./routes/home/index')
const admin = require('./routes/admin/index')
const posts = require('./routes/admin/posts')
app.use('/', home)
app.use('/admin', admin)
app.use('/admin/posts', posts)


app.listen(3000, () => {
    console.log(`Server is listening on PORT: 3000`)
})