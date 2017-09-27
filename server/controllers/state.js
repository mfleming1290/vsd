const State = require('mongoose').model('State')

const errorHandler = require('./errors')


module.exports = {
    index(req, res) {
        State.find({}).populate("cities")
        .then(games => res.json(games))
        .catch(errorHandler.bind(res))
    },
    create(request, response) {
	State.create(request.body)
		.then(game => {
			response.json(game)
		})
		.catch(errorHandler.bind(response));
    },
    show(req, res) {
        State.findById(req.params.id).populate('ads').populate('adCategory')
        .then(game => res.json(game))
        .catch(errorHandler.bind(res))
    },
    update(req, res) {
        State.findByIdAndUpdate(req.params.id, req.body, {new: true})
        .then(game => res.json(game))
        .catch(errorHandler.bind(res))
    },
    destroy(req, res) {
        State.findByIdAndRemove(req.params.id)
        .then(game => res.json(game))
        .catch(errorHandler.bind(res))
    },
    add(req, res) {
      
    }


}

