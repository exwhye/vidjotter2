const express = require('express');
const router = express.Router();
const alertMessage = require('../helpers/messenger');

// User register URL using HTTP post => /user/register
router.post('/register', (req, res) => {
    let errors = []
    let success_msg = '';
    // Do exercise 3 here
    // if (req.body.password != password){
    //     errors = errors.concat({text: "Password do not match"});
    // }
    let { name, email, password, password2 } = req.body;
    let success = true;

    if (password.length < 4) {
        let msg = "Password must be at least 4 characters"
        alertMessage(res, 'danger',
            msg, 'fas fa-exclamation-circle', false);
        success = false;
    }

    if (password != password2) {
        let msg = "Password do not match";
        alertMessage(res, 'danger',
            msg, 'fas fa-exclamation-circle', false);
        success = false;
    }

    if (success) {
        let msg = email
        alertMessage(res, 'success', msg, 'fas fa-sign-in-alt', true);
        res.redirect('/showLogin');
    }
    else {
        res.render('user/register', { name, email });
    }

});
module.exports = router;

//hello
//testing only