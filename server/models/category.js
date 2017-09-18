const mongoose = require('mongoose');
const { Schema } = mongoose;

const categorySchema = new Schema ({
    name: {
        type: String,
        trim: true,
    },
    state: {
        type: String,
        trim: true,
    },
    stateId: {
        type: Schema.Types.ObjectId,
        ref: 'State',
    },
    city: {
        type: String,
        trim: true,
    },
    cityId: {
        type: Schema.Types.ObjectId,
        ref: 'City',
    },
    ads: {
        type: Schema.Types.ObjectId,
        ref: 'Ad',
    }
});

module.exports = mongoose.model('Category', categorySchema);
