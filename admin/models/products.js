const mongoose = require('mongoose');

const products = new mongoose.Schema({
    id: {
        required: true,
        type: String
    },
    name: {
        required: true,
        type: String
    },
    image: {
        required: true,
        type: String
    },
    description: {
        required: true,
        type: String
    },
    price: {
        required: true,
        type: String
    },
    type: {
        required: true,
        type: String
    },
    quantity: {
        required: true,
        type: String
    },
    category_ids: {
        required: true,
        type: String
    },

})

module.exports = mongoose.model('products', products)