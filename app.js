const express = require('express')

const app = express()

app.use('/', (req, res, next) => {
    console.log("it's always runs")
    next()
})

app.use('/add-product', (req, res, next) => {
    console.log("/add-product")
    res.send("<h1>Add product page</h1>")
})

app.use('/', (req, res, next) => {
    console.log("one more middleware")
    res.send("<h1>Home Page, Express</h1>")
})

app.listen(3000)