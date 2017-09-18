const mongoose = require('mongoose')
const { Schema } = mongoose;

var enu = {
  values: ["Alaska", "Alabama", "Arkansas", "American Samoa", "Arizona", "California", "Colorado", "Connecticut", "District of Columbia", "Delaware", "Florida", "Georgia", "Guam", "Hawaii", "Iowa", "Idaho", "Illinois", "Indiana", "Kansas", "Kentucky", "Louisiana", "Massachusetts", "Maryland", "Maine", "Michigan", "Minnesota", "Missouri", "Mississippi", "Montana", "North Carolina", "North Dakota", "Nebraska", "New Hampshire", "New Jersey", "New Mexico", "Nevada", "New York", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Puerto Rico", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Virginia", "Virgin Islands", "Vermont", "Washington", "Wisconsin", "West Virginia", "Wyoming"], 
  message: 'Invalid State.'
}

const adSchema = new Schema({
    name: {
        type: String,
        trim: true
    },
    company: {
        type: String,
        trim: true,
    },
    state: {
        type: String,
        trim: true,
        enum: enu,
        required: [true, 'Please enter a state']
    },
    city: {
        type: String,
        trim: true,
        required: [true, 'Please enter a city']
    },
    description: {
        type: String,
        trim: true
    },
    phone: {
        type: String,
        trim: true
    },
    link: {
        type: String,
        trim: true
    },
    category: {
        type: String,
        trim: true
    },
    adCategory: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
    },
    stateId: {
        type: Schema.Types.ObjectId,
        ref: 'State',
    },
    cityId: {
        type: Schema.Types.ObjectId,
        ref: 'State',
    }, 
    img: {
        type: String,
        trim: true
    }
    
    

}, {timestamps: true})

module.exports = mongoose.model('Ad', adSchema)

// adSchema.index({ company: 'text' })
