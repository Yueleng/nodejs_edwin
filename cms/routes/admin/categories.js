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
    Category.find({}).then((categories) => {
        res.render('admin/categories/index', {categories: categories})
    })
    
})

router.post('/create', (req, res) => {
    const newCategory = new Category({
        name: req.body.name
    })

    newCategory.save().then((savedCategory) => {
        res.redirect('/admin/categories')
    })  
})

router.get('/edit/:id', (req, res) => {
    Category.findOne({_id: req.params.id}).then((category) => {
        res.render('admin/categories/edit', {category: category})
    })
})


router.put('/edit/:id', (req, res) => {
    console.log('HERE')
    Category.findOne({_id: req.params.id}).then((category) => {
        category.name = req.body.name
        category.save().then((savedCategory) => {
            res.redirect('/admin/categories')
        })
        
    })
})

router.delete('/:id', (req, res) => {
    Category.deleteOne({_id: req.params.id}).then((result) => {
        res.redirect('/admin/categories')
    })
})

module.exports = router