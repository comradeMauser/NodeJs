const Product = require('../models/product.js')

exports.getProducts = (req, res, next) => {
    Product.fetchAll(products => {
        res.render("shop/product-list",
            {
                prods: products,
                pageTitle: "Shop",
                path: '/shop',
                hasProducts: products.length > 0,
                activeShop: true,
                productCSS: true
            })
    })
}