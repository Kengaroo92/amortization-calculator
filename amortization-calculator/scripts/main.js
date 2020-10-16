function calculate() {
  //Look up the input and output elements in the document
  var amount = document.getElementById("amount");
  var apr = document.getElementById("apr");
  var years = document.getElementById("years");
  var zipcode = document.getElementById("zipcode");
  var payment = document.getElementById("payment");
  var total = document.getElementById("total");
  var totalinterest = document.getElementById("totalinterest");
  
// Get the user's input from the input elements.
// Convert interest from a percentage to a decimal, and convert from
// an annual rate to a monthly rate. Convert payment period in years
// to the number of monthly payments.
var principal = parseFloat(amount.value);
var interest = parseFloat(apr.value) / 100 / 12;
var payments = parseFloat(years.value) * 12;
  
// compute the monthly payment figure
var x = Math.pow(1 + interest, payments); //Math.pow computes powers
var monthly = (principal*x*interest)/(x-1);

// If the result is a finite number, the user's input was good and
// we have meaningful results to display
if (isFinite(monthly)){
  // Fill in the output fields, rounding to 2 decimal places
  payment.innerHTML = monthly.toFixed(2);
  total.innerHTML = (monthly * payments).toFixed(2);
  totalinterest.innerHTML = ((monthly*payments)-principal).toFixed(2);
  
// Save the user's input so we can restore it the next time they visit
 save(amount.value, apr.value, years.value, zipcode.value);

 // Advertise: find and display local lenders, but ignore network errors
 try { // Catch any errors that occur within these curly braces
 getLenders(amount.value, apr.value, years.value, zipcode.value);
 }
  
  catch(e) { /* And ignore those errors */ }
 // Finally, chart loan balance, and interest and equity payments
 chart(principal, interest, monthly, payments);
 }
 else {
 // Result was Not-a-Number or infinite, which means the input was
 // incomplete or invalid. Clear any previously displayed output.
 payment.innerHTML = ""; // Erase the content of these elements
 total.innerHTML = ""
 totalinterest.innerHTML = "";
 chart(); // With no arguments, clears the chart
 }
}
// Save the user's input as properties of the localStorage object. Those
// properties will still be there when the user visits in the future
// This storage feature will not work in some browsers (Firefox, e.g.) if you
// run the example from a local file:// URL. It does work over HTTP, however.
function save(amount, apr, years, zipcode) {
 if (window.localStorage) { // Only do this if the browser supports it
 localStorage.loan_amount = amount;
 localStorage.loan_apr = apr;
 localStorage.loan_years = years;
 localStorage.loan_zipcode = zipcode;
 }
}
// Automatically attempt to restore input fields when the document first loads.
window.onload = function() {
 // If the browser supports localStorage and we have some stored data
 if (window.localStorage && localStorage.loan_amount) {
 document.getElementById("amount").value = localStorage.loan_amount;
 document.getElementById("apr").value = localStorage.loan_apr;
 document.getElementById("years").value = localStorage.loan_years;
 document.getElementById("zipcode").value = localStorage.loan_zipcode;
 }
};
// Pass the user's input to a server-side script which can (in theory) return
// a list of links to local lenders interested in making loans. This example
// does not actually include a working implementation of such a lender-finding
// service. But if the service existed, this function would work with it.
function getLenders(amount, apr, years, zipcode) {
 // If the browser does not support the XMLHttpRequest object, do nothing
 if (!window.XMLHttpRequest) return;
 // Find the element to display the list of lenders in
 var ad = document.getElementById("lenders");
 if (!ad) return; // Quit if no spot for output 
  
  // Encode the user's input as query parameters in a URL
 var url = "getLenders.php" + // Service url plus
 "?amt=" + encodeURIComponent(amount) + // user data in query string
 "&apr=" + encodeURIComponent(apr) +
 "&yrs=" + encodeURIComponent(years) +
 "&zip=" + encodeURIComponent(zipcode);
 // Fetch the contents of that URL using the XMLHttpRequest object
 var req = new XMLHttpRequest(); // Begin a new request
 req.open("GET", url); // An HTTP GET request for the url
 req.send(null); // Send the request with no body
 // Before returning, register an event handler function that will be called
 // at some later time when the HTTP server's response arrives. This kind of
 // asynchronous programming is very common in client-side JavaScript.
 req.onreadystatechange = function() {
 if (req.readyState == 4 && req.status == 200) {
 // If we get here, we got a complete valid HTTP response
 var response = req.responseText; // HTTP response as a string
 var lenders = JSON.parse(response); // Parse it to a JS array
 // Convert the array of lender objects to a string of HTML
 var list = "";
 for(var i = 0; i < lenders.length; i++) {
 list += "<li><a href='" + lenders[i].url + "'>" +
 lenders[i].name + "</a>";
 }
 // Display the HTML in the element from above.
 ad.innerHTML = "<ul>" + list + "</ul>";
 }
 }
}

// Chart monthly loan balance, interest and equity in an HTML <canvas> element.
// If called with no arguments then just erase any previously drawn chart.
function chart(principal, interest, monthly, payments) {
 var graph = document.getElementById("graph"); // Get the <canvas> tag
 graph.width = graph.width; // Magic to clear and reset the canvas element
 // If we're called with no arguments, or if this browser does not support
 // graphics in a <canvas> element, then just return now.
 if (arguments.length == 0 || !graph.getContext) return;
 // Get the "context" object for the <canvas> that defines the drawing API
 var g = graph.getContext("2d"); // All drawing is done with this object
 var width = graph.width, height = graph.height; // Get canvas size
 // These functions convert payment numbers and dollar amounts to pixels
 function paymentToX(n) { return n * width/payments; }
 function amountToY(a) { return height-(a * height/(monthly*payments*1.05));}
 // Payments are a straight line from (0,0) to (payments, monthly*payments)
 g.moveTo(paymentToX(0), amountToY(0)); // Start at lower left
 g.lineTo(paymentToX(payments), // Draw to upper right
 amountToY(monthly*payments));
  
  g.lineTo(paymentToX(payments), amountToY(0)); // Down to lower right
 g.closePath(); // And back to start
 g.fillStyle = "#f88"; // Light red
 g.fill(); // Fill the triangle
 g.font = "bold 12px sans-serif"; // Define a font
 g.fillText("Total Interest Payments", 20,20); // Draw text in legend
 // Cumulative equity is non-linear and trickier to chart
 var equity = 0;
 g.beginPath(); // Begin a new shape
 g.moveTo(paymentToX(0), amountToY(0)); // starting at lower-left
 for(var p = 1; p <= payments; p++) {
 // For each payment, figure out how much is interest
 var thisMonthsInterest = (principal-equity)*interest;
 equity += (monthly - thisMonthsInterest); // The rest goes to equity
 g.lineTo(paymentToX(p),amountToY(equity)); // Line to this point
 }
 g.lineTo(paymentToX(payments), amountToY(0)); // Line back to X axis
 g.closePath(); // And back to start point
 g.fillStyle = "green"; // Now use green paint
 g.fill(); // And fill area under curve
 g.fillText("Total Equity", 20,35); // Label it in green
 // Loop again, as above, but chart loan balance as a thick black line
 var bal = principal;
 g.beginPath();
 g.moveTo(paymentToX(0),amountToY(bal));
 for(var p = 1; p <= payments; p++) {
 var thisMonthsInterest = bal*interest;
 bal -= (monthly - thisMonthsInterest); // The rest goes to equity
 g.lineTo(paymentToX(p),amountToY(bal)); // Draw line to this point
 }
 g.lineWidth = 3; // Use a thick line
 g.stroke(); // Draw the balance curve
 g.fillStyle = "black"; // Switch to black text
 g.fillText("Loan Balance", 20,50); // Legend entry
 // Now make yearly tick marks and year numbers on X axis
 g.textAlign="center"; // Center text over ticks
 var y = amountToY(0); // Y coordinate of X axis
 for(var year=1; year*12 <= payments; year++) { // For each year
 var x = paymentToX(year*12); // Compute tick position
 g.fillRect(x-0.5,y-3,1,3); // Draw the tick
 if (year == 1) g.fillText("Year", x, y-5); // Label the axis
 if (year % 5 == 0 && year*12 !== payments) // Number every 5 years
 g.fillText(String(year), x, y-5);
 }
 // Mark payment amounts along the right edge
 g.textAlign = "right"; // Right-justify text
 g.textBaseline = "middle"; // Center it vertically
 var ticks = [monthly*payments, principal]; // The two points we'll mark
 var rightEdge = paymentToX(payments); // X coordinate of Y axis
 for(var i = 0; i < ticks.length; i++) { // For each of the 2 points
 var y = amountToY(ticks[i]); // Compute Y position of tick

   g.fillRect(rightEdge-3, y-0.5, 3,1); // Draw the tick mark
 g.fillText(String(ticks[i].toFixed(0)), // And label it.
 rightEdge-5, y);
 }
} 
  
$(function () {
	$('[data-toggle="tooltip"]').tooltip()
})