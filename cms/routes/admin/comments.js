const router = require('express').Router()
const Post = require('../../models/Post')
const Comment = require('../../models/Comment')

router.all('/*', (req, res, next) => {
    req.app.locals.layout = 'admin'
    next()
})

router.get('/', (req, res) => {
    Comment.find({user: req.user.id}).populate('user').then(comments => {
        res.render('admin/comments', {comments: comments}) // will render admin/comments/index.handlebars by default
    })
    
})

router.post('/', (req, res) => {
    Post.findOne({_id: req.body.id}).then(post => {
        const newComment = new Comment({
            user: req.user.id, // passport takes care of this
            body: req.body.body
        })

        post.comments.push(newComment)
        post.save().then(savedPost => {
            newComment.save().then(savedComment => {
                res.redirect(`/post/${post.id}`);
            })
        })
    })
})


router.delete('/:id', (req, res) => {
    Comment.findOneAndRemove({_id: req.params.id}).then(deletedItem => {
        // Delte comment references in the Post Document
        // $pull operator usage. Will delete the reference, if target does not exist any more.
        Post.findOneAndUpdate({comments: req.params.id}, {$pull: {comments: req.params.id}}, (err, data) => {
            if (err) console.log(err)
            res.redirect('/admin/comments')
        })
    })
})

router.post('/approve-comment', (req, res) => {
    res.send('IT WORKS')
})

module.exports = router