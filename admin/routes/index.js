const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth')
const Orders = require("../models/order");


router.get('/', ensureAuthenticated, (req, res) => {
    res.redirect('/dashboard')
})

router.get('/dashboard', ensureAuthenticated, async (req, res) => {

    var orders = await Orders.find();
    req.flash('success_msg', 'You are logged in Successfully!');

    res.render('dashboard', {
        user: req.user,
        orders: orders
    });
})

router.get('/dashboard/orders', ensureAuthenticated, (req, res) => {
    res.render('orders');
})

router.get('/dashboard/all-orders', ensureAuthenticated, async (req, res) => {

    var orders = await Orders.find();
    res.render('all-orders', { orders: orders });
})

module.exports = router; 