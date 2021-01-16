const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')

const errorController = require('./controllers/error.js')

const adminRoutes = require('./routes/admin.js')
const shopRoutes = require('./routes/shop.js')

const sequelize = require('./utils/database')
const Product = require('./models/product.js')
const User = require('./models/user.js')

const app = express()

app.set("view engine", "ejs")
app.set("views", "views")

app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, "public")))

app.use((req, res, next) => {
    User.findByPk(1).then(user => {
        req.user = user
        next()
    }).catch(err => console.log(err))
})

app.use('/admin', adminRoutes)
app.use(shopRoutes)

// 404 case
app.use(errorController.get404)


Product.belongsTo(User, {constraints: true, onDelete: "CASCADE"})
User.hasMany(Product) //optional

// sequelize.sync({force: true})
sequelize.sync().then(result => {
    return User.findByPk(1) //dummy identifier
}).then(user => {
    return user ? user : User.create({name: "John Doe", email: "fhtagn@com"})
}).then(user => {
    app.listen(3000)
}).catch(err => console.log(`sequelize error: ${err}`))
