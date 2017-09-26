const adController = require('../../controllers/ads')
const router = require('express').Router();

module.exports = router
    .get('/', adController.index)
    .post('/', adController.create)
    .get('/:id', adController.show)
    .put('/:id', adController.update)
    .delete('/:id', adController.destroy)
    .get('/states/:id', adController.getState)
    .get('/search/:id/:loc', adController.getSearchAds)
    .get('/category/:category', adController.getCategories);

