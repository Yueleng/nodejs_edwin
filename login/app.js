const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const User = require('./models/User')
const bcrypt = require('bcryptjs')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

mongoose.set('useNewUrlParser', true)
mongoose.set('useCreateIndex', true)
mongoose.connect('mongodb://localhost:27017/login', () => {
    console.log('connected')
})

app.post('/register', (req, res) => {
    const newUser = new User()
    newUser.email = req.body.email
    newUser.password = req.body.password

    // encrypt the password
    bcrypt.genSalt(10, (err, salt) => {
        console.log('salt = ', salt)
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) return err
            newUser.password = hash
            
            newUser.save().then((userSaved) => {
                res.send('USER SAVED')
            }).catch((err) => {
                res.send('User was not saved because...' + err)
            })
        })
    })
})

app.post('/login', (req, res) => {
    User.findOne({email: req.body.email}).then((user) => {
        if (user) {
            bcrypt.compare(req.body.password, user.password, (err, matched) => {
                if (matched) {
                    res.status(200).send('USER WAS ABLE TO LOGIN')
                } else {
                    res.send('USER NOT ABLE TO LOGIN')
                }
            })
        }
    })
})

app.listen(3000, () => {
    console.log('listening on port 3000')
})