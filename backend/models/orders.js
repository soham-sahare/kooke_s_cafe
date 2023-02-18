const mongoose = require('mongoose');

const orders = new mongoose.Schema({
    id: {
        required: true,
        type: String
    },
    items: {
        required: true,
        type: String
    },
    name: {
        required: true,
        type: String
    },
    phone_number: {
        required: true,
        type: String
    },
    email: {
        required: true,
        type: String
    },
    bill_amount: {
        required: true,
        type: String
    },
    table_number: {
        required: true,
        type: String
    },
    status: {
        required: true,
        type: String
    }
})

module.exports = mongoose.model('orders', orders)