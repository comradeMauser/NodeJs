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
    const product = new Product(req.body.title)
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