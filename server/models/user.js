const mongoose = require('mongoose');
const bcrypt = require('bcrypt-as-promised')
const validator = require('validator')
const { Schema } = mongoose

const userSchema = new Schema({
    
    email: {
        type: String,
        required: true,
        trim: true,
        validate: {
            validator(value) {
                return validator.isEmail(value)
            }
        },
        unique: true
    },
    password: {
        type: String,
        required: true
    }, 
}, {
    timestamps: true
});

userSchema.pre('save', function(next) {
    if (!this.isModified('password')) return next();

    bcrypt.hash(this.password, 10)
        .then(hashed => {
            this.password = hashed;
            next();
        })
        .catch(next);
});

userSchema.statics.validatePassword = function(canidatePassword, hashedPassword) {
    return bcrypt.compare(canidatePassword, hashedPassword);
}

module.exports =  mongoose.model('User', userSchema)