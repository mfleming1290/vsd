const State = require('mongoose').model('State')

const errorHandler = require('./errors')


module.exports = {
    index(req, res) {
        State.find({}).populate("cities")
        .then(games => res.json(games))
        .catch(errorHandler.bind(res))
    },
    // creating a book and adding to an author
    create(request, response) {
        console.log('in state create')
	// assumes author id is included in new book information
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
        console.log('in destroy')
        State.findByIdAndRemove(req.params.id)
        .then(game => res.json(game))
        .catch(errorHandler.bind(res))
    },
    add(req, res) {
        // console.log('in add search game')
        // Author.findOne({ name: req.body.author })
        //     .then((author) => {
        //         console.log('sss' + author)
        //         if (!author) return Author.create({name: req.body.author})
        //             .then((author) => {
        //                 console.log('author id 1',author)
        //                 return Book.create({author: author._id, title: req.body.title, publisher: req.body.publisher, year: req.body.year, pages: req.body.pages })
        //                 .then(book => {
        //                     console.log('author id 2',author._id)
        //                     return Author.findByIdAndUpdate(author._id, { $push : { books: book } })
        //                 .then(() => res.json(book))
        //                 })
        //             })
                    
        //         else {
        //             console.log('else', author)
        //             Book.create({author: author._id, title: req.body.title, publisher: req.body.publisher, year: req.body.year, pages: req.body.pages })
        //                 .then(book => {
        //                     console.log(book, 'saa')
        //                     console.log('author id 3', author._id)
        //                     return Author.findByIdAndUpdate(author._id, { $push : { books: book } })
        //                 .then(() => res.json(book))
        //                 })
        //         }
        //     })
        //     .catch(error => {
        //         console.log(error)
        //     })

    }


}

// // creating a book and adding to an author
// create(request, response) {
// 	// assumes author id is included in new book information
// 	Book.create(request.body)
// 		.then(book => {
// 			return Author.findByIdAndUpdate(book.author, { $push : { books: book } })
// 				.then(() => response.json(book))
// 		})
// 		.catch(errorHandler.bind(response));
// }