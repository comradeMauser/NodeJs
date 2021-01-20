const getDb = require('../utils/database.js').getDb

class Product {
    constructor(title, price, imageUrl, description) {
        this.title = title
        this.price = price
        this.imageUrl = imageUrl
        this.description = description
    }

    save() {
        const db = getDb()
        return db.collection("products")
            .insertOne(this)
            .then(result => console.log(result))
            .catch(err => console.log("db".bold.bgRed, `${err}`.brightRed))
    }

    static fetchAll() {
        const db = getDb()
        return db.collection("products").find().toArray()
            .then(products => {
                console.log(products)
                console.log("||||||||||||||||||")
                return products
            })
            .catch(err => console.log("fetchAll".bold.bgRed, `${err}`.brightRed))
    }

    static findById(prodId) {
        const db = getDb()
        return db.collection("products").find(prodId).next()
            .then(product => {
                console.log(product)
                return product
            })
            .catch(err => console.log("findById".bold.bgRed, `${err}`.brightRed))
    }
}

module.exports = Product