const express = require('express');
const router = express.Router();
const alertMessage = require('../helpers/messenger');
const User = require('../models/User');



// User register URL using HTTP post => /user/register
router.post('/register', (req, res) => {
    let errors = [];
    // Retrieves fields from register page from request body
    let { name, email, password, password2 } = req.body;
    // Checks if both passwords entered are the same
    if (password !== password2) {
        errors.push({ text: 'Passwords do not match' });
    }
    // Checks that password length is more than 4
    if (password.length < 4) {
        errors.push({ text: 'Password must be at least 4 characters' });
    }
    if (errors.length > 0) {
        res.render('user/register', {
            errors,
            name,
            email,
            password,
            password2
        });
    } else {
        // If all is well, checks if user is already registered
        User.findOne({ where: { email: req.body.email } })
            .then(user => {
                if (user) {
                    // If user is found, that means email has already been
                    // registered
                    res.render('user/register', {
                        error: user.email + ' already registered',
                        name,
                        email,
                        password,
                        password2
                    });
                } else {
                    // Create new user record
                    User.create({ name, email, password })
                        .then(user => {
                            alertMessage(res, 'success', user.name + ' added.Please login', 'fas fa - sign -in -alt', true);
                            res.redirect('/showLogin');
                        })
                        .catch(err => console.log(err));
                }
            });
    }

});
module.exports = router;

//hello
//testing only