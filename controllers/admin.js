const Product = require('../models/product.js')

// /admin/edit-product ==> GET
exports.getAddProduct = (req, res, next) => {
    res.render("admin/edit-product",
        {
            pageTitle: 'Add Product',
            path: '/admin/add-product', //used for highlighting on navigation panel only
            editing: false
        })
}

// /admin/add-product ==> POST
exports.postAddProduct = (req, res, next) => {
    const title = req.body.title
    const price = req.body.price
    const imageUrl = req.body.imageUrl
    const description = req.body.description

    const product = new Product(null, title, price, imageUrl, description)
    product.save()

    res.redirect('/products')
}

// /admin/edit-product ==> GET
exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit // /edit-product/:productId?edit=true
    if (!editMode) {
        console.log("err: editMode is false")
        return res.redirect('/')
    }

    const productId = req.params.productId
    Product.findById(productId, (product) => {
        if (!product) {
            console.log("Err: product not found")
            res.redirect('/')
        }
        res.render("admin/edit-product",
            {
                pageTitle: 'edit Product',
                path: '/admin/edit-product', // used for highlighting on navigation panel only
                editing: editMode,
                product
            })
    })
}

// /admin/edit-product ==> POST
exports.postEditProduct = (req, res, next) => {
    const productId = req.body.productId
    const updatedTitle = req.body.title
    const updatedPrice = req.body.price
    const updatedImageUrl = req.body.imageUrl
    const updatedDescription = req.body.description

    const updatedProduct = new Product(productId, updatedTitle, updatedPrice, updatedImageUrl, updatedDescription)
    updatedProduct.save()

    res.redirect('/admin/products')
}

// /admin/products ==> GET
exports.getProducts = (req, res, next) => {
    Product.fetchAll(products => {
        res.render("admin/products",
            {
                prods: products,
                pageTitle: "Admin Panel",
                path: '/admin/products',
            })
    })
}