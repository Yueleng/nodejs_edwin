const router = require('express').Router()
const Post = require('../../models/Post')
const Category = require('../../models/Category')
const User = require('../../models/User')
const bcrypt = require('bcryptjs')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

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
        Category.find({}).then((categories) => {
            res.render('home/index', {posts: posts, categories: categories})
        })
    })
})

router.get('/about', (req, res) => {
    res.render('home/about')
})

router.get('/login', (req, res) => {
    res.render('home/login')
})

// APP LOGIN
passport.use(new LocalStrategy({
    usernameField: 'email'
}, (email, password, done) => {
    User.findOne({email: email}).then((user) => {
        console.log(email)
        if (!user) return done(null, false, {message: 'Incorrect username'})
        bcrypt.compare(password, user.password, (err, matched) => {
            if (err) return err

            if (matched) {
                return done(null, user)
            } else {
                return done(null, false, {message: 'Incorrect password.'})
            }
        })

    })
}))

passport.serializeUser(function(user, done) {
    done(null, user.id)
})

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user)
    })
    
})

router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/admin',
        failureRedirect: '/login',
        failureFlash: true
    })(req, res, next)
})

router.get('/logout', (req, res) => {
    req.logOut()
    res.redirect('/login')
})

router.get('/register', (req, res) => {
    res.render('home/register')
})

router.post('/register', (req, res) => {
    let errors = [];

    if (!req.body.firstName) {
        errors.push({message: 'please add a first name'});
    }

    if (!req.body.lastName) {
        errors.push({message: 'please add a last name'});
    }

    if (!req.body.email) {
        errors.push({message: 'please add an email'});
    }

    if ((!req.body.password) || (req.body.password !== req.body.passwordConfirm)) {
        errors.push({message: 'password empty or passwords does not math'})
    }

    if (errors.length > 0) {
        res.render('/home/register', {
            errors: errors,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email
        })
    } else {
        User.findOne({email: req.body.email}).then((user) => {
            if (user) {
                req.flash('error_message', 'That email exist please login')
                res.redirect('/login')
            } else {
                const newUser = new User({
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    password: req.body.password
                })
        
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        console.log(hash)
                        newUser.password = hash
                        newUser.save().then((savedUser) => {
                            req.flash('success_message', 'You are now registered, please login')
                            res.redirect('/login')
                        })
                    })
                })
            }
        })
    }

})

router.get('/post/:id', (req, res) => {
    Post.findOne({_id: req.params.id})
    // populate comments in order to show comments in post.handlebars
    // populate in populate. Since stucture is like: Post -> comments -> users
    .populate('user')
    .populate({path: 'comments', populate: {path: 'user'}})
    .then((post) => {
        Category.find({}).then((categories) => {
            res.render('home/post', {post: post, categories: categories})
        })
    })
})

module.exports = router