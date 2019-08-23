'use strict';

var ApiContracts = require('authorizenet').APIContracts;
var ApiControllers = require('authorizenet').APIControllers;
var {API_KEY,TRANSACTION_KEY} = require('../config.js');
var randomStreetNumber = Math.round(Math.random() * 1000)

function createCustomerPaymentProfile(customerProfileId) {
	let promise = new Promise((resolve,reject) => {

		var merchantAuthenticationType = new ApiContracts.MerchantAuthenticationType();
		merchantAuthenticationType.setName(API_KEY);
		merchantAuthenticationType.setTransactionKey(TRANSACTION_KEY);

		var creditCard = new ApiContracts.CreditCardType();
		creditCard.setCardNumber('4012888818888');
		creditCard.setExpirationDate('0822');

		var paymentType = new ApiContracts.PaymentType();
		paymentType.setCreditCard(creditCard);

		var customerAddress = new ApiContracts.CustomerAddressType();
		customerAddress.setFirstName('test');
		customerAddress.setLastName('scenario');
		customerAddress.setAddress(randomStreetNumber + ' Main Street');
		customerAddress.setCity('Bellevue');
		customerAddress.setState('WA');
		customerAddress.setZip('98004');
		customerAddress.setCountry('USA');
		customerAddress.setPhoneNumber('000-000-0000');

		var profile = new ApiContracts.CustomerPaymentProfileType();
		profile.setBillTo(customerAddress);
		profile.setPayment(paymentType);
		// profile.setDefaultPaymentProfile(true);

		var createRequest = new ApiContracts.CreateCustomerPaymentProfileRequest();

		createRequest.setMerchantAuthentication(merchantAuthenticationType);
		createRequest.setCustomerProfileId(customerProfileId);
		createRequest.setPaymentProfile(profile);

		//pretty print request
		//console.log(JSON.stringify(createRequest.getJSON(), null, 2));
			
		var ctrl = new ApiControllers.CreateCustomerPaymentProfileController(createRequest.getJSON());

		ctrl.execute(function(){

			var apiResponse = ctrl.getResponse();

			var response = new ApiContracts.CreateCustomerPaymentProfileResponse(apiResponse);

			//pretty print response
			//console.log(JSON.stringify(response, null, 2));

			if(response != null) 
			{
				if(response.getMessages().getResultCode() == ApiContracts.MessageTypeEnum.OK)
				{
					console.log('createCustomerPaymentProfile: Successfully created a customer payment profile with id: ' + response.getCustomerPaymentProfileId());
				}
				else
				{
					console.log('Result Code: ' + response.getMessages().getResultCode());
					console.log('Error Code: ' + response.getMessages().getMessage()[0].getCode());
					console.log('Error message: ' + response.getMessages().getMessage()[0].getText());
				}
			}
			else
			{
				console.log('Null response received');
			}

			resolve(response);
		});
	});

	return promise;
}

module.exports = createCustomerPaymentProfile;