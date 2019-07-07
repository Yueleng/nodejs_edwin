const router = require('express').Router()
const faker = require('faker')
const Category = require('../../models/Category')

// .render() automatically look under /views folder.
// Override the layout in admin route
// render() will now render into {{{body}}} of views/layouts/admin.handlebars
router.all('/*', (req, res, next) => {
    req.app.locals.layout = 'admin'
    next()
})

router.get('/', (req, res) => {
    res.render('admin/categories/index')
})



module.exports = router