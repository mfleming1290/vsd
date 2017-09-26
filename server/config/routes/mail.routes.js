const mailController = require('../../controllers/mail')
const router = require('express').Router();

module.exports = router
    .post('/', mailController.sendMail)
    