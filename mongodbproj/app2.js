const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/animals', {useNewUrlParser: true})

mongoose.connection
    .once('open', () => {console.log('CONNECTED')})
    .on('error', (err) => {
        console.log(`could not connect`, err)
    })

