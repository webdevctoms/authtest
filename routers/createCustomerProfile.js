const express = require("express");
const router = express.Router();
const createCustomerProfile = require('../customer_profiles/create-customer-profile');
const createCustomerPaymentProfile = require('../customer_profiles/create-customer-payment-profile');

router.post('/create',(req,res) => {
	//const profileId = req.query.profileId;
	return createCustomerProfile()

	.then(response => {
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

router.post('/paymentprofile',(req,res) => {
	const profileId = req.query.profileId;
	return createCustomerPaymentProfile(profileId)

	.then(response => {
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