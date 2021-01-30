const User = require('../models/user')

exports.getLogin = (req, res, next) => {
    console.log(req.session.isLoggedIn)
    res.render("auth/login",
        {
            pageTitle: "Authentication",
            path: '/login',
            isAuthenticated: false
        })
}

exports.postLogin = (req, res, next) => {
    User.findById("600c6143f8ce18315c9cb694")
        .then(user => {
            req.session.isLoggedIn = true
            req.session.user = user
            res.redirect('/')
        })
        .catch(err => console.log("postLogin".bold.bgRed, `${err}`.brightRed))
}