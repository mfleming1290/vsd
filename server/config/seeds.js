const _ = require('lodash')
const faker = require('faker')
const { Db, Server } = require('mongodb')
const mongoose = require('mongoose')
const State = require('mongoose').model('State')
const Category = require('mongoose').model('Category')
const City = require('mongoose').model('City')
const Ad = require('mongoose').model('Ad')
var NodeGeocoder = require('node-geocoder');
 
var options = {
  provider: 'google',
 
  // Optional depending on the providers
  httpAdapter: 'https', // Default
  apiKey: 'AIzaSyDUA183McO9vbeCWkjIeEM3xGqjmsWDtBE', // for Mapquest, OpenCage, Google Premier
  formatter: null         // 'gpx', 'string', ...
};
 
var geocoder = NodeGeocoder(options);



// import _ from 'lodash';
// import faker from 'faker';
// import { Db, Server } from 'mongodb';
// import { GENRES } from './constants';

const MINIMUM_ADS = 200;
const ADS_TO_ADD = 100;

let adCollection;
const db = new Db('vsdListin', new Server('localhost', 27017));

db.open()
  .then(() => {
    adsCollection = db.collection('ads');
    return adsCollection.count({});
  })
  .then(count => {
    if (count < MINIMUM_ADS) {
      const ads = _.times(ADS_TO_ADD, () => {
  ad = createAd()
  Ad.create(ad)
                .then((ad) => {
                    return City.findOneAndUpdate({name: ad.city}, {name: ad.city} , { upsert: true, new: true})
                    .then((city) => {
                        return State.findOneAndUpdate({name: ad.state}, { $push : { cities: city } }, { upsert: true, new: true})
                        .then((updatedState) => {
                            Category.findOneAndUpdate({ 'name': ad.category, 'state': ad.state, stateId: updatedState._id, 'city': ad.city, cityId: city._id }, { 'name': ad.category, 'state': ad.state, stateId: updatedState._id, 'city': ad.city, cityId: city._id }, { upsert: true, new: true })
                                .then((category) => {
                                    return City.findOneAndUpdate({name: ad.city}, {stateId: updatedState._id} , { upsert: true, new: true})
                                    .then((city) =>{
                                      geocoder.geocode(ad.zipcode)
                                            .then(function(res) {
                                            console.log('longitude',res[0].longitude, 'latitude',res[0].latitude);
                                            ad.geometry = {type: "Point", coordinates: [res[0].longitude, res[0].latitude]}
                                            ad.mapCoordinates = [res[0].latitude, res[0].longitude]
                                            ad.adCategory = category._id
                                            ad.stateId = updatedState._id
                                            ad.cityId = city._id
                                            ad.save()
                                            .then((ad) => {
                                                return ad
                                            })
                                            })
                                        
                                    })
                                })

                        })
                    })
                })

});
        console.log('created', ads)
      // adsCollection.insertMany(ads);
    }
  })
  .catch(e => console.log(e));



function createNewAd(){
  newAd = createAd()
  newAd.stateId = newAd.state
  newAd.cityId = newAd.city
  return newAd  
}    

    
    
function createAd() {
  return {
    name: faker.name.findName(),
    company: faker.company.companyName(),
    state: faker.address.state(),
    img: faker.image.abstract(),
    city: faker.address.city(),
    link: faker.internet.url(),
    category: faker.commerce.department(),
    phone: faker.phone.phoneNumber(),
    description: faker.lorem.sentence(),
    zipcode: faker.address.zipCode(),
    address: faker.address.streetAddress()
  };
}







function randomEntry(array) {
  return array[~~(Math.random() * array.length)];
}

function randomBetween(min, max) {
  return ~~(Math.random() * (max-min)) + min;
}

// const _ = require('lodash')
// const faker = require('faker')
// const { Db, Server } = require('mongodb')
// const mongoose = require('mongoose')
// const State = require('mongoose').model('State')
// const Category = require('mongoose').model('Category')
// const City = require('mongoose').model('City')
// const Ad = require('mongoose').model('Ad')




// // import _ from 'lodash';
// // import faker from 'faker';
// // import { Db, Server } from 'mongodb';
// // import { GENRES } from './constants';

// const MINIMUM_ADS = 200;
// const ADS_TO_ADD = 1;

// let adCollection;
// const db = new Db('vsdListin', new Server('localhost', 27017));

// db.open()
//   .then(() => {
//     adsCollection = db.collection('ads');
//     return adsCollection.count({});
//   })
//   .then(count => {
//     if (count < MINIMUM_ADS) {
//       const ads = _.times(ADS_TO_ADD, () => createState());
//         console.log('created', ads)
//       // adsCollection.insertMany(ads);
//     }
//   })
//   .catch(e => console.log(e));



// function createNewAd(){
//   newAd = createAd()
//   newAd.stateId = newAd.state
//   newAd.cityId = newAd.city
//   return newAd  
// }    

    
    
// function createAd() {
//   return {
//     name: faker.name.findName(),
//     company: faker.company.companyName(),
//     state: faker.address.state(),
//     image: faker.image.abstract(),
//     city: faker.address.city(),
//     website: faker.internet.url(),
//     category: faker.commerce.department(),
//     phone: faker.phone.phoneNumber(),
//     description: faker.lorem.sentence(),
//   };
// }

// function createState() {
//   ad = createAd()
//   return  {
//     name: ad.state,
    
//   };
// }

// function createAds() {
//   ad = createdAd()
//   // ad.stateId = ad.state
//   // ad.cityId = ad.city

//   return ad
// }



// function randomEntry(array) {
//   return array[~~(Math.random() * array.length)];
// }

// function randomBetween(min, max) {
//   return ~~(Math.random() * (max-min)) + min;
// }

