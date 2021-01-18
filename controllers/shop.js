const Product = require('../models/product.js')
const Cart = require('../models/cart')

//for main page
exports.getIndex = (req, res, next) => {
    Product.findAll().then(product => {
        res.render("shop/index",
            {
                pageTitle: "Main",
                path: '/shop',
            })
    }).catch(err => console.log("getIndex".bold.bgRed, `${err}`.brightRed))
}

// for all products
exports.getProducts = (req, res, next) => {
    Product.findAll().then(product => {
        res.render("shop/product-list",
            {
                prods: product,
                pageTitle: "All products",
                path: '/products',
            })
    }).catch(err => console.log("getProducts:".bold.bgRed, `${err}`.brightRed))
}

//for single product
exports.getProduct = (req, res, next) => {
    const productId = req.params.productId
    Product.findOne({where: {id: productId}})
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
    req.user.getCart().then(cart => {
        console.log(cart)
        return cart.getProducts().then(products => {
            res.render("shop/cart",
                {
                    pageTitle: "Cart",
                    path: '/cart',
                    products
                })
        }).catch(err => console.log("getCart/getProducts".bold.bgRed, `${err}`.brightRed))
    }).catch(err => console.log("getCart".bold.bgRed, `${err}`.brightRed))
}

// adding product/updating cart
exports.postCart = (req, res, next) => {
    const productId = req.body.productId
    Product.findById(productId, (product) => {
        Cart.addProduct(productId, product.price)
    })
    res.redirect('/products')
}

//deleting product from cart
exports.postDeleteCartProd = (req, res, next) => {
    const productId = req.body.productId
    Product.findById(productId, product => {
        Cart.deleteProduct(productId, product.price)
        res.redirect('/cart')
    })
}

// 3ambI4ka - plug
exports.getCheckout = (req, res, next) => {
    res.render("shop/checkout",
        {
            pageTitle: "Checkout",
            path: '/checkout',
        })
}

// 3ambI4ka - plug
exports.getOrders = (req, res, next) => {
    res.render("shop/orders",
        {
            pageTitle: "Orders",
            path: '/orders',
        })
}