require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const products = require('./routes/products');
const categories = require('./routes/categories');
const orders = require('./routes/orders');

mongoose.set("strictQuery", false);
mongoose.connect(process.env.DATABASE_URL);

const database = mongoose.connection;
database.on('error', (error) => {
    console.log(error)
})
database.once('connected', () => {
    console.log('Database Connected');
})

const app = express();
app.use(express.json());

app.use(cors({
    origin: '*'
}));

app.use('/api/products', products)
app.use('/api/categories', categories)
app.use('/api/orders', orders)

app.get('/', (req, res) => {
    res.send("<h1 style = 'text-align: center'>kooke-s-cafe API</h1>")
})

app.listen(5000, () => {
    console.log(`Server Started at http://localhost:${5000}`)
})