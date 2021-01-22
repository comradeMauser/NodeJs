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
        let updQuantity = 1
        const updatedCartItems = [...this.cart.items]

        const cartProductIndex = this.cart.items.findIndex(item => {
            return item.productId.toString() === product._id.toString()
        })

        if (cartProductIndex !== -1) {
            updQuantity = this.cart.items[cartProductIndex].quantity + 1
            updatedCartItems[cartProductIndex].quantity = updQuantity
        } else {
            updatedCartItems.push({productId: new ObjectId(product._id), quantity: updQuantity})
        }

        const updatedCart = {items: updatedCartItems}

        const db = getDb()
        return db.collection("users").updateOne({_id: new ObjectId(this._id)}, {$set: {cart: updatedCart}})
    }

    deleteFromCart(productId) {
        const updatedCartItems = this.cart.items.filter(item => {
            return item.productId.toString() !== productId.toString()
        })

        const db = getDb()
        return db.collection("users").updateOne(
            {_id: new ObjectId(this._id)},
            {$set: {cart: {items: updatedCartItems}}}
        )
    }

    getCart() {
        const db = getDb()
        const productsIds = this.cart.items.map(item => item.productId)

        return db.collection("products").find({_id: {$in: productsIds}}).toArray()
            .then(products => {
                return products.map(product => {
                    return {
                        ...product, quantity: this.cart.items.find(item => {
                            return item.productId.toString() === product._id.toString()
                        }).quantity
                    }
                })
            })
            .catch(err => console.log("User/getCart".bold.bgRed, `${err}`.brightRed))
    }

    static findById(userId) {
        const db = getDb()
        return db.collection("users").find({_id: ObjectId(userId)}).next()
            .then(user => {
                // console.log(user)
                return user
            })
            .catch(err => console.log("User/save".bold.bgRed, `${err}`.brightRed))
    }
}

module.exports = User