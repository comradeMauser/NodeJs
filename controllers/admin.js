const Product = require('../models/product.js')

// /admin/add-product ==> GET
exports.getAddProduct = (req, res, next) => {
    res.render("admin/add-product",
        {
            pageTitle: 'Add Product',
            path: '/admin/add-product',
            formsCSS: true,
            productCSS: true,
            activeAddProduct: true
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

    res.redirect('/')
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