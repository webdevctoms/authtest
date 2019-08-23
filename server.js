require('dotenv').config();
const express = require('express');
const {PORT} = require('./config');
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const {router: paymentPageRouter} = require('./routers/getAcceptPaymentPage');
const {router: customerProfileRouter} = require('./routers/createCustomerProfile');
const app = express();
app.use(express.static('public'));
app.use(jsonParser);
app.use('/getPaymentPage',paymentPageRouter);
app.use('/customer-profile',customerProfileRouter);
let server;

function runServer(port = PORT) {
  return new Promise((resolve, reject) => {
      server = app.listen(port, () => {
        console.log(`Your app is listening on port ${port}`);
        resolve();
      });
  });
}

function closeServer(){
	return new Promise((resolve,reject) => {
		console.log("closing server");
		server.close(err => {
			if(err){
				return reject(err);
			}
			resolve();
		});
	});
}

if (require.main === module){
	runServer().catch(err => console.error(err));
}

module.exports = { app, runServer, closeServer };