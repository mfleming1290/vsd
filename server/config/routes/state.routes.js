const stateController = require('../../controllers/state');
const router = require('express').Router();

module.exports = router
    .get('/', stateController.index)
    .post('/', stateController.create)
    .put('/:id', stateController.update)
    .get('/:id', stateController.show)
    .delete('/:id', stateController.destroy);
    
    