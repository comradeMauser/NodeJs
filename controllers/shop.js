const Product = require('../models/product.js')
const Order = require('../models/order.js')

//for main page
exports.getIndex = (req, res, next) => {
    Product.find()
        .then(product => {
            res.render("shop/index",
                {
                    pageTitle: "Main",
                    path: '/shop',
                    isAuthenticated: req.isLoggedIn
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
                    isAuthenticated: req.isLoggedIn
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
                    path: '/products/:productId',
                    isAuthenticated: req.isLoggedIn
                })
        }).catch(err => console.log("getProduct".bold.bgRed, `${err}`.brightRed))
}

// will return cart items
exports.getCart = (req, res, next) => {
    req.user
        .populate("cart.items.productId")
        .execPopulate()
        .then(user => {
            const products = user.cart.items
            res.render('shop/cart', {
                path: '/cart',
                pageTitle: 'Your Cart',
                products: products,
                isAuthenticated: req.isLoggedIn
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

exports.getOrders = (req, res, next) => {
    Order.find({"user.userId": req.user._id})
        .then(orders => {
            res.render("shop/orders",
                {
                    orders,
                    pageTitle: "Orders",
                    path: '/orders',
                    isAuthenticated: req.isLoggedIn
                })
        })
        .catch(err => console.log("getOrders".bold.bgRed, `${err}`.brightRed))
}

exports.postOrder = (req, res, next) => {
    req.user
        .populate("cart.items.productId").execPopulate()
        .then(user => {
            const products = user.cart.items.map(item => {
                return {
                    quantity: item.quantity,
                    product: {...item.productId._doc}
                }
            })
            const order = new Order({
                user: {
                    name: req.user.userName,
                    userId: req.user // automatic data extraction
                },
                products
            })
            return order.save()
        })
        .then(result => {
            return req.user.clearcart()
        })
        .then(() => {
            res.redirect('/orders')
        })
        .catch(err => console.log("postOrder".bold.bgRed, `${err}`.brightRed))
}

// 3ambI4ka - plug
exports.getCheckout = (req, res, next) => {
    res.render("shop/checkout",
        {
            pageTitle: "Checkout",
            path: '/checkout',
        })
}