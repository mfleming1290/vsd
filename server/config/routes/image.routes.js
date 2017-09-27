const imageController = require('../../controllers/images');
const router = require('express').Router();

module.exports = router
        .post('/add', imageController.add)
        .post('/banner', imageController.addBanner)
        .get('/banner', imageController.bannerIndex)
        .delete('/banner/:id', imageController.bannerDestroy)
        .get('/', imageController.index)
        .post('/', imageController.create)
    

