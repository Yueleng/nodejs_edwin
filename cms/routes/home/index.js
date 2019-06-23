const router = require('express').Router()

/**
 * render() automatically look under /views folder to find file.
 * force render() function render file into {{{body}}} of /views/layouts/home.handlebars
 * not compulsory unless `req.app.locals.layout` modified in other files.
 */
router.all('/*', (req, res, next) => {
    req.app.locals.layout = 'home'
    next()
})

router.get('/', (req, res) => {
    // render file views/home/index.handlebars
    // rendered into {{{body}}} of views/layouts/home.handlebars
    res.render('home/index')
})

router.get('/about', (req, res) => {
    res.render('home/about')
})

router.get('/login', (req, res) => {
    res.render('home/login')
})

router.get('/register', (req, res) => {
    res.render('home/register')
})

module.exports = router