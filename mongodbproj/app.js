// const MongoClient = require('mongodb').MongoClient
const {MongoClient, ObjectId} = require('mongodb')

MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true }, (err, client) => {
    if (err) throw err
    
    console.log('ObjectId = ', ObjectId())
    console.log('CONNECTERD')

    const db = client.db('animals')
    db.collection('mammals').insertOne({
        name: 'dog',
        legs: 4
    }, (err, result) => {
        if (err) return console.log(err)

        console.log('INSERTED')
        // console.log(result)
    })
})
