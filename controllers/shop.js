const Product = require('../models/product.js')

exports.getProducts = (req, res, next) => {
    Product.fetchAll(products => {
        res.render("shop/product-list",
            {
                prods: products,
                pageTitle: "All products",
                path: '/products',
            })
    })
}

exports.getIndex = (req, res, next) => {
    Product.fetchAll(products => {
        res.render("shop/index",
            {
                prods: products,
                pageTitle: "Main",
                path: '/shop',
            })
    })
}

exports.getCart = (req, res, next) => {
    res.render("shop/cart",
        {
            // prods: products,
            pageTitle: "Cart",
            path: '/cart',
        })
}

exports.getCheckout = (req, res, next) => {
    res.render("shop/checkout",
        {
            // prods: products,
            pageTitle: "Checkout",
            path: '/checkout',
        })
}

exports.getOrders = (req, res, next) => {
    res.render("shop/orders",
        {
            // prods: products,
            pageTitle: "Orders",
            path: '/orders',
        })
}