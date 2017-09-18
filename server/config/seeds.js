const _ = require('lodash')
const faker = require('faker')
const { Db, Server } = require('mongodb')
const mongoose = require('mongoose')
const State = require('mongoose').model('State')
const Category = require('mongoose').model('Category')
const City = require('mongoose').model('City')
const Ad = require('mongoose').model('Ad')




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

