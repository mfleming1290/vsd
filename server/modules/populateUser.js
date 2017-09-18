const User = require('mongoose').model('User');

module.exports = function(req, res, next) {
    if (req.session && req.session.user) {
        User.findByID(req.session.user._id)
        .then(function(user) {
            req.user = user;
        })
        .catch(next);
    } else {
        next();
    }
};
