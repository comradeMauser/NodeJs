exports.getLogin = (req, res, next) => {
    res.render("auth/login",
        {
            pageTitle: "Authentication",
            path: '/login',
        })
    // .catch(err => console.log("getLogin".bold.bgRed, `${err}`.brightRed))
}