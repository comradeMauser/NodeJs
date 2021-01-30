exports.getLogin = (req, res, next) => {
    console.log(req.session.isLoggedIn)
    res.render("auth/login",
        {
            pageTitle: "Authentication",
            path: '/login',
            // isAuthenticated: isLoggedIn
            isAuthenticated: false
        })
}

exports.postLogin = (req, res, next) => {
    req.session.isLoggedIn = true
    res.redirect('/')
}