// part 6 practice templating engines

const express = require('express')
const bParser = require('body-parser')

const users = []
const practiceTemplatingEngines = express()

practiceTemplatingEngines.set("view engine", "ejs")
practiceTemplatingEngines.set("views", "views")
practiceTemplatingEngines.use(bParser.urlencoded({exceeds: false}))

practiceTemplatingEngines.get('/', (req, res, next) => {
    res.render("index", {pageTitle: "Home"})
})

practiceTemplatingEngines.get('/users', (req, res, next) => {
    res.render("users", {pageTitle: "List", users: users})
})

practiceTemplatingEngines.post('/add-users', (req, res, next) => {
    users.push({name: req.body.username})
    res.redirect('/users')
})

practiceTemplatingEngines.listen(3001)