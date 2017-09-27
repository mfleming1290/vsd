var multer = require('multer');
const Image = require('mongoose').model('Image')
const Banner = require('mongoose').model('Banner')
const path = require('path')
const errorHandler = require('./errors')



////////// Ad Images //////////
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

////////// Banner Images //////////
var bannerStorage = multer.diskStorage({ //multers disk storage settings
        destination: function (req, file, cb) {
            cb(null, './src/assets/img/bannerImages');
        },
        filename: function (req, file, cb) {
            var datetimestamp = Date.now();
            cb(null, file.originalname );
        },
        username: function (req, file, cb) {
            cb(null, file.file.username);
        }
    });

    var bannerUpload = multer({ //multer settings
                    storage: bannerStorage
                }).single('file');

    module.exports = {  
    add(req, res) {
        upload(req,res,function(err){
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
    bannerIndex(req, res){
        Banner.find({})
        .then(images => res.json(images))
        .catch(errorHandler.bind(res))
    },
    addBanner(req, res) {
        bannerUpload(req,res,function(err){
            if(err){
                 res.json({error_code:1,err_desc:err});
                 return;
            }
            //  res.json({error_code:0,err_desc:null});
             var path = req.file.path;
             var filename = req.file.filename;
            var imageName = req.file.originalname;

            var imagepath = {};
            imagepath['path'] = 'assets/img/bannerImages/' + filename;
            imagepath['originalname'] = imageName;
             Banner.create(imagepath)
             .then(img => {
                res.json(img)
             })
        })
    },
    bannerDestroy(req, res) {
        console.log('in banner destroy')
        Banner.findByIdAndRemove(req.params.id)
        .then(banner => res.json(banner))
        .catch(errorHandler.bind(res))
    },
    index(req, res) {
        Image.find({})
        .then(images => res.json(images))
        .catch(errorHandler.bind(res))
    },
    create(req, res) {
        console.log(req.body);
	
    },
    



}