const express = require("express");
const router = express.Router();
const getAnAcceptPaymentPage = require('../accept_hosted/getAnAcceptPaymentPage');
const {getPaymentPageCallback} = require('../callbacks/getPaymentPageCallback');

router.get('/',(req,res) => {
	return getAnAcceptPaymentPage(getPaymentPageCallback)

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