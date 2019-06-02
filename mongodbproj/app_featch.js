// const MongoClient = require('mongodb').MongoClient
const MongoClient = require('mongodb').MongoClient

MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true }, (err, client) => {
    if (err) throw err
    
    console.log('CONNECTERD')

    const db = client.db('animals')
    
    db.collection('mammals').find().toArray((err, result) => {
        if (err) throw err;

        console.log(result)
    })
})
