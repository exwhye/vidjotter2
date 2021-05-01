const express = require('express');
const flashMessage = require('../helpers/messenger');
const router = express.Router();
const alertMessage = require('../helpers/messenger');

//home
router.get('/', (req, res) => {
	const title = 'Video Jotter';
	res.render('index', {title: title}) // renders views/index.handlebars
});

//login user
router.get('/showLogin', (req, res) => {
	console.log('login page accessed');
	return res.render('user/login') 
});

//register
router.get('/showRegister',(req, res) =>{
	console.log("Register page accessed");
	return res.render( 'user/register') 
});

//about
router.get("/about", async function(req, res) {
	console.log("About page accessed");

	alertMessage(res, 'success',
	'This is an important message', 'fas fa-sign-in-alt', true);
	flashMessage(res,'success',"hi", 'fas fa-sign-in-alt',true)
	alertMessage(res, 'danger',
	'nimama', 'fas fa-exclamation-circle', true);

	let success_msg = 'Success ';
	let error = 'Error using error';
	let errors = [
		{text: 'First error'},
		{text: 'Second error'},
		{text: 'Third error'}
	];
	return res.render('about', {
		author: "xy",
		errors,
		success_msg

	});
});


// Logout User
router.get('/logout', (req, res) => {
	req.logout();
	res.redirect('/');
});

module.exports = router;
