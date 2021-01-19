const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')

const errorController = require('./controllers/error.js')

const adminRoutes = require('./routes/admin.js')
const shopRoutes = require('./routes/shop.js')

const sequelize = require('./utils/database')

const Product = require('./models/product.js')
const User = require('./models/user.js')
const Cart = require('./models/cart.js')
const CartItem = require('./models/cart-item.js')
const Order = require('./models/order.js')
const OrderItem = require('./models/order-item.js')

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
User.hasOne(Cart)
Cart.belongsTo(User)
Cart.belongsToMany(Product, {through: CartItem})
Product.belongsToMany(Cart, {through: CartItem})
Order.belongsTo(User)
User.hasMany(Order)
Order.belongsToMany(Product, {through: OrderItem})

// sequelize.sync({force: true}).then(result => {
sequelize.sync().then(result => {
    return User.findByPk(1) //dummy identifier
}).then(user => {
    return user ? user : User.create({name: "John Doe", email: "com@com"})
}).then(user => {
    return user.createCart()
}).then(cart => {
    app.listen(3000)
}).catch(err => console.log(`sequelize error: ${err}`))