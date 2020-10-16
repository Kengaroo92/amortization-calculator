import { Decimal } from '/scripts/modules/decimal.mjs';

document.getElementById("calculate").addEventListener("click", () => {
	calculate();
})


function calculate() {
	//get amount/total principle from DOM
	//let amount = parseInt(document.getElementById("amount").value);
	//get Interest from DOM, change to decimal
	//let rate = parseInt(document.getElementById("rate").value) / 100;
	// get loan term from DOM in months
	//let term = parseInt(document.getElementById("Months").value);
	let amount = 5000;
	let rate = .02;
	let term = 12;
	let DAmount = new Decimal(amount);
	let DRate = new Decimal(rate);
	let DTerm = new Decimal(term);
	// calculates monthly payment
	let payment = (DAmount) * (dRate / 1200) / (1 - (1 + DRate / 1200) ** (DTerm - (DTerm * 2)));

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

		//document.getElementById("MonthTable").innerHTML = month;
		//document.getElementById("paymentTable").innerHTML = payment;
		//document.getElementById("principalTable").innerHTML = principalPayment;
		//document.getElementById("interestTable").innerHTML = interestPayment;
		//document.getElementById("totalIntTable").innerHTML = totalInterest;
		//document.getElementById("BalanceTable").innerHTML = remainingBal;
		console.log(month);
		console.log(payment);
		console.log(principalPayment);
		console.log(interestPayment);
		console.log(interestPayment);
		console.log(totalInterest);
		console.log(remainingBal);
	}


}