const getDb = require('../utils/database.js').getDb
const mongodb = require('mongodb')
const ObjectId = mongodb.ObjectID

class Product {
    constructor(title, price, imageUrl, description, id) {
        this.title = title
        this.price = price
        this.imageUrl = imageUrl
        this.description = description
        this._id = id ? new ObjectId(id) : null
    }

    save() {
        const db = getDb()
        let updDb
        if (this._id) {
            updDb = db.collection("products").updateOne({_id: this._id}, {$set: this})
        } else {
            updDb = db.collection("products").insertOne(this)
        }

        return updDb
            .then(result => {
                return result
            })
            .catch(err => console.log("db".bold.bgRed, `${err}`.brightRed))
    }

    static fetchAll() {
        const db = getDb()
        return db.collection("products").find().toArray()
            .then(products => products)
            .catch(err => console.log("fetchAll".bold.bgRed, `${err}`.brightRed))
    }

    static findById(productId) {
        const db = getDb()
        return db.collection("products").find({_id: new ObjectId(productId)}).next()
            .then(product => product)
            .catch(err => console.log("findById".bold.bgRed, `${err}`.brightRed))
    }

    static deleteById(productId) {
        const db = getDb()
        return db.collection("products").deleteOne({_id: new ObjectId(productId)})
            .then(product => {
                return product
            })
            .catch(err => console.log("deleteById".bold.bgRed, `${err}`.brightRed))
    }
}

module.exports = Product