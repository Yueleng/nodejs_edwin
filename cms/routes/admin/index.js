const router = require('express').Router()

// .render() automatically look under /views folder.
// Override the layout in admin route
// render() will now render into {{{admin}}} views/layouts/admin.handlebars
router.all('/*', (req, res, next) => {
    req.app.locals.layout = 'admin'
    next()
})

router.get('/', (req, res) => {
    res.render('admin/index')
})


// router.get('/dashboard', (req, res) => {
//     res.render('admin/dashboard')
// })



module.exports = router