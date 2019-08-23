
var ApiContracts = require('authorizenet').APIContracts;
var ApiControllers = require('authorizenet').APIControllers;
var utils = require('../utils.js');
var {API_KEY,TRANSACTION_KEY} = require('../config.js');

function createCustomerProfile() {
	let promise = new Promise((resolve,reject) => {
		var merchantAuthenticationType = new ApiContracts.MerchantAuthenticationType();
		merchantAuthenticationType.setName(API_KEY);
		merchantAuthenticationType.setTransactionKey(TRANSACTION_KEY);

		var creditCard = new ApiContracts.CreditCardType();
		creditCard.setCardNumber('4242424242424242');
		creditCard.setExpirationDate('0822');

		var paymentType = new ApiContracts.PaymentType();
		paymentType.setCreditCard(creditCard);

		var customerPaymentProfileType = new ApiContracts.CustomerPaymentProfileType();
		customerPaymentProfileType.setCustomerType(ApiContracts.CustomerTypeEnum.INDIVIDUAL);
		customerPaymentProfileType.setPayment(paymentType);

		var paymentProfilesList = [];
		paymentProfilesList.push(customerPaymentProfileType);

		var customerProfileType = new ApiContracts.CustomerProfileType();
		customerProfileType.setMerchantCustomerId('M_' + utils.getRandomString('cust'));
		customerProfileType.setDescription('Profile description here');
		customerProfileType.setEmail(utils.getRandomString('cust')+'@anet.net');
		customerProfileType.setPaymentProfiles(paymentProfilesList);

		var createRequest = new ApiContracts.CreateCustomerProfileRequest();
		createRequest.setProfile(customerProfileType);
		createRequest.setValidationMode(ApiContracts.ValidationModeEnum.TESTMODE);
		createRequest.setMerchantAuthentication(merchantAuthenticationType);

		//pretty print request
		//console.log(JSON.stringify(createRequest.getJSON(), null, 2));
			
		var ctrl = new ApiControllers.CreateCustomerProfileController(createRequest.getJSON());

		ctrl.execute(function(){

			var apiResponse = ctrl.getResponse();

			var response = new ApiContracts.CreateCustomerProfileResponse(apiResponse);

			//pretty print response
			//console.log(JSON.stringify(response, null, 2));

			if(response != null) 
			{
				if(response.getMessages().getResultCode() == ApiContracts.MessageTypeEnum.OK)
				{
					console.log('Successfully created a customer profile with id: ' + response.getCustomerProfileId());
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

module.exports = createCustomerProfile;