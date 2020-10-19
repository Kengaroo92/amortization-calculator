// this addEventListener listens for the main calculate button to be clicked and executes the calculate function
document.getElementById("btnCalculate").addEventListener("click", () => {
	calculate();
})

//these arrays are used for the chart
let monthArr = new Array();
let pay = new Array();
let int = new Array();
//The main function that is doing all of the math
function calculate() {
	//get amount/total principle from DOM
	let amount = parseInt(document.getElementById("loanAmt").value);
	//get Interest from DOM, change to decimal
	let rate = parseFloat(document.getElementById("intRate").value);
	// get loan term from DOM in months
	let term = parseInt(document.getElementById("term").value);
	//check for truthy values in the variables before running
	if (amount && rate && term) {

		//JS does not handle floating point math very well so we are utilizing the accounting.js library to help with that
		//here we are setting the input variabales to 2 decimals places

		amount = accounting.toFixed(amount, 2);
		rate = accounting.toFixed(rate, 2);
		term = accounting.toFixed(term, 2);

		// calculates monthly payment
		let payment = (amount) * (rate / 1200) / (1 - (1 + rate / 1200) ** (0 - term));
		let payOut = payment;

		//setting payment to 2 decimals places
		payment = accounting.toFixed(payment, 2);

		//declare vars for the loop
		let remainingBal = amount;
		let interestPayment;
		let principalPayment;
		let month;
		let totalInterest = 00;
		document.getElementById("tbody").innerHTML = "";

		//for loop for amortization
		for (let i = 0; i < term; i++) {
			//in the amortization table, the following things should be printed.

			//iterate the month plus one for each loop
			month = i + 1;

			//determine the interest rate
			interestPayment = accounting.toFixed(remainingBal * rate / 1200, 2);

			//determine total interest (this tallies up the total interest as we go through the loop
			totalInterest = totalInterest + parseFloat(interestPayment);

			//determine principal paid each month
			principalPayment = accounting.toFixed(payment - interestPayment, 2);

			//this checks if you are on the last iteration of the loop and sets the payment equal to remaining balance and remaining balance to 0
			//else it does the normal calculation
			if (i == term - 1) {
				payment = remainingBal;
				remainingBal = 0;
			} else {
				//determine remaining bal (the decrements as we go through the loop)
				//the last payment usually will be lower than the rest of the payments
				remainingBal = accounting.toFixed(remainingBal - principalPayment, 2);
			}
			

			//print out to table
			document.getElementById("tbody").innerHTML += 
							`<tr>
								<th scope="row">${month}</th>
								<td>\$ ${accounting.formatMoney(payment)}</td>
								<td>\$ ${accounting.formatMoney(principalPayment)}</td>
								<td>\$ ${accounting.formatMoney(interestPayment)}</td>
								<td>\$ ${accounting.formatMoney(accounting.toFixed(totalInterest, 2))}</td>
								<td>\$ ${accounting.formatMoney(remainingBal)}</td>
							</tr>`;
			

			//monthArr.push(month);
			//principalArr.push(principalPayment);
			//interestArr.push(interestPayment);
		}
		//output monthly payment, total, and total interest to the upper right portion of the card
		let mtlyPaymentOutput = accounting.toFixed(payOut, 2);
		let ttlPaymentOutput = accounting.toFixed(parseFloat(amount) + parseFloat(totalInterest), 2);
		let ttlInterestOutput = accounting.toFixed(totalInterest, 2);
		document.getElementById("mntlyPayment").innerHTML = accounting.formatMoney(mtlyPaymentOutput);
		document.getElementById("ttlPayment").innerHTML = accounting.formatMoney(ttlPaymentOutput);
		document.getElementById("ttlInterest").innerHTML = accounting.formatMoney(ttlInterestOutput);
		
	}


}


/*
verify user input
any element that has class .numberOnly will be limited to
only numbers being input
the first method grabs any element with class numbers only
the second grabs the intrate element only,
this is because the intRate element needs to allow . (period)
so the if logic is a little different.
*/
document.querySelectorAll(".numbersOnly").forEach(a => {
	a.addEventListener("keydown", (evt) => {
		let keyChar = (evt.which) ? evt.which : evt.keyCode
		if (evt.shiftKey) {
			evt.preventDefault();
		}
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
document.getElementById("intRate").addEventListener("keydown", (evt) => {
	let keyChar = (evt.which) ? evt.which : evt.keyCode
	if (evt.shiftKey) {
		evt.preventDefault();
	}
	if (keyChar >= 48 && keyChar <= 57 ||
		keyChar >= 96 && keyChar <= 105 ||
		keyChar == 08 ||
		keyChar == 37 ||
		keyChar == 39 ||
		keyChar == 190 ||
		keyChar == 110) {
		return true;
	} else {
		evt.preventDefault();
		return false;
	}

})

//canvas js chart
//x axis is months
//first: principal payment
//second: interest payment

window.onload = function () {
	var chart = new CanvasJS.Chart("chart",
		{
			title: {
				text: "Monthly Amortization"
			},
			axisX: {
				title: "Months"
			},
			axisY: {
				title: "Dollars"
			},

			data: [
				{
					type: "line",
					legendText: "Principal Payments",
					dataPoints: pay

				},
				{
					type: "line",
					legendText: "Interest Payment",
					dataPoints: int

						
					
				}
			]

			
		});
	
	function updateChart() {
		let principalArr = [];
		let interestArr = [];

		for (let i = 0; i < monthArr.length; i++) {
			pay.push({ y: principalArr[i] });
			int.push({ x: monthArr[i], y: interestArr[i] });
		}

	}
	
	chart.render();
	//update the chart on button click
	document.getElementById("btnCalculate").addEventListener("click", () => {
		updateChart();
		chart.options.data[0].datapoints = pay;
		chart.render();
	})
}

