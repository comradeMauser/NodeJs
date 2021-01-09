const Product = require('../models/product.js')

// for all products
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

//for single product
exports.getProduct = (req, res, next) => {
    const productId = req.params.productId
    Product.findById(productId, product => {
        res.render('shop/product-details',
            {
                product: product,
                pageTitle: product.title,
                path: '/products/:productId'
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

// 3ambI4ka - plug
exports.getCart = (req, res, next) => {
    res.render("shop/cart",
        {
            // prods: products,
            pageTitle: "Cart",
            path: '/cart',
        })
}

// 3ambI4ka - plug
exports.getCheckout = (req, res, next) => {
    res.render("shop/checkout",
        {
            // prods: products,
            pageTitle: "Checkout",
            path: '/checkout',
        })
}

// 3ambI4ka - plug
exports.getOrders = (req, res, next) => {
    res.render("shop/orders",
        {
            // prods: products,
            pageTitle: "Orders",
            path: '/orders',
        })
}