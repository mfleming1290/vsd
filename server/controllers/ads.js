const Ad = require('mongoose').model('Ad')
const State = require('mongoose').model('State')
const Category = require('mongoose').model('Category')
const City = require('mongoose').model('City')
const errorHandler = require('./errors')


var NodeGeocoder = require('node-geocoder');
 
var options = {
  provider: 'google',
 
  // Optional depending on the providers
  httpAdapter: 'https', // Default
  apiKey: 'AIzaSyDUA183McO9vbeCWkjIeEM3xGqjmsWDtBE', // for Mapquest, OpenCage, Google Premier
  formatter: null         // 'gpx', 'string', ...
};
 
var geocoder = NodeGeocoder(options);
 




class AuthorsController {
    index(req, res) {
        Ad.find({}).populate('adCategory')
        .then((ads) => {
            res.json(ads)
            
            
        })
        .catch(errorHandler.bind(res))
    }
    create(req, res) {
        Ad.create(req.body)
                .then((ad) => {
                    return City.findOne({name:ad.city})
                    .then((city) => {
                        if (!city) {

                        return City.findOneAndUpdate({name: ad.city}, {name: ad.city} , { upsert: true, new: true})
                        .then((city) => {
                            return State.findOneAndUpdate({name: ad.state}, { $push : { cities: city } }, { upsert: true, new: true})
                            .then((updatedState) => {
                                Category.findOneAndUpdate({ 'name': req.body.category, 'state': req.body.state, stateId: updatedState._id, 'city': req.body.city, cityId: city._id }, { 'name': req.body.category, 'state': req.body.state, stateId: updatedState._id, 'city': req.body.city, cityId: city._id }, { upsert: true, new: true })
                                    .then((category) => {
                                        return City.findOneAndUpdate({name: ad.city}, {stateId: updatedState._id} , { upsert: true, new: true})
                                        .then((city) =>{
                                            // Or using Promise
                                            geocoder.geocode({address: req.body.address, country: 'USA', zipcode: req.body.zipcode})
                                            .then(function(location) {
                                            console.log('longitude',location[0].longitude, 'latitude',location[0].latitude);
                                            ad.geometry = {type: "Point", coordinates: [location[0].longitude, location[0].latitude]}
                                            ad.mapCoordinates = [location[0].latitude,  location[0].longitude]
                                            ad.adCategory = category._id
                                            ad.stateId = updatedState._id
                                            ad.cityId = city._id
                                            ad.save()
                                            .then((ad) => {
                                            res.json(ad)
                                            })
                                            })
                                            
                                            
                                           
                                        })
                                    })

                            })
                        })
                        }
                        else {
                            return City.findOneAndUpdate({name: ad.city}, {name: ad.city} , { upsert: true, new: true})
                        .then((city) => {
                            return State.findOneAndUpdate({name: ad.state}, {name: ad.state} , { upsert: true, new: true})
                            .then((updatedState) => {
                                Category.findOneAndUpdate({ 'name': req.body.category, 'state': req.body.state, stateId: updatedState._id, 'city': req.body.city, cityId: city._id }, { 'name': req.body.category, 'state': req.body.state, stateId: updatedState._id, 'city': req.body.city, cityId: city._id }, { upsert: true, new: true })
                                    .then((category) => {
                                        return City.findOneAndUpdate({name: ad.city}, {stateId: updatedState._id} , { upsert: true, new: true})
                                        .then((city) =>{
                                            // Or using Promise
                                            geocoder.geocode({address: req.body.address, country: 'USA', zipcode: req.body.zipcode})
                                            .then(function(location) {
                                            console.log('longitude',location[0].longitude, 'latitude',location[0].latitude);
                                            ad.geometry = {type: "Point", coordinates: [location[0].longitude, location[0].latitude]}
                                            ad.mapCoordinates = [location[0].latitude, location[0].longitude]
                                            ad.adCategory = category._id
                                            ad.stateId = updatedState._id
                                            ad.cityId = city._id
                                            ad.save()
                                            .then((ad) => {
                                            res.json(ad)
                                            })
                                            })
                                        })
                                    })

                            })
                        })
                        }
                    })
                })
            .catch(errorHandler.bind(res))
    }      
    show(req, res) {
        Ad.findById(req.params.id)
        .then(ad => res.json(ad))
        .catch(errorHandler.bind(res))
    }
    getState(req, res) {
        Ad.find({state: req.params.id})
        .then(ad => res.json(ad))
        .catch(errorHandler.bind(res))
    }
    update(req, res) {
        Ad.findByIdAndUpdate(req.params.id, req.body, {new: true})
        .then((ad) => {
            return City.findOneAndUpdate({name: ad.city}, { $push : { ads: ad } }, { upsert: true, new: true})
            .then((city) => {
            return State.findOneAndUpdate({name: ad.state}, { $push : { ads: ad, cities: city } }, { upsert: true, new: true})
            .then((updatedState) => {
            Category.findOneAndUpdate({ 'name': req.body.category, 'state': req.body.state, stateId: updatedState._id, 'city': req.body.city, cityId: city._id }, { 'name': req.body.category, 'state': req.body.state, stateId: updatedState._id, 'city': req.body.city, cityId: city._id }, { upsert: true, new: true })
            .then((category) => {
            ad.adCategory = category._id
            ad.stateId = updatedState._id
                ad.cityId = city._id
                ad.save()
                    .then((ad) => {
                        res.json(ad)
                            })
                        })

                })
            })
        })
        .catch(errorHandler.bind(res))
    }
    destroy(req, res) {
        Ad.findByIdAndRemove(req.params.id)
        .then(ad => res.json(ad))
        .catch(errorHandler.bind(res))
    }
    getCategories(req, res) {
        Ad.find({adCategory: req.params.category})
        .then(ad => res.json(ad))
        .catch(errorHandler.bind(res))
    }
    getSearchAds(req, res) {
            geocoder.geocode(req.params.loc)
            .then(function(address) {
            Ad.find({$text: {$search: req.params.id}, geometry: {$geoWithin: {$centerSphere: [[address[0].longitude ,address[0].latitude], 100 / 3963.2]}}})
                    .then((ads) => { 
                        console.log('found ads',ads)
                        res.json(ads)
                    })

            
            })
        .catch(errorHandler.bind(res))
    }
}



module.exports = new AuthorsController

                                



    // Ad.create(req.body)
    //             .then((ad) => {
    //                 return City.findOne({name:ad.city})
    //                 .then((city) => {
    //                     if (!city) {

    //                     return City.findOneAndUpdate({name: ad.city}, {name: ad.city} , { upsert: true, new: true})
    //                     .then((city) => {
    //                         return State.findOneAndUpdate({name: ad.state}, { $push : { cities: city } }, { upsert: true, new: true})
    //                         .then((updatedState) => {
    //                             Category.findOneAndUpdate({ 'name': req.body.category, 'state': req.body.state, stateId: updatedState._id, 'city': req.body.city, cityId: city._id }, { 'name': req.body.category, 'state': req.body.state, stateId: updatedState._id, 'city': req.body.city, cityId: city._id }, { upsert: true, new: true })
    //                                 .then((category) => {
    //                                     return City.findOneAndUpdate({name: ad.city}, {stateId: updatedState._id} , { upsert: true, new: true})
    //                                     .then((city) =>{
    //                                         ad.adCategory = category._id
    //                                         ad.stateId = updatedState._id
    //                                         ad.cityId = city._id
    //                                         ad.save()
    //                                         .then((ad) => {
    //                                         res.json(ad)
    //                                         })
    //                                     })
    //                                 })

    //                         })
    //                     })
    //                     }
    //                     else {
    //                         return City.findOneAndUpdate({name: ad.city}, {name: ad.city} , { upsert: true, new: true})
    //                     .then((city) => {
    //                         return State.findOneAndUpdate({name: ad.state}, {name: ad.state} , { upsert: true, new: true})
    //                         .then((updatedState) => {
    //                             Category.findOneAndUpdate({ 'name': req.body.category, 'state': req.body.state, stateId: updatedState._id, 'city': req.body.city, cityId: city._id }, { 'name': req.body.category, 'state': req.body.state, stateId: updatedState._id, 'city': req.body.city, cityId: city._id }, { upsert: true, new: true })
    //                                 .then((category) => {
    //                                     return City.findOneAndUpdate({name: ad.city}, {stateId: updatedState._id} , { upsert: true, new: true})
    //                                     .then((city) =>{
    //                                         ad.adCategory = category._id
    //                                         ad.stateId = updatedState._id
    //                                         ad.cityId = city._id
    //                                         ad.save()
    //                                         .then((ad) => {
    //                                         res.json(ad)
    //                                         })
    //                                     })
    //                                 })

    //                         })
    //                     })
    //                     }
    //                 })
    //             })
    //         .catch(errorHandler.bind(res))
    // }     