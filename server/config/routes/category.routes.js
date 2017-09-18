const categoryController = require('../../controllers/category');
const router = require('express').Router();

module.exports = router
    // .get('/', categoryController.index)
    // .post('/', categoryController.create)
    // .post('/add', categoryController.add)
    // .put('/:id', categoryController.update)
    .get('/:id', categoryController.show)
    .get('/category/:cat', categoryController.getCategories)
    // .delete('/:id', categoryController.destroy);
    