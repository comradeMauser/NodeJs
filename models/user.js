const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = mongoose.Schema(
    {
        userName: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        cart: {
            items: [{
                productId: {
                    type: Schema.Types.ObjectId,
                    required: true
                },
                quantity: {
                    type: Number,
                    required: true
                }
            }]
        }
    }
)

module.exports = mongoose.model("User", userSchema)

/*
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

    getOrders() {
        const db = getDb()
        return db.collection("orders").find({"user._id": new ObjectId(this._id)}).toArray()
    }

    addOrder() {
        const db = getDb()
        return this.getCart()
            .then(products => {
                const order = {
                    user: {
                        _id: this._id,
                        name: this.userName
                    },
                    items: products,
                }
                return db.collection("orders").insertOne(order)
            })
            .then(r => {
                this.cart = {items: []}
                return db.collection("users").updateOne({_id: new ObjectId(this._id)}, {$set: {cart: {items: []}}})
            })
            .catch(err => console.log("addOrder".bold.bgRed, `${err}`.brightRed))
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

module.exports = User*/
