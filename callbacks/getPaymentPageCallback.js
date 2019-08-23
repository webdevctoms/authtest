function getPaymentPageCallback(response){
	let promise = new Promise((resolve,reject) => {
		console.log('========================received response=====================', response);

		resolve(response);
	});

	return promise;
}

module.exports = {getPaymentPageCallback};