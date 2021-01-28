//404 case
exports.get404 = (req, res, next) => {
    res.status(404).render("404", {
        pageTitle: "404, no way",
        path: "",
        isAuthenticated: req.isLoggedIn
    })
}