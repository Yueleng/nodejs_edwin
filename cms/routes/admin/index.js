const router = require('express').Router()

// Override the layout in admin route
router.all('/*', (req, res, next) => {
    req.app.locals.layout = 'admin'
    next()
})

router.get('/', (req, res) => {
    res.render('admin/index')
})


module.exports = router