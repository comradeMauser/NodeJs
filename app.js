const express = require('express')
const path = require('path')
const c = require('colors')
const bodyParser = require('body-parser')

const errorController = require('./controllers/error.js')
const mongoConnect = require('./utils/database.js').mongoConnect

const adminRoutes = require('./routes/admin.js')
const shopRoutes = require('./routes/shop.js')

const app = express()

app.set("view engine", "ejs")
app.set("views", "views")

app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, "public")))

app.use((req, res, next) => {
    /*    User.findByPk(1).then(user => {
            req.user = user
            next()
        }).catch(err => console.log(err))*/
    next()
})

app.use('/admin', adminRoutes)
app.use(shopRoutes)

// 404 case
app.use(errorController.get404)

mongoConnect(() => {
    app.listen(3000)
})