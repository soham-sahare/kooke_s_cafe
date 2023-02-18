const express = require('express');
const router = express.Router();
const User = require("../models/user");
const bcrypt = require('bcrypt');
const passport = require('passport');
const { checkLoggedIn } = require('../config/auth')

router.get('/login', checkLoggedIn, (req, res) => {
    res.render('users/login');
})

router.post('/login', checkLoggedIn, (req, res, next) => {

    req.flash('success_msg', 'Logged In Successfull!');

    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next)

})

router.get('/register', checkLoggedIn, (req, res) => {
    res.render('users/register')
})

router.post('/register', checkLoggedIn, (req, res) => {
    const { name, email, password } = req.body;
    let errors = [];
    let password2 = password
    console.log(' Name ' + name + ' email :' + email + ' pass:' + password);
    if (!name || !email || !password) {
        errors.push({ msg: "Please fill in all fields" })
    }

    if (password !== password2) {
        errors.push({ msg: "passwords dont match" });
    }

    if (password.length < 6) {
        errors.push({ msg: 'Password should be atleast 6 characters' })
    }

    if (errors.length > 0) {
        res.render('users/register', {
            errors: errors,
            name: name,
            email: email,
            password: password,
            password2: password2
        })
    } else {
        User.findOne({ email: email }).exec((err, user) => {
            console.log(user);
            if (user) {
                errors.push({ msg: 'Email already registered' });
                res.render('users/register', { errors, name, email, password, password2 })
            } else {
                const newUser = new User({
                    name: name,
                    email: email,
                    password: password
                });

                bcrypt.genSalt(10, (err, salt) =>
                    bcrypt.hash(newUser.password, salt,
                        (err, hash) => {
                            if (err) throw err;
                            newUser.password = hash;
                            newUser.save()
                                .then((value) => {
                                    console.log(value)
                                    req.flash('success_msg', 'You have now registered!');
                                    res.redirect('/users/login');
                                })
                                .catch(value => console.log(value));

                        }));
            }
        })
    }
})

router.get('/forgot-password', checkLoggedIn, (req, res) => {
    res.render('users/password');
})


router.get('/logout', function (req, res, next) {
    req.logout(function (err) {
        if (err) { return next(err); }
        req.flash('success_msg', 'Logged out successfully!');
        res.redirect('/users/login');
    });
});

module.exports = router;