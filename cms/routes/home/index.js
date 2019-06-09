const router = require('express').Router()

// .render() automatically look under /views folder.
router.get('/', (req, res) => {
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