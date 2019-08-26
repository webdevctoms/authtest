function Payment(payButtonId,payFormId,tokenInputId){
	this.paymentButton = document.getElementById(payButtonId);
	this.payForm = document.getElementById(payFormId);
	this.tokenInput = document.getElementById(tokenInputId);
	this.initButton(this.paymentButton);
}

Payment.prototype.initButton = function(button) {
	button.addEventListener("click",function(e){
		e.preventDefault();
		this.buttonClicked(e);
	}.bind(this),false);
};

Payment.prototype.buttonClicked = function(e) {
	console.log('button clicked');
	const settings = {
		method:'GET',
		url:'/getPaymentPage?profileId=1508849960',
	}
	$.ajax(settings)

	.then(response => {
		//this.iframe.srcdoc = response.response;
		console.log(response);
		let token = response.response.token;
		this.tokenInput.value = token;
		$(this.payForm).submit();
	})
};

function initPayment(){
	let payment = new Payment('getPayment','formAuthorizeNetTestPage','tokenInput');
}

window.onload = initPayment;

