const Product = require('../models/product.js')


//for main page
exports.getIndex = (req, res, next) => {
    Product.find()
        .then(product => {
            res.render("shop/index",
                {
                    pageTitle: "Main",
                    path: '/shop',
                })
        }).catch(err => console.log("getIndex".bold.bgRed, `${err}`.brightRed))
}

// for all products
exports.getProducts = (req, res, next) => {
    Product.find()
        .then(products => {
            res.render("shop/product-list",
                {
                    prods: products,
                    pageTitle: "All products",
                    path: '/products',
                })
        }).catch(err => console.log("getProducts:".bold.bgRed, `${err}`.brightRed))
}

//for single product
exports.getProduct = (req, res, next) => {
    const productId = req.params.productId
    Product.findById(productId)
        .then(product => {
            res.render('shop/product-details',
                {
                    product,
                    pageTitle: product.title,
                    path: '/products/:productId'
                })
        }).catch(err => console.log("getProduct".bold.bgRed, `${err}`.brightRed))
}

// will return cart items
exports.getCart = (req, res, next) => {
    req.user
        .populate("cart.items").populate("productId")
        .execPopulate()
        .then(user => {
            const products = user.cart.items
            console.log("products:",products)
            res.render('shop/cart', {
                path: '/cart',
                pageTitle: 'Your Cart',
                products: products
            })
        })
        .catch(err => console.log("getCart".bold.bgRed, `${err}`.brightRed))
}

// adding product/updating cart
exports.postCart = (req, res, next) => {
    const productId = req.body.productId
    Product.findById(productId)
        .then(product => {
            return req.user.addToCart(product);
        })
        .then(r => res.redirect('/cart'))
        .catch(err => console.log("postCart".bold.bgRed, `${err}`.brightRed))
}

//deleting product from cart
exports.postDeleteCartProd = (req, res, next) => {
    const productId = req.body.productId
    req.user.deleteFromCart(productId)
        .then(result => {
            console.log(`DESTROY DESTROY DESTROY!!!`.rainbow)
            res.redirect('/cart')
        })
        .catch(err => console.log("postDeleteCartProd".bold.bgRed, `${err}`.brightRed))
}

// 3ambI4ka - plug
exports.getCheckout = (req, res, next) => {
    res.render("shop/checkout",
        {
            pageTitle: "Checkout",
            path: '/checkout',
        })
}

exports.getOrders = (req, res, next) => {
    req.user.getOrders()
        .then(orders => {
            console.log(orders)
            res.render("shop/orders",
                {
                    orders,
                    pageTitle: "Orders",
                    path: '/orders',
                })
        })
        .catch(err => console.log("getOrders".bold.bgRed, `${err}`.brightRed))

}

exports.postOrder = (req, res, next) => {
    req.user.addOrder()
        .then(result => {
            res.redirect('/orders')
        })
        .catch(err => console.log("postOrder".bold.bgRed, `${err}`.brightRed))
}