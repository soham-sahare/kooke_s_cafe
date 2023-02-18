module.exports = {
    ensureAuthenticated: function (req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        req.flash('error_msg', 'Please login to view this resource.');
        res.redirect('/users/login');
    },
    checkLoggedIn: function (req, res, next) {
        if (req.isAuthenticated()) {
            return res.redirect("/dashboard")
        }
        next()
    }
}