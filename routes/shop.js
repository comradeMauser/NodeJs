const express = require('express')
const path = require('path')

const productController = require('../controllers/products.js')

const router = express.Router()

router.get('/', productController.getProducts)

router.get('/products', productController.getProducts)

router.get('/cart', productController.getProducts)

router.get('/checkout', productController.getProducts)

module.exports = router