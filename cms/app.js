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
const {mongoDbUrl} = require('./config/database')
const passport = require('passport')

mongoose.connect(mongoDbUrl, {useNewUrlParser: true, useFindAndModify: false})
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

// PASSPORT
app.use(passport.initialize())
app.use(passport.session())

app.use((req, res, next) => {
    res.locals.user = req.user || null
    res.locals.success_message = req.flash('success_message')
    res.locals.error_message = req.flash('error_message')
    res.locals.form_errors = req.flash('form_errors')
    res.locals.error = req.flash('error')
    next()
})

// all codes in static files have root directory: __dirname/public
app.use(express.static(path.join(__dirname, 'public')))

// helper function
const {select, generateDate, paginate} = require('./helpers/handlebars-helpers');

// Method Override
app.use(methodOverride('_method'))

// Set View Engine
// views/layouts/home.handlebars
// if exphbs() without parameter, then app will search for views/layouts/main.handlebars
// as defaultLayout
app.engine('handlebars', exphbs({defaultLayout: 'home', helpers: {select: select, generateDate: generateDate, paginate: paginate}}))
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
const categories = require('./routes/admin/categories')
const comments = require('./routes/admin/comments')

app.use('/', home)
app.use('/admin', admin)
app.use('/admin/posts', posts)
app.use('/admin/categories', categories)
app.use('/admin/comments', comments)

app.listen(3000, () => {
    console.log(`Server is listening on PORT: 3000`)
})