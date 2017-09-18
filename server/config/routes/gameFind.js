const gameFindController = require('../../controllers/gameFind');
const router = require('express').Router();

module.exports = router
    .get('/', gameFindController.test)
    .put('/', gameFindController.find)
    .get('/:id', gameFindController.show)
    .post('/add', gameFindController.add)
    
    