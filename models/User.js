const mongoose = require('mongoose');
const validator = require('validator');

const UserSchema = new mongoose.Schema({
    name: {
        type:String,
        required:[true, 'please provide name'],

    },
    email: {
        type:String,
        required:[true, 'please provide email'],
        validate: {
            validator:validator.isEmail,
            message: 'Please provide a valid email'
        }
    },
    password: {
        type:String,
        required:[true, 'please provide password'],
        maxLength: 7,

    },
    
},{timestamps: true},);


module.exports = mongoose.model('User', UserSchema);