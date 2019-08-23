const request = require('request');
const {URL} = require('../config.js');

function sendToken(token){
	let promise = new Promise((resolve,reject) => {
		const options = {
			url:URL,
			method:'POST',
			json:{
				'token':token
			}
		};

		request(options,function(error,response,body){
			resolve(body);
		});
	});

	return promise;
}

module.exports = sendToken;