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
const authRoutes = require('./routes/auth.js')
const session = require('express-session')

const app = express()

app.set("view engine", "ejs")
app.set("views", "views")

app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, "public")))
app.use(
    session({
        secret: 'unimaginably long string',
        resave: false,
        saveUninitialized: false
    })
)

app.use((req, res, next) => {
    User.findById("600c6143f8ce18315c9cb694")
        .then(user => {
            req.user = user
            next()
        }).catch(err => console.log(err))
})

app.use('/admin', adminRoutes)
app.use(shopRoutes)
app.use(authRoutes)

// 404 case
app.use(errorController.get404)

mongoose.connect("mongodb+srv://JohnDoe:nIiMOHbOi16uVwou@nodecluster.qflh4.mongodb.net/shop?retryWrites=true&w=majority")
    .then(r => {
        User.findOne()
            .then(user => {
                if (!user) {
                    const user = new User({
                        userName: "JohnDoe",
                        email: "com@com",
                        cart: {items: []}
                    })
                    user.save()
                }
            })
        app.listen(3000)
    })
    .catch(err => console.log("connect".bold.bgRed, `${err}`.brightRed))