const express = require('express')
const app = express()
const path = require('path')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const upload = require('express-fileupload')
const session = require('express-session')
const flash = require('connect-flash')


mongoose.connect('mongodb://localhost:27017/cms', {useNewUrlParser: true})
        .then((db) => {
            console.log('MONGO connected')
        }).catch((error) => {console.log(error)})


console.log('__dirname:', __dirname)

app.use(session({
    secret: 'alanwang_ilovecoding',
    resave: true,
    saveUninitialized: true
}))

app.use(flash())

app.use((req, res, next) => {
    res.locals.success_message = req.flash('success_message')
    next()
})

// all codes in static files have root directory: __dirname/public
app.use(express.static(path.join(__dirname, 'public')))

// helper function
const {select} = require('./helpers/handlebars-helpers');

// Method Override
app.use(methodOverride('_method'))

// Set View Engine
// views/layouts/home.handlebars
// if exphbs() without parameter, then app will search for views/layouts/main.handlebars
app.engine('handlebars', exphbs({defaultLayout: 'home', helpers: {select: select}}))
app.set('view engine', 'handlebars')

// Handle upload
app.use(upload())

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