const mongoose = require('mongoose')
const User = require('./models/UserSchema')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')

// After 5.0.0, mongoose has built-in Promsie
// mongoose.Promise = global.Promise;

app.use(bodyParser.json())

// false: Take an object with keys and values 
// true: Any type of encoded bodies.
app.use(bodyParser.urlencoded({extended: true})) 

/**
 * 'useFindAndModify': true by default. 
 * Set to false to make findOneAndUpdate() and findOneAndRemove() use native findOneAndUpdate() 
 * rather than findAndModify().
 */
mongoose.set('useFindAndModify', false)
// mongoose.set('useNewUrlParser', true)
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
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        isActive: req.body.isActive
    })

    newUser.save().then( (savedUser) => {
        console.log('saved user')
        res.status(200).send('saved user')
    }).catch((err) => {
        /**
         * Not safe, do not send err to user directly. 
         * Better save in log.
         * Status code: https://www.npmjs.com/package/http-status-codes
         */
        res.status(404).send(err)
    })
})

app.get('/users', (req, res) => {
    User.find({}).then((users) => {
        res.status(200).send(users)
    })
})

app.patch('/users/:id', (req, res) => {

    // difference between req.params & req.queries
    const id = req.params.id
    const firstName = req.body.firstName

    User.findByIdAndUpdate(id/* {_id: id} */, {
        $set: {firstName: firstName}
    }, {new: true})
        .then((savedUser) => {
            res.send('User saved by patch.')
        })
})

// app.put('/users/:id', (req, res) => {

//     // difference between req.params & req.queries
//     const id = req.params.id
//     const firstName = req.body.firstName
//     const lastName = req.body.lastName

//     User.findByIdAndUpdate(id/* {_id: id} */, {
//         $set: {
//             firstName: firstName,
//             lastName: lastName
//         }
//     }, {new: true})
//         .then((savedUser) => {
//             res.send('User saved by put request.')
//         })
// })

app.put('/users/:id', (req, res) => {
    User.findOne({_id: req.params.id}).then((user) => {
        user.firstName = req.body.firstName
        user.lastName = req.body.lastName
        return user.save()
    }).then((updatedUser) => {
        res.send(updatedUser)
    }).catch((err) => {
        console.log(err)
    })
})

// app.delete('/users/:id', (req, res) => {
//     User.findByIdAndRemove({_id: req.params.id}).then((userRemoved) => {
//         res.send(`User ${userRemoved.firstName} removed`)
//     })
// })

// app.delete('/users/:id', (req, res) => {
//     User.remove({_id: req.params.id}).then((userRemoved) => {
//         res.send('user remove' + userRemoved)
//     })
// })

app.delete('/users/:id', (req, res) => {
    User.findOne({_id: req.params.id}).then((user) => {
        return user.remove()
    }).then((userRemoved) => {
        res.send('user remove' + userRemoved)
    })
})



const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`listening on ${port}`)
})