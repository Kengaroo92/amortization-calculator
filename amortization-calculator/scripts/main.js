
document.getElementById("calculate").addEventListener("click", () => {
	calculate();
})


function calculate() {
	//get amount/total principle from DOM
	//let amount = parseInt(document.getElementById("amount").value);
	//get Interest from DOM, change to decimal
	//let rate = parseInt(document.getElementById("rate").value);
	// get loan term from DOM in months
	//let term = parseInt(document.getElementById("Months").value);
	let amount = 5000;
	let rate = 2;
	let term = 12;
	amount = accounting.toFixed(amount, 2);
	rate = accounting.toFixed(rate, 2);
	term = accounting.toFixed(term, 2);

	// calculates monthly payment
	let payment = (amount) * (rate / 1200) / (1 - (1 + rate / 1200) ** (0 - term));
	payment = accounting.toFixed(payment, 2);
	//declare vars for the loop
	let remainingBal = amount;
	let interestPayment;
	let principalPayment;
	let month;
	let totalInterest = 00;
	for (let i = 0; i < term; i++) {
		//in the amortization table, the following things should be printed. e
		month = i + 1;
		interestPayment = accounting.toFixed(remainingBal * rate / 1200, 2);
		totalInterest = totalInterest + parseFloat(interestPayment);
		principalPayment = accounting.toFixed(payment - interestPayment, 2);
		remainingBal = accounting.toFixed(remainingBal - principalPayment, 2);

		//document.getElementById("MonthTable").innerHTML = month;
		//document.getElementById("paymentTable").innerHTML = payment;
		//document.getElementById("principalTable").innerHTML = principalPayment;
		//document.getElementById("interestTable").innerHTML = interestPayment;
		//document.getElementById("totalIntTable").innerHTML = totalInterest;
		//document.getElementById("BalanceTable").innerHTML = remainingBal;
		console.log("month: " + month);
		console.log("payment: " + payment);
		console.log("principal payment: " + principalPayment);
		console.log("interest payment: " + interestPayment);
		console.log("total interest: " + totalInterest);
		console.log("remaining balance: " + remainingBal);
		console.log("");
	}


}
//verify user input
//any element that has class .numberOnly will be limited to
//only numbers being input
//document.querySelectorAll(".numbersOnly").forEach(a => {
//	a.addEventListener("keydown", (evt) => {
//		let keyChar = (evt.which) ? evt.which : evt.keyCode

//		if (keyChar >= 48 && keyChar <= 57 ||
//			keyChar >= 96 && keyChar <= 105 ||
//			keyChar == 08 ||
//			keyChar == 37 ||
//			keyChar == 39) {
//			return true;
//		} else {
//			evt.preventDefault();
//			return false;
//		}
//	})
//})



