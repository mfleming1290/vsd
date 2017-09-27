const Category = require('mongoose').model('Category')
const Ad = require('mongoose').model('Ad')


const errorHandler = require('./errors')


module.exports = {
    index(req, res) {
        Category.find({})
        .then(ads => res.json(ads))
        .catch(errorHandler.bind(res))
    },
    show(req, res) {
        Category.find({ 'cityId': req.params.id })
        .then((category) => {
            res.json(category)
        })
        .catch(errorHandler.bind(res))
    },
    getCategories(req, res) {  
        Ad.find({adCategory: req.params.cat})
        .then((ad) => {
            res.json(ad)
        })
        .catch(errorHandler.bind(res))
    },
    destroy(req, res) {
        Category.findByIdAndRemove(req.params.id)
        .then(book => res.json(book))
        .catch(errorHandler.bind(res))
    },
    

}

