const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth')

var MongoClient = require('mongodb').MongoClient;

const path = require('path')
const { v4: uuidv4 } = require('uuid');
const Categories = require('../models/categories');

router.get('/add', ensureAuthenticated, (req, res) => {
    res.render('category/add-category');
})

router.post('/add', ensureAuthenticated, async (req, res) => {
    try {
        const file = req.files.image;

        const fileName = new Date().getTime().toString() + path.extname(file.name)
        const savePath = path.join('./public', 'uploads/category', fileName)
        if (file.truncated) {
            throw new Error('File size is too big...')
        }
        if (file.mimetype !== 'image/jpeg') {
            throw new Error('Only jpegs are supported')
        }
        await file.mv(savePath)

        const data = await new Categories({
            id: uuidv4(),
            name: req.body.name,
            image_icon_url: "http://localhost:5001/" + 'uploads/category/' + fileName,
        })

        const dataToSave = await data.save();
        res.redirect('/category/add')
    } catch (error) {
        console.log(error)
        res.send('Error uploading file')
    }
})

router.get('/edit/:id', ensureAuthenticated, async (req, res) => {
    var category = await Categories.findOne({ id: req.params.id })
    res.render('category/edit-category', { category: category });
})

router.post('/edit/:id', ensureAuthenticated, async (req, res) => {
    try {
        const file = req.files.image;

        const fileName = new Date().getTime().toString() + path.extname(file.name)
        const savePath = path.join('./public', 'uploads/category', fileName)
        if (file.truncated) {
            throw new Error('File size is too big...')
        }
        if (file.mimetype !== 'image/jpeg') {
            throw new Error('Only jpegs are supported')
        }
        await file.mv(savePath)
        MongoClient.connect(process.env.DATABASE_URL, async function (err, db) {
            var db = db.db("kookes_Cafe")
            await db.collection("categories").updateOne({ id: req.params.id }, { $set: { name: req.body.name, image_icon_url: "http://localhost:5001/" + 'uploads/category/' + fileName } })
            {
                if (err) throw err;
                db.close();
            };
        });

        res.redirect('/dashboard')
    } catch (error) {
        console.log(error)
        res.send('Error uploading file')
    }

})

router.get('/all', ensureAuthenticated, async (req, res) => {
    var categories = await Categories.find();
    res.render('category/all-categories', { categories: categories });
})

module.exports = router;