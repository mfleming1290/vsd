var books = require('google-books-search');
const errorHandler = require('./errors')


module.exports = {  
    search(req, res) {
        console.log(req.params.id)
        // Book.findById(req.params.id)
        // .then(book => res.json(book))
        // .catch(errorHandler.bind(res))
        books.search(req.params.id, single, function(error, results, apiResponse) {
            if ( ! error ) {
                res.json(results)
            } else {
                console.log(error);
            }
        });
        

    }, 
    
    show(req, res) {
        console.log(req.body, 'title')
        query = req.body.title
        books.search(req.body.title, options, function(error, results, apiResponse) {
            if ( ! error ) {
                res.json(results)
            } else {
                console.log(error);
            }
        });
        

    }
    



}

var options = {
    key: "AIzaSyDKD0B2WKs9XrZ_WBdqHwZn-NIAayGYbRM",
    field: 'title',
    offset: 0,
    limit: 10,
    type: 'books',
    order: 'relevance',
    lang: 'en'
};

var single = {
    key: "AIzaSyDKD0B2WKs9XrZ_WBdqHwZn-NIAayGYbRM",
    field: 'isbn',
    offset: 0,
    limit: 10,
    type: 'books',
    order: 'relevance',
    lang: 'en'
};