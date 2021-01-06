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
    constructor(t) {
        this.title = t
    }

    save() {
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
}