const express = require('express')

const router = express.Router()

router.get('/', (req, res, next) => {
    console.log("one more middleware")
    res.send("<h1>Home Page, Express</h1>")
})

module.exports = router