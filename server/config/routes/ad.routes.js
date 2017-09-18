const adController = require('../../controllers/ads')
const router = require('express').Router();

module.exports = router
    .get('/', adController.index)
    .post('/', adController.create)
    .get('/:id', adController.show)
    .put('/:id', adController.update)
    .delete('/:id', adController.destroy)
    .get('/search/:id', adController.getSearchAds)
    .get('/states/:id', adController.getState)
    .get('/category/:category', adController.getCategories);

