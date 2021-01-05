const express = require('express')
const path = require('path')

// const rootDir = require('../utils/path.js')
// const adminData = require('./admin.js')
const productController = require('../controllers/products.js')


const router = express.Router()

router.get('/', productController.getProducts)

module.exports = router