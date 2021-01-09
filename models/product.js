const fs = require('fs')
const path = require('path')


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
    constructor(title, imageUrl, description, price) {
        this.title = title;
        this.imageUrl = imageUrl
        this.description = description
        this.price = price
    }

    save() {
        this.id = Math.random().toString() // 3ambI4ka - plug
        getProductFromFile(products => {
            products.push(this)
            fs.writeFile(p, JSON.stringify(products), (err) => {
                console.log(err)
            })
        })
    }

    static fetchAll(callback) {
        getProductFromFile(callback)
    }

    static findById(id, callback) {
        getProductFromFile(products => {
            const product = products.find(prod => prod.id === id)
            callback(product)
        })
    }
}