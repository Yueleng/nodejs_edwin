const router = require('express').Router()
const Post = require('../../models/Post')
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
    Post.find({}).then((posts) => {
        res.render('home/index', {posts: posts})

    })
    
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

router.get('/post/:id', (req, res) => {
    Post.findOne({_id: req.params.id})
        .then((post) => {
            res.render('home/post', {post: post})
        })    
})

module.exports = router