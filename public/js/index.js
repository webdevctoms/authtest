function Payment(payButtonId){
	let paymentButton = document.getElementById(payButtonId);
	this.initButton(paymentButton);
}

Payment.prototype.initButton = function(button) {
	button.addEventListener("click",function(e){
		e.preventDefault();
		this.buttonClicked(e);
	}.bind(this),false);
};

Payment.prototype.buttonClicked = function(e) {
	console.log('button clicked');
};

let payment = new Payment('getPayment');
