const Product = require('../models/product.js')


//for main page
exports.getIndex = (req, res, next) => {
    Product.fetchAll().then(product => {
        res.render("shop/index",
            {
                pageTitle: "Main",
                path: '/shop',
            })
    }).catch(err => console.log("getIndex".bold.bgRed, `${err}`.brightRed))
}

// for all products
exports.getProducts = (req, res, next) => {
    Product.fetchAll().then(products => {
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
    req.user.getCart().then(cart => {
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
    let fetchedCart
    let newQuantity = 1

    req.user.getCart()
        .then(cart => {
            fetchedCart = cart
            return cart.getProducts({where: {id: productId}})
        })
        .then(products => {
            let product
            if (products.length > 0) {
                product = products[0]
            }
            if (product) {
                const prevQuantity = product.cartItem.quantity
                newQuantity = prevQuantity + 1
                return product
            }
            return Product.findByPk(productId)
        })
        .then(product => {
            return fetchedCart.addProduct(product, {through: {quantity: newQuantity}})
        })
        .catch(err => console.log("postCart".bold.bgRed, `${err}`.brightRed))
}

//deleting product from cart
exports.postDeleteCartProd = (req, res, next) => {
    const productId = req.body.productId
    req.user.getCart()
        .then(cart => {
            return cart.getProducts({where: {id: productId}})
        })
        .then(products => {
            const product = products[0]
            return product.cartItem.destroy()
        })
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
    req.user.getOrders({include: ["products"]})
        .then(orders => {
            console.log(orders)
            res.render("shop/orders",
                {
                    orders,
                    pageTitle: "Orders",
                    path: '/orders',
                })
        })
        // .then()
        .catch(err => console.log("getOrders".bold.bgRed, `${err}`.brightRed))

}

exports.postOrder = (req, res, next) => {
    let fetchedCart
    req.user.getCart()
        .then(cart => {
            fetchedCart = cart
            return cart.getProducts()
        })
        .then(products => {
            return req.user.createOrder()
                .then(order => {
                    return order.addProducts(products.map(product => {
                        product.orderItem = {quantity: product.cartItem.quantity}
                        return product
                    }))
                })
                .catch(err => console.log("postOrder".bold.bgRed, `${err}`.brightRed))
        })
        .then(result => {
            return fetchedCart.setProducts(null)
        })
        .then(result => {
            res.redirect('/orders')
        })
        .catch(err => console.log("postOrder".bold.bgRed, `${err}`.brightRed))
}