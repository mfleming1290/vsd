const User = require('mongoose').model('User');
const errorHandler = require('./errors')



module.exports = {
    login(req, res) {
        User.findOne({ email: req.body.email })
            .then((user) => {
                if (!user) throw new Error('no credentials match')
                return User.validatePassword(req.body.password, user.password)
                    .then(() => {
                        login(req, res, user);
                    })
            })
            .catch(error => {
                res.status(401).json('Email/Password combination not found');
            })
    },
    register(req, res) {
        User.create(req.body)
        .then((user) => {
            login(req, res, user)
        })
        .catch(errorHandler.bind(res))
    },
    logout(req, res) {
        req.session.destroy();
        res.clearCookie('userID')
        res.clearCookie('expiration')
        res.json(true);
    }
}

function login(req, res, user) {
    req.session.user = user;
    delete req.session.user.password;

    res.cookie('userID', user._id.toString());
    res.cookie('expiration', Date.now() + 86400 * 1000);

    res.json(user);
}