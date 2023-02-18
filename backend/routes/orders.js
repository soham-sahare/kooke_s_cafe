const express = require('express');
const { v4: uuidv4 } = require('uuid');

const Orders = require('../models/orders');

const router = express.Router();
module.exports = router;

router.post('/', async (req, res) => {

    let order = req.body
    console.log(order)
    const data = new Orders({
        id: uuidv4(),
        items: order.items,
        name: order.name,
        phone_number: order.phone_number,
        email: order.email,
        bill_amount: order.bill_amount,
        table_number: 3,
        status: order.status
    })

    try {
        const orders = data.save();
        res.status(200).json(orders)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})