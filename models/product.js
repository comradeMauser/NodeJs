const fs = require('fs')
const path = require('path')
const Cart = require('./cart')

const database = require('../utils/database.js')

const p = path.join(path.dirname(process.mainModule.filename), "data", "products.json")

const getProductFromFile = (callback) => {
    fs.readFile(p, (err, data) => {
        if (err) {
            callback([])
        } else {
            callback(JSON.parse(data))
        }
    })
}

module.exports = class Product {
    constructor(id, title, price, imageUrl, description) {
        this.id = id
        this.title = title
        this.price = price
        this.imageUrl = imageUrl
        this.description = description
    }

    save() {
        getProductFromFile(products => {
            if (this.id) {
                const existProdIndex = products.findIndex(prod => prod.id === this.id)
                const updatedProducts = [...products]
                updatedProducts[existProdIndex] = this
                fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
                    console.log(err)
                })
            } else {
                this.id = Math.random().toString() // 3ambI4ka - plug
                products.push(this)
                fs.writeFile(p, JSON.stringify(products), (err) => {
                    console.log(err)
                })
            }
        })
    }

    static deleteById(id) {
        getProductFromFile(products => {
            const product = products.find(prod => prod.id === id)
            const updatedProducts = products.filter(prod => prod.id !== id)

            fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
                if (!err) {
                    Cart.deleteProduct(id, product.price)
                }
                console.log(err)
            })
        })
    }

    static fetchAll(callback) {
        // getProductFromFile(callback)
        return database.execute("SELECT * FROM products")
    }

    static findById(id, callback) {
        getProductFromFile(products => {
            const product = products.find(prod => prod.id === id)
            callback(product)
        })
    }
}

exports.getProducts = (req, res, next) => {
    Product.fetchAll().then(([rows, fieldData]) => {
        res.render("shop/product-list",
            {
                prods: rows,
                pageTitle: "All products",
                path: '/products',
            })
    }).catch(err => console.log(err))
}