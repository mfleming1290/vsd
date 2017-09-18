const imageController = require('../../controllers/images');
const router = require('express').Router();

module.exports = router
        .post('/add', imageController.add)
        .get('/', imageController.index)
        .post('/', imageController.create)
    



// module.exports = function(app) {
//     console.log('routes');
//      app.post('/uploads', imageController.add)
        
// }



// var multer = require('multer');


// var storage = multer.diskStorage({ //multers disk storage settings
//         destination: function (req, file, cb) {
//             cb(null, './uploads/');
//         },
//         filename: function (req, file, cb) {
//             var datetimestamp = Date.now();
//             cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1]);
//         }
//     });

//     var upload = multer({ //multer settings
//                     storage: storage
//                 }).single('file');

//     /** API path that will upload the files */
//     app.post('/upload', function(req, res) {
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