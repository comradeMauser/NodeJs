const getDb = require('../utils/database.js').getDb
const mongodb = require('mongodb')
const ObjectId = mongodb.ObjectID

class User {
    constructor(userName, email) {
        this.userName = userName
        this.email = email
    }

    save() {
        const db = getDb()
        return db.collection("users").insertOne(this)
    }

    static findById(userId) {
        const db = getDb()
        return db.collection("users").find({_id: ObjectId(userId)}).next()
            .then(user => {
                console.log(user)
                return user
            })
            .catch(err => console.log("User/save".bold.bgRed, `${err}`.brightRed))
    }
}

module.exports = User