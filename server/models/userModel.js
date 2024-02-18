const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter name']
    },
    email: {
        type: String,
        required: [true, 'Please enter email']
    },
    phone: {
        type: String,
        required: [true, 'Please enter phone']
    },
    password: {
        type: String,
        required: [true, 'Please enter password']
    },
    gender: {
        type: String,
        required: false,
        defalut:'Prefer not to say'
    },
    about_me: {
        type: String,
        required:false,
        default: ''

    },
      
    image: {
        type: String,
        required: false,
        default: null
    }

})

module.exports = mongoose.model('User', userSchema)