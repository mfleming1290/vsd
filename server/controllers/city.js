const errorHandler = require('./errors')

const City = require('mongoose').model('City')

module.exports = {  
    index(req, res) {
        City.find({}).populate("stateId")
        .then(cities => res.json(cities))
        .catch(errorHandler.bind(res))
    },
    show(req, res) {
        City.find({stateId: req.params.state})
        .then(city => res.json(city))
        .catch(errorHandler.bind(res))
    },
    single(req, res) {
        City.findById(req.params.id)
        .then(city => res.json(city))
        .catch(errorHandler.bind(res))
    },
    destroy(req, res) {
        City.findByIdAndRemove(req.params.id)
        .then(ad => res.json(ad))
        .catch(errorHandler.bind(res))
    }
    
    

}