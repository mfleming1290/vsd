const cityController = require('../../controllers/city');
const router = require('express').Router();

module.exports = router
    .get('/', cityController.index)
    // .post('/', cityController.create)
    // .post('/add', cityController.add)
    // .put('/:id', cityController.update)
    .get('/single/:id', cityController.single)
    .get('/:state', cityController.show)
    // .delete('/:id', cityController.destroy);
    