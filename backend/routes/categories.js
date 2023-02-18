const express = require('express');
const { v4: uuidv4 } = require('uuid');

const Categories = require('../models/categories');

const router = express.Router();
module.exports = router;

router.get('/', async (req, res) => {
    try {
        var categories = await Categories.find();
        res.send(categories)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.post('/', async (req, res) => {

    let category = req.body

    const data = new Categories({
        id: uuidv4(),
        name: category.name,
        image_icon_url: category.image_icon_url,
    })

    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})