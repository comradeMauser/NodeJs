const Product = require('../models/product.js')
const Cart = require('../models/cart')

//for main page
exports.getIndex = (req, res, next) => {
    Product.fetchAll().then(() => {
        res.render("shop/index",
            {
                pageTitle: "Main",
                path: '/shop',
            })
    }).catch(err => console.log(err))

}

// for all products
exports.getProducts = (req, res, next) => {
    Product.fetchAll().then(([rows, fieldData]) => {
        res.render("shop/product-list",
            {
                prods: rows,
                pageTitle: "All products",
                path: '/products',
            })
    }).catch(err => console.log(err))
}

//for single product
exports.getProduct = (req, res, next) => {
    const productId = req.params.productId
    Product.findById(productId).then(([product]) => {
        res.render('shop/product-details',
            {
                product: product[0],
                pageTitle: product[0].title,
                path: '/products/:productId'
            })
    }).catch(err => console.log(err))
}

// will return cart items
exports.getCart = (req, res, next) => {
    Cart.getCart(cart => {
        Product.fetchAll(products => {
            const cartProducts = []
            for (product of products) {
                const cartProductData = cart.products.find(prod => prod.id === product.id)
                if (cartProductData) {
                    cartProducts.push({productData: product, qty: cartProductData.qty})
                }
            }
            res.render("shop/cart",
                {
                    pageTitle: "Cart",
                    path: '/cart',
                    products: cartProducts
                })
        })
    })
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