exports.getLogin = (req, res, next) => {
    const isLoggedIn = req
        .get('Cookie')
        .split(';')[1]
        .trim()
        .split('=')[1] === 'true' // for manipulating in console
    console.log('isLoggedIn:'.bold.bgBlue, isLoggedIn)
    res.render("auth/login",
        {
            pageTitle: "Authentication",
            path: '/login',
            isAuthenticated: isLoggedIn
        })
}

exports.postLogin = (req, res, next) => {
    res.setHeader('Set-Cookie', 'isLoggedIn=true')
    res.redirect('/')
}