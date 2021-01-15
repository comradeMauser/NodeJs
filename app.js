const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')

const adminRoutes = require('./routes/admin.js')
const shopRoutes = require('./routes/shop.js')
const errorController = require('./controllers/error.js')

const sequelize = require('./utils/database')

const app = express()

app.set("view engine", "ejs")
app.set("views", "views")

app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, "public")))

app.use('/admin', adminRoutes)
app.use(shopRoutes)

// 404 case
app.use(errorController.get404)

sequelize.sync()
    .then(result => {
        console.log(result)
        app.listen(3000)
    })
    .catch(err => console.log(`sequelize error: ${err}`))
