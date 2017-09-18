var multer = require('multer');
const Image = require('mongoose').model('Image')
const path = require('path')
const errorHandler = require('./errors')




var storage = multer.diskStorage({ //multers disk storage settings
        destination: function (req, file, cb) {
            cb(null, './src/assets/img/dbImages');
        },
        filename: function (req, file, cb) {
            var datetimestamp = Date.now();
            cb(null, file.originalname );
        },
        username: function (req, file, cb) {
            cb(null, file.file.username);
        }
    });

    var upload = multer({ //multer settings
                    storage: storage
                }).single('file');

// module.exports = router
//     .post('/upload', function(req, res) {
//         console.log('in image uploader ')
//         upload(req,res,function(err){
//             console.log(req.file);
//             if(err){
//                  res.json({error_code:1,err_desc:err});
//                  return;
//             }
//              res.json({error_code:0,err_desc:null});
//         });
//     });

    module.exports = {  
    add(req, res) {
       

        upload(req,res,function(err){
            console.log(req.file);
            console.log('name', req.body)
            console.log('name', req.data)

            if(err){
                 res.json({error_code:1,err_desc:err});
                 return;
            }
            //  res.json({error_code:0,err_desc:null});
             var path = req.file.path;
             var filename = req.file.filename;
            var imageName = req.file.originalname;

            var imagepath = {};
            imagepath['path'] = '../../assets/img/dbImages/' + filename;
            imagepath['originalname'] = imageName;
             Image.create(imagepath)
             .then(img => {
                res.json(img)
             })


        })
        
        
        

    },
    index(req, res) {
        console.log('in image controller')
        Image.find({})
        .then(images => res.json(images))
        .catch(errorHandler.bind(res))
    },
    create(req, res) {
        console.log(req.body);
	
	// Book.create(request.body)
	// 	.then(book => {
	// 		return Author.findByIdAndUpdate(book.author, { $push : { books: book } })
	// 			.then(() => response.json(book))
	// 	})
	// 	.catch(errorHandler.bind(response));
    },
    



}