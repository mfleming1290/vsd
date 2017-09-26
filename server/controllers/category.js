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
        console.log('in cat show', req.params.id)
        Category.find({ 'cityId': req.params.id })
        .then((category) => {
            console.log('categories', category)
            res.json(category)
        })
        .catch(errorHandler.bind(res))
    },
    getCategories(req, res) {  
        console.log('id param', req.params.id)
        console.log('state param', req.params.state)
        Ad.find({adCategory: req.params.cat})
        .then((ad) => {
            console.log('ads', ad)
            res.json(ad)
        })
        .catch(errorHandler.bind(res))
    },
    // update(req, res) {
    //     Book.findByIdAndUpdate(req.params.id, req.body, {new: true})
    //     .then(book => res.json(book))
    //     .catch(errorHandler.bind(res))
    // },
    destroy(req, res) {
        console.log('in destroy')
        Category.findByIdAndRemove(req.params.id)
        .then(book => res.json(book))
        .catch(errorHandler.bind(res))
    },
    // add(req, res) {
    //     console.log('in add search book')
    //     Author.findOne({ name: req.body.author })
    //         .then((author) => {
    //             console.log('sss' + author)
    //             if (!author) return Author.create({name: req.body.author})
    //                 .then((author) => {
    //                     console.log('author id 1',author)
    //                     return Book.create({author: author._id, title: req.body.title, publisher: req.body.publisher, year: req.body.year, pages: req.body.pages })
    //                     .then(book => {
    //                         console.log('author id 2',author._id)
    //                         return Author.findByIdAndUpdate(author._id, { $push : { books: book } })
    //                     .then(() => res.json(book))
    //                     })
    //                 })
                    
    //             else {
    //                 console.log('else', author)
    //                 Book.create({author: author._id, title: req.body.title, publisher: req.body.publisher, year: req.body.year, pages: req.body.pages })
    //                     .then(book => {
    //                         console.log(book, 'saa')
    //                         console.log('author id 3', author._id)
    //                         return Author.findByIdAndUpdate(author._id, { $push : { books: book } })
    //                     .then(() => res.json(book))
    //                     })
    //             }
    //         })
    //         .catch(error => {
    //             console.log(error)
    //         })

    // }


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