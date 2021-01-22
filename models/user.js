const getDb = require('../utils/database.js').getDb
const mongodb = require('mongodb')
const ObjectId = mongodb.ObjectID

class User {
    constructor(userName, email, cart, id) {
        this.userName = userName
        this.email = email
        this.cart = cart
        this._id = id
    }

    save() {
        const db = getDb()
        return db.collection("users").insertOne(this)
    }

    addToCart(product) {
        // const cartProduct = this.cart.items.findIndex(item => item._id === product._id)
        const updatedCart = {items: [{productId: new ObjectId(product._id), quantity: 1}]}
        console.log(updatedCart)
        const db = getDb()
        return db.collection("users").updateOne({_id: new ObjectId(this._id)}, {$set: {cart: updatedCart}})
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