require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const app = express();
const expressEjsLayout = require('express-ejs-layouts')
const flash = require('connect-flash');
const session = require('express-session');
const passport = require("passport");

const fileUpload = require('express-fileupload')
const path = require('path')

app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: path.join(__dirname, 'tmp'),
        createParentPath: true,
        limits: { fileSize: 2 * 1024 * 1024 },
    })
)

require('./config/passport')(passport)
mongoose.set("strictQuery", false);
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Database Connected'))
    .catch((err) => console.log(err));

app.set('view engine', 'ejs');
app.use(expressEjsLayout);

app.use(express.urlencoded({ extended: false }));

app.use(session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
})

app.use(express.static("public"))

app.use('/', require('./routes'));
app.use('/category', require('./routes/category'));
app.use('/product', require('./routes/product'));
app.use('/users', require('./routes/users'));

app.listen(5001, () => {
    console.log(`Server Started at http://localhost:${5001}`)
})