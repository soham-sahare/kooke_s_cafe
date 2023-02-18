const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth')

const Products = require('../models/products');
const Categories = require('../models/categories');


var MongoClient = require('mongodb').MongoClient;

const path = require('path')
const { v4: uuidv4 } = require('uuid');

router.get('/add', ensureAuthenticated, async (req, res) => {
    var categories = await Categories.find();
    res.render('product/add-product', { categories: categories });
})

router.post('/add', ensureAuthenticated, async (req, res) => {
    try {
        const file = req.files.image;

        const fileName = new Date().getTime().toString() + path.extname(file.name)
        const savePath = path.join('./public', 'uploads/product', fileName)
        if (file.truncated) {
            throw new Error('File size is too big...')
        }
        if (file.mimetype !== 'image/jpeg') {
            throw new Error('Only jpegs are supported')
        }
        await file.mv(savePath)

        const cat = await Categories.findOne({ id: req.body.category_id })

        const data = await new Products({
            id: uuidv4(),
            name: req.body.name,
            image: "http://localhost:5001/" + 'uploads/product/' + fileName,
            description: req.body.description,
            price: req.body.price,
            type: cat.name,
            quantity: req.body.quantity,
            category_ids: req.body.category_id
        })

        const dataToSave = await data.save();
        req.flash('success_msg', 'Product Added!');

        res.redirect('/product/add')
    } catch (error) {
        console.log(error)
        res.send('Error uploading file')
    }
})

router.get('/edit/:id', ensureAuthenticated, async (req, res) => {
    var product = await Products.findOne({ id: req.params.id })
    var categories = await Categories.find();
    res.render('product/edit-product', { product: product, categories: categories });
})

router.post('/edit/:id', ensureAuthenticated, async (req, res) => {
    try {
        const file = req.files.image;

        const fileName = new Date().getTime().toString() + path.extname(file.name)
        const savePath = path.join('./public', 'uploads/product', fileName)
        if (file.truncated) {
            throw new Error('File size is too big...')
        }
        if (file.mimetype !== 'image/jpeg') {
            throw new Error('Only jpegs are supported')
        }
        await file.mv(savePath)

        const cat = await Categories.findOne({ id: req.body.category_id })
        console.log(cat.name);

        MongoClient.connect(process.env.DATABASE_URL, async function (err, db) {
            var db = db.db("kookes_Cafe")
            await db.collection("products").updateOne({ id: req.params.id }, {
                $set: {
                    name: req.body.name,
                    image: "http://localhost:5001/" + 'uploads/product/' + fileName,
                    description: req.body.description,
                    price: req.body.price,
                    type: cat.name,
                    quantity: req.body.quantity,
                    category_ids: req.body.category_id
                }
            })
            {
                if (err) throw err;
                db.close();
            };
        });
        req.flash('success_msg', 'Edit Successfull!');
        res.redirect('/dashboard')
    } catch (error) {
        console.log(error)
        req.flash('error_msg', 'Edit Unsuccessfull!');
        res.redirect('/dashboard')
    }

})

router.get('/all', ensureAuthenticated, async (req, res) => {
    var products = await Products.find();
    res.render('product/all-products', { products: products });

})

module.exports = router;