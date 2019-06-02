const {MongoClient, ObjectId} = require('mongodb')

MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true }, (err, client) => {
    if (err) throw err
    
    console.log('CONNECTERD')

    const db = client.db('animals')
    
    db.collection('mammals').deleteOne({
        _id: new ObjectId('5cf429eac6562932584f5ad0')
    }).then((result) => {
        console.log(result)
    })
})