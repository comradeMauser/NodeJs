const express = require('express')
const bodyParser = require('body-parser')
const adminRoutes = require('./routes/admin.js')
const shopRoutes = require('./routes/shop.js')
const path = require('path')


const app = express()

app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, "public")))

app.use('/admin', adminRoutes)
app.use(shopRoutes)

//404 case
app.use((req, res, next) => {
    console.log("4O4")
    res.status(404).sendFile(path.join(__dirname, "views", "404.html"))
})

app.listen(3000)