const mongoose = require('mongoose');
const { Schema } = mongoose;

const stateSchema = new Schema ({
    name: {
        type: String,
        trim: true,
    },
    ads: [{
        type: Schema.Types.ObjectId,
        ref: 'Ad',
    }],
    cities: [{
        type: Schema.Types.ObjectId,
        ref: 'City',
    }],

    
});

module.exports = mongoose.model('State', stateSchema);
