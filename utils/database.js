const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient

let _db

const mongoConnect = (callback) => {
    MongoClient
        .connect("mongodb+srv://JohnDoe:nIiMOHbOi16uVwou@nodecluster.qflh4.mongodb.net/shop?retryWrites=true&w=majority")
        .then(client => {
            console.log("connection success".brightGreen)
            _db = client.db()
            callback()
        })
        .catch(err => {
            console.log("MongoClient".bold.bgRed, `${err}`.brightRed)
            throw err
        })
}

const getDb = () => _db ? _db : console.log("no database".bgRed)

exports.mongoConnect = mongoConnect
exports.getDb = getDb