 const express = require('express')
const bodyParser = require('body-parser')
const adminRoutes = require('./routes/admin.js')
const shopRoutes = require('./routes/shop.js')
const path = require('path')
const errorController = require('./controllers/error.js')
const database = require('./utils/database.js')

const app = express()

app.set("view engine", "ejs")
app.set("views", "views")

app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, "public")))

app.use('/admin', adminRoutes)
app.use(shopRoutes)

//404 case
app.use(errorController.get404)

app.listen(3000)