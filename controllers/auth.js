exports.getLogin = (req, res, next) => {
    res.render("auth/login",
        {
            pageTitle: "Authentication",
            path: '/login',
            isAuthenticated: req.isLoggedIn
        })
        .catch(err => console.log("getLogin".bold.bgRed, `${err}`.brightRed))
}

exports.postLogin = (req, res, next) => {
    req.isLoggedIn = true
    res.redirect('/')
}