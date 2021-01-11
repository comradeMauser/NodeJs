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
    const imageUrl = req.body.imageUrl
    const description = req.body.description
    const price = req.body.price

    const product = new Product(title, imageUrl, description, price)
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
    console.log(productId)
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