const router = require('express').Router()
const Post = require('../../models/Post')
const faker = require('faker')
const {userAuthenticated} = require('../../helpers/authentication')

// .render() automatically look under /views folder.
// Override the layout in admin route
// render() will now render into {{{body}}} of views/layouts/admin.handlebars
router.all('/*', (req, res, next) => {
    req.app.locals.layout = 'admin'
    next()
})

router.get('/', (req, res) => {
    res.render('admin/index')
})

router.post('/generate-fake-posts', (req, res) => {
    for (let i = 1; i < req.body.amount; i++) {
        let post = new Post()

        post.title = faker.name.title()
        post.status = 'public'
        post.allowComments = faker.random.boolean()
        post.body = faker.lorem.sentence()

        post.save((err) => {
            if (err) throw err;
        })
    }

    res.redirect('admin/posts')
})


// router.get('/dashboard', (req, res) => {
//     res.render('admin/dashboard')
// })



module.exports = router