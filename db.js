const {MongoClient} = require('mongodb')

const client = new MongoClient('mongodb+srv://todoAppUser:oliveira123@cluster0.6a5jlez.mongodb.net/ComplexApp')

async function start() {
    await client.connect()
    module.exports = client.db()
    const app = require('./app')
    app.listen(3000)
}   


start()