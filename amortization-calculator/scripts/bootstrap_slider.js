
//Renders range slider
"use strict";
let sldrLoanTerm = new Slider("#sldrLoanTerm", {
    formatter: function (value)
    {
        return "Current value: " + value;
    }
});

$("btnMnth").click(function ()
{
    $("p").hide("slow", function ()
    {
        alert("The paragraph is now hidden");
    });
}); $("btnYear").click(function ()
{
    $("p").hide("slow", function ()
    {
        alert("The paragraph is now hidden");
    });
});
