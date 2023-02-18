const express = require('express');
const { v4: uuidv4 } = require('uuid');

const Categories = require('../models/categories');
const Products = require('../models/products');

const router = express.Router();
module.exports = router;

router.get('/', async (req, res) => {
    try {
        const products = await Products.find();
        res.send(products)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.post('/:category_id', async (req, res) => {

    let product = req.body
    let category = await Categories.findOne({ id: req.params.category_id })

    const data = new Products({
        id: uuidv4(),
        name: product.name,
        image: product.image,
        description: product.description,
        price: product.price,
        type: category.name,
        quantity: product.quantity,
        category_ids: req.params.category_id
    })

    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})