const mongoose = require('mongoose');

const categories = new mongoose.Schema({
    id: {
        required: true,
        type: String
    },
    name: {
        required: true,
        type: String
    },
    image_icon_url: {
        required: true,
        type: String
    }
})

module.exports = mongoose.model('categories', categories)