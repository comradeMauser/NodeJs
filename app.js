const express = require('express')
const bodyParser = require('body-parser')
const adminData = require('./routes/admin.js')
const shopRoutes = require('./routes/shop.js')
const path = require('path')
const expressHbs = require('express-handlebars')


const app = express()

app.engine("hbs", expressHbs({
    layoutsDir: 'views/layouts/',
    defaultLayout: 'main-layout',
    extname: 'hbs'
}))
app.set("view engine", "hbs")
// app.set("view engine", "pug")
app.set("views", "views")

app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, "public")))

app.use('/admin', adminData.routes)
app.use(shopRoutes)

//404 case
app.use((req, res, next) => {
    // console.log("4O4")
    // res.status(404).sendFile(path.join(__dirname, "views", "404.html"))
    res.status(404).render("404", {pageTitle: "404, no way"})
})

app.listen(3000)