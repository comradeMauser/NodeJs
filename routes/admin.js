const express = require('express')

const router = express.Router()

router.get('/add-product', (req, res, next) => {
    res.send("<h1>Add product page</h1>" +
        "<form action='/products' method='POST'>" +
        "<input type='text' name='title'> " +
        "<button type='submit'>add product</button>" +
        "</form>")
})

router.post('/products', (req, res, next) => {
    console.log(req.body)
    res.redirect('/')
})

module.exports = router