const express = require("express");
const router = express.Router();
const getAnAcceptPaymentPage = require('../accept_hosted/getAnAcceptPaymentPage');
const sendToken = require('../accept_hosted/sendToken');

router.get('/',(req,res) => {
	const profile = {customerProfileId : req.query.profileId};
	return getAnAcceptPaymentPage(profile)

	.then(response => {
		console.log(response);
		return res.json({
			code:200,
			response
		});
	})

	.catch(err => {
		console.log('error getting payment page',err);
		return res.json({
			code:500,
			error:'An error occured nice'
		});
	})
});

module.exports = {router};