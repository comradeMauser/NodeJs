const express = require('express')
const path = require('path')
const c = require('colors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const errorController = require('./controllers/error.js')
const mongoConnect = require('./utils/database.js').mongoConnect
const User = require('./models/user.js')

const adminRoutes = require('./routes/admin.js')
const shopRoutes = require('./routes/shop.js')

const app = express()

app.set("view engine", "ejs")
app.set("views", "views")

app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, "public")))

/*app.use((req, res, next) => {
    User.findById("6009acdc84164b6dfd701e46")
        .then(user => {
            req.user = new User(user.userName, user.email, user.cart, user._id)
            next()
        }).catch(err => console.log(err))
})*/

app.use('/admin', adminRoutes)
app.use(shopRoutes)

// 404 case
app.use(errorController.get404)
/*

mongoConnect(() => {
    app.listen(3000)
})*/
mongoose
    .connect("mongodb+srv://JohnDoe:nIiMOHbOi16uVwou@nodecluster.qflh4.mongodb.net/shop?retryWrites=true&w=majority")
    .then(r => {
        app.listen(3000)
    })
    .catch(err => console.log("connect".bold.bgRed, `${err}`.brightRed))