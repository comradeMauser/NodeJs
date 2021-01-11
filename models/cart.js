const fs = require('fs')
const path = require('path')


const p = path.join(path.dirname(process.mainModule.filename), "data", "cart.json")

module.exports = class Cart {
    static addProduct(id, price) {
        //Fetch the previous cart
        fs.readFile(p, ((err, data) => {
            let cart = {prooducts: [], totalPrice: 0}
            if (!err) {
                cart = JSON.parse(data)
            }

            //Analyze the cart => find existing product
            const existingProductIndex = cart.prooducts.findIndex(prod => prod.id === id)
            const existingProduct = cart.prooducts[existingProductIndex]
            let updatedProduct

            //Add new product/increase quantity
            if (existingProduct) {
                updatedProduct = {...existingProduct}
                updatedProduct.qty = updatedProduct.qty + 1
                cart.prooducts = [...cart.prooducts]
                cart.prooducts[existingProductIndex] = updatedProduct
            } else {
                updatedProduct = {id, qty: 1}
                cart.prooducts = [...cart.prooducts, updatedProduct]
            }
            cart.totalPrice = cart.totalPrice + Number(price)

            fs.writeFile(p, JSON.stringify(cart), err => {
                err ? console.log(err) : console.log("success: file updated")
            })
        }))
    }
}