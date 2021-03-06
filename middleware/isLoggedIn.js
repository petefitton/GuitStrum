module.exports = function(req, res, next) {
    // Check if there is not a user
    if (!req.user) {
        // Send error message
        req.flash('error', 'You must be logged in to access this page');
        // Redirect to the login page
        res.redirect('/auth/login');
    } else {
        // continue
        next();
    }
}