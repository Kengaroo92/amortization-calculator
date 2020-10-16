document.getElementById("calculate").addEventListener("click", () => {
	calculate();
})

//verify user input
//any element that has class .numberOnly will be limited to
//only numbers being input
document.querySelectorAll(".numbersOnly").forEach(a => {
	a.addEventListener("keydown", (evt) => {
		let keyChar = (evt.which) ? evt.which : evt.keyCode

		if (keyChar >= 48 && keyChar <= 57 ||
			keyChar >= 96 && keyChar <= 105 ||
			keyChar == 08 ||
			keyChar == 37 ||
			keyChar == 39) {
			return true;
		} else {
			evt.preventDefault();
			return false;
		}
	})
})



function calculate() {
	//get amount/total principle from DOM
	let amount = parseInt(document.getElementById("amount").value);
	//get Interest from DOM, change to decimal
	let rate = parseInt(document.getElementById("rate").value) / 100;
	// get loan term from DOM in months
	let term = parseInt(document.getElementById("Months").value);

	// calculates monthly payment
	let payment = Math.pow((amount) * (rate / 1200) / (1 - (1 + rate / 1200), (term - (term * 2))));

	//declare vars for the loop
	let remainingBal = amount;
	let interestPayment;
	let principalPayment;
	let month;
	let totalInterest = 0;
	for (let i = 0; i < term; i++) {
		//in the amortization table, the following things should be printed. e
		month = i + 1;
		interestPayment = remianingBal * rate / 1200;
		totalInterest += interestPayment;
		principalPayment = payment - interestPayment;
		remainingBal = remainingBal - principalPayment;

		document.getElementById("MonthTable").innerHTML = month;
		document.getElementById("paymentTable").innerHTML = payment;
		document.getElementById("principalTable").innerHTML = principalPayment;
		document.getElementById("interestTable").innerHTML = interestPayment;
		document.getElementById("totalIntTable").innerHTML = totalInterest;
		document.getElementById("BalanceTable").innerHTML = remainingBal;

	}


}
