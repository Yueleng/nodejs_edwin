const mongoose = require('mongoose')
const User = require('./models/UserSchema')
const express = require('express')
const app = express()

// After 5.0.0, mongoose has built-in Promsie
// mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/mongoose', {useNewUrlParser: true})
mongoose.connection
    .once('open', () => console.log('CONNECTED'))
    .on('error', (err) => {
        console.log(`could not connect`, err)
    })

app.get('/', (req, res) => {
    res.send('ROOT')
})

app.post('/users', (req, res) => {
    const newUser = new User({
        firstName: "Maria",
        lastName: "Martinez"
    })

    newUser.save().then( (savedUser) => {
        console.log('saved user')
        res.status(200).send('saved user')
    })
})

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`listening on ${port}`)
})