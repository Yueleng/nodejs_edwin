const router = require('express').Router()

// fetch PostSchema
const Post = require('../../models/Post');
const Category = require('../../models/Category')
const {isEmpty, uploadDir} = require('../../helpers/upload-helpers')
const fs = require('fs')
const path = require('path')



// .render() automatically look under /views folder.
// Override the layout in admin route
// render() will now render {{{body}}} of views/layouts/admin.handlebars
router.all('/*', (req, res, next) => {
    req.app.locals.layout = 'admin'
    next()
})

router.get('/', (req, res) => {
    Post.find({}).populate('category').then((posts) => {
        res.render('admin/posts', {posts: posts}) // find index.handlebars under /posts folder by default
    })
})

router.get('/create', (req, res) => {
    Category.find({}).then((categories) => {
        res.render('admin/posts/create', {categories: categories})
    })
})

router.post('/create', (req, res) => {
    let errors = [];

    if (!req.body.title) {
        errors.push({message: 'please add a title'});
    }

    if (!req.body.status) {
        errors.push({message: 'please add a status'});
    }

    if (!req.body.body) {
        errors.push({message: 'please add body'});
    }



    if (errors.length > 0) {
        res.render('admin/posts/create', {
            errors: errors
        })
    } else {
        let filename = 'bmw-m240i.jpg'
        if (!isEmpty(req.files)) {
            let file = req.files.file
            filename = Date.now() + '-' + file.name

            let dirUploads = './public/uploads/'

            file.mv(dirUploads + filename, (err) => {
                if (err) throw err
            })
        }
        

        let allowComments = true
        if (req.body.allowComments) {
            allowComments = true
        } else {
            allowComments = false
        }

        const newPost = new Post({
            title: req.body.title,
            status: req.body.status,
            allowComments: allowComments,
            body: req.body.body,
            category: req.body.category, // cat id
            file: filename
        })

        newPost.save().then((savedPost) => {
            req.flash('success_message', `Post ${savedPost.title} was created successfully`)
            res.redirect('/admin/posts')
        }).catch((validator) => {
            res.render('admin/posts/create', {error: validator.errors})
            console.log(validator.errors, 'could not save post')
        })
    }

    
})


router.get('/edit/:id', (req, res) => {
    
    Post.findOne({_id: req.params.id}).then((post) => {
        Category.find({}).then((categories) => {
            res.render('admin/posts/edit', {post: post, categories: categories})    
        })
        
    })
})

router.put('/edit/:id', (req, res) => {
    Post.findOne({_id: req.params.id})
        .then((post) => {
            let allowComments = false
            if (req.body.allowComments) {
                allowComments = true
            } else {
                allowComments = false
            }

            post.title = req.body.title
            post.status = req.body.status
            post.allowComments = allowComments
            post.body = req.body.body
            post.category = req.body.category

            if (!isEmpty(req.files)) {
                let file = req.files.file
                filename = Date.now() + '-' + file.name
                post.file = filename;
                let dirUploads = './public/uploads/'
    
                file.mv(dirUploads + filename, (err) => {
                    if (err) throw err
                })
            }

            post.save().then(updatePost => {
                req.flash('success_message', 'Post was successfully updated')
                res.redirect('/admin/posts')
            })

            
        })
})


router.delete('/:id', (req, res) => {
    Post.deleteOne({_id: req.params.id})
        .then((post) => {
            fs.unlink(uploadDir + post.file, (err) => {
                req.flash('success_message', 'Post was successfully deleted')
                res.redirect('/admin/posts')
            })
            
        })
})

// router.delete('/:id', (req, res) => {
//     Post.findOne({_id: req.params.id})
//         .then((post) => {
//             fs.unlink(uploadDir + post.file, (err) => {
//                 post.remove();
//                 req.flash('success_message', 'Post was successfully deleted')
//                 res.redirect('/admin/posts')
//             })
            
//         })
// })



module.exports = router;