exports.getLogin = (req, res, next) => {
    /*const isLoggedIn = req
        .get('Cookie')
        .split(';')[1]
        .trim()
        .split('=')[1] === 'true' // for manipulating in console*/
    // console.log('isLoggedIn:'.bold.bgBlue, isLoggedIn)
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