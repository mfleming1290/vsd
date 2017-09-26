const mongoose = require('mongoose');
const { Schema } = mongoose;

const citySchema = new Schema ({
    name: {
        type: String,
        trim: true,
    },
    ads: [{
        type: Schema.Types.ObjectId,
        ref: 'Ad',
    }],
    stateId: {
       type: Schema.Types.ObjectId,
        ref: 'State', 
    }
    
});

module.exports = mongoose.model('City', citySchema);

