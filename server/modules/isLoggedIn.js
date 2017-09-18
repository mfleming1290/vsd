module.exports = function(req, res, next) {
    if (req.user) {
        next();
    }
    res.status(403).json('You must be logged in')
};
