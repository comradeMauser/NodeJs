const fs = require('fs')
const path = require('path')


const p = path.join(path.dirname(process.mainModule.filename), "data", "cart.json")

module.exports = class Cart {
    static addProduct(id, price) {
        //Fetch the previous cart
        fs.readFile(p, (err, data) => {
            let cart = {products: [], totalPrice: 0}
            if (!err) {
                cart = JSON.parse(data)
            }

            //Analyze the cart => find existing product
            const existingProductIndex = cart.products.findIndex(prod => prod.id === id)
            const existingProduct = cart.products[existingProductIndex]
            let updatedProduct

            //Add new product/increase quantity
            if (existingProduct) {
                updatedProduct = {...existingProduct}
                updatedProduct.qty = updatedProduct.qty + 1
                cart.products = [...cart.products]
                cart.products[existingProductIndex] = updatedProduct
            } else {
                updatedProduct = {id, qty: 1}
                cart.products = [...cart.products, updatedProduct]
            }
            cart.totalPrice = cart.totalPrice + Number(price)

            fs.writeFile(p, JSON.stringify(cart), err => {
                err ? console.log(err) : console.log("addProduct success: file updated")
            })
        })
    }

    static deleteProduct(id, productPrice) {
        fs.readFile(p, (err, data) => {
            if (err) {
                return
            }
            const updatedCart = {...JSON.parse(data)}
            const product = updatedCart.products.find(prod => prod.id === id)
            const productQty = product.qty
            updatedCart.products = updatedCart.products.filter(prod => prod.id !== id)
            updatedCart.totalPrice = (updatedCart.totalPrice - productPrice * productQty).toFixed(2)

            fs.writeFile(p, JSON.stringify(updatedCart), err => {
                err ? console.log(err) : console.log("deleteProduct success: file updated")
            })
        })
    }

    static getCart(callback) {
        fs.readFile(p, (error, data) => {
            const cart = JSON.parse(data)
            error ? callback(null) : callback(cart)
        })
    }
}