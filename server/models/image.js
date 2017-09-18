const mongoose = require('mongoose');
const { Schema } = mongoose;

const imageSchema = new Schema ({
    path: {
        type: String,
        required: true,
        trim: true
    },
    originalname: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Image', imageSchema);
