const mongoose = require('mongoose');

// const imageSchema = new mongoose.Schema({
//     url: {
//       type: String,
//       required: false
//     },
//     // Other image properties can be added here
//   });

const productSchema = mongoose.Schema({

    category: {
        // type: mongoose.Schema.Types.ObjectId,
        // ref: 'Category'
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: false,
    },
    condition: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    image: {
        type: Array,
        default: []
    },

    location: {
        type: String,
        required: true,
    },


    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = mongoose.model('product', productSchema);