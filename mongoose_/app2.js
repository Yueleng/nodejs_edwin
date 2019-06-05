const mongoose = require('mongoose')
const User = require('./models/UserSchema')

mongoose.connect('mongodb://localhost:27017/mongoose', {useNewUrlParser: true})
mongoose.connection
    .once('open', () => console.log('CONNECTED'))
    .on('error', (err) => {
        console.log(`could not connect`, err)
    })


const newUser = new User({
    firstName: 'Yueleng',
    lastName: 'Wang',
    isActive: 1
})

newUser.save((err, dataSaved) => {
    if (err) return err
    console.log(dataSaved)
})
