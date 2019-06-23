const router = require('express').Router()

// .render() automatically look under /views folder.
// Override the layout in admin route
// render() will now render into {{{admin}}} views/layouts/admin.handlebars
router.all('/*', (req, res, next) => {
    req.app.locals.layout = 'admin'
    next()
})

router.get('/', (req, res) => {
    res.send('IT WORKS')
})

router.get('/create', (req, res) => {
    res.render('admin/posts/create')
})

router.post('/create', (req, res) => {
    console.log(req.body)
    res.send('OK')
})



module.exports = router;