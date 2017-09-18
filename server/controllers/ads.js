const Ad = require('mongoose').model('Ad')
const State = require('mongoose').model('State')
const Category = require('mongoose').model('Category')
const City = require('mongoose').model('City')
const errorHandler = require('./errors')

class AuthorsController {
    index(req, res) {
        Ad.find({}).populate('adCategory')
        .then(ads => res.json(ads))
        .catch(errorHandler.bind(res))
    }
    create(req, res) {
        console.log('in create')
        Ad.create(req.body)
                .then((ad) => {
                    return City.findOneAndUpdate({name: ad.city}, {name: ad.city} , { upsert: true, new: true})
                    .then((city) => {
                        return State.findOneAndUpdate({name: ad.state}, { $push : { cities: city } }, { upsert: true, new: true})
                        .then((updatedState) => {
                            Category.findOneAndUpdate({ 'name': req.body.category, 'state': req.body.state, stateId: updatedState._id, 'city': req.body.city, cityId: city._id }, { 'name': req.body.category, 'state': req.body.state, stateId: updatedState._id, 'city': req.body.city, cityId: city._id }, { upsert: true, new: true })
                                .then((category) => {
                                    return City.findOneAndUpdate({name: ad.city}, {stateId: updatedState._id} , { upsert: true, new: true})
                                    .then((city) =>{
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
            .catch(errorHandler.bind(res))
    }
    show(req, res) {
        console.log('in show')
        Ad.findById(req.params.id)
        .then(ad => res.json(ad))
        .catch(errorHandler.bind(res))
    }
    getState(req, res) {
        console.log('in get state')
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
        console.log('id cats', req.params.category)
        Ad.find({adCategory: req.params.category})
        .then(ad => res.json(ad))
        .catch(errorHandler.bind(res))
    }
    getSearchAds(req, res) {
        console.log('in get search ads', req.params.id)
        Ad.find({ $text: { $search: req.params.id }},{score: {$meta: "textScore"}}).sort({score:{$meta:"textScore"}})
        .then(ad => {
            console.log(ad)
            res.json(ad)
        })
        .catch(errorHandler.bind(res))
    }
}



module.exports = new AuthorsController

                                
// create(req, res) {
//         console.log('in create')
//         Ad.create(req.body)
//                 .then((ad) => {
//                     return City.findOneAndUpdate({name: ad.city}, { $push : { ads: ad } }, { upsert: true, new: true})
//                     .then((city) => {
//                         return State.findOneAndUpdate({name: ad.state}, { $push : { ads: ad, cities: city } }, { upsert: true, new: true})
//                         .then((updatedState) => {
//                             Category.findOneAndUpdate({ 'name': req.body.category, 'state': req.body.state, stateId: updatedState._id, 'city': req.body.city, cityId: city._id }, { 'name': req.body.category, 'state': req.body.state, stateId: updatedState._id, 'city': req.body.city, cityId: city._id }, { upsert: true, new: true })
//                                 .then((category) => {
//                                     ad.adCategory = category._id
//                                     ad.stateId = updatedState._id
//                                     ad.cityId = city._id
//                                     ad.save()
//                                     .then((ad) => {
//                                     res.json(ad)
//                                     })
//                                 })

//                         })
//                     })
//                 })

                