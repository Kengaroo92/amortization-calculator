
# Loan Rocket
Loan Rocket is a calculator that will do basic calculations of common loan types such as mortgages, auto loans, student loans, or personal loans. 

# Table of Contents

 - [Motivation](#motivation)
 - [Technology Used](#technology-used)
 - [Features](#features)
 - [Code Example](#code-example)
 - [APIs Referenced](#apis-referenced)
 - [How to Use](#how-to-use)
 - [Contributors](#contributors)
 - [Credits](#credits)
 - [License](#license)

<a name="#motivation"></a>
# Motivation
The project started as a group coding challenge during Week 3 of the [Coder Foundry](https://www.coderfoundry.com/) Coding Bootcamp. The goal of the challenge was to write a mortgage calculator application that takes certain parameters:

 1. The amount of money loaned in dollars (balance).
 2. The time over which the loan will be repaid, in months (term).
 3. The percentage rate at which interest will accrue on the loan (rate).

The challenge had a requirement for what was output:

 1. The month (1 being the first month of payment, up to x amount of months of the full term).
 2. The payment amount.
 3. The principal paid for the current month.
 4. The interest paid for the current month.
 5. The total interest paid to date.
 6. The remaining balance of the loan at the end of the current month.

The project was judged on several criteria as outlined below:

 1. Does the project meet the specifications listed above?
 2. Does the app exceed those listed specifications?
 3. Is the UI attractive?
 4. Ease of Use and how intuitive the project is.
 5. Are user inputs validated?
 6. Overall Presentation.
 7. Over Team Contributions.

The winning team at the end of the week is awarded Coder Foundry Star Coder. Star Coder is a weekly award that showcases the amount of commitment and dedication one has to their work and the amount of knowledge and professionalism that was present during their weekly interview. 

<a name="#technology-used"></a>
# Technology Used

 - Logic/Functionality - **JavaScript** and **jQuery**
 - User Interface - **HTML** and **CSS** using the **Bootstrap Framework**
 - **GitHub** Repository to collaborate code between the team.
 - **Netlify** to publish the application for easy access online.
 - Microsoft Teams and Zoom Meetings to communicate effectively.

<a name="#features"></a>
# Features
**Comparative Analysis**: With the help of Loan Rocket, you can compare the loan schemes offered by different banks and calculate how much money can be saved by opting for a particular bank.

**Look Out for Options**: To find out the total mortgage cost, the loan applicant can enter different loan amounts, tenures and rates of interest in the online calculator to assess various payment options.

**Repayment Scenarios**: Loan Rocket can be used by an applicant to get the result on the basis of their payment schedules by entering the details such as monthly payments, interest rates, and loan tenure.

**Customized Calculations**: The applicant can get customized results through Loan Rocket by entering the type of interest rate, amortization period and loan amount.

**Helps in understanding the product better**: Loan Rocket is easy to use, therefore it helps you have a better understanding of your options instead of having a rich description in a text format.


<a name="#code-example"></a>
# Code Example

The code below converts interest from a percentage to a decimal, annual rate to a monthly rate, and payment period from years to months.

    var principal = parseFloat(amount.value);
    var interest = parseFloat(apr.value) / 100 / 12;
    var payments = parseFloat(years.value) * 12;
    
The code below computes the monthly payments using Math.pow which is a function that returns the base to the exponent power.

    var x = Math.pow(1 + interest, payments);
    var monthly = (principal*x*interest)/(x-1);

The code above is just two examples of how we have written this application.

<a name="#apis-referenced"></a>
# APIs Referenced
Coming Soon...
<a name="#how-to-use"></a>
# How to Use
Coming Soon...
<a name="#contributors"></a>
# Contributors
This project as mentioned in the [Motivation](#motivation) section was a team coding challenge. The teams were selected based on a few criteria that wasn't made public. The teams were created by [Antonio Raynor](https://www.linkedin.com/in/antonio-raynor-b7672746/) and [Bobby Davis, Jr](https://www.linkedin.com/in/bobbydavisjr/). Each team consisted of three students.

 - [Kenan Bjelosevic](https://www.kenanbjelosevic.com) 
 - [Adrian Edelen](https://adrianedelen.com/) 
 - Fred Smith

<a name="#credits"></a>
# Credits
Credits for building the application from Front End to Back End go to [Adrian Edelen](https://adrianedelen.com/), Fred Smith and [Kenan Bjelosevic](https://www.kenanbjelosevic.com). It was a team collaboration and each contributor provided some of their knowledge and expertise in all portions of the project. The project was completed in three short days. Assigned on a Thursday night and submitted early Monday morning. 

We would also like to give credit to [Coder Foundry](https://www.coderfoundry.com/contact) and it's staff. Coding is a skill that is learned. Each person has the ability to learn how to code. What most lack is the motivation and drive to do so. Coder Foundry provides an amazing curriculum on top of a great staff that is with you everyday through your journey, motivating and enabling you for success.

If you want to find out more about Coder Foundry, please go to their [YouTube Channel](https://www.youtube.com/channel/UCTGgxc_jIz2z9mpfInuPHWQ). The owner [Bobby Davis, Jr](https://www.linkedin.com/in/bobbydavisjr/) provides amazing content that will motivate you to change your life. 

<a name="#license"></a>
# License

This project has no licensing at this moment. It is Open Source, if you would like to contribute and/or collaborate with us, please go to our Developer Profiles by clicking on our names below.

- [Kenan Bjelosevic](https://www.kenanbjelosevic.com) 
 - [Adrian Edelen](https://adrianedelen.com/) 
 - Fred Smith
###### This README was written by Kenan Bjelosevic with the assistance of Adrien Edelen and Fred Smith. 
 
