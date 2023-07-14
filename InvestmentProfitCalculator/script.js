
//Get buttons , Description and overlay
const openDescriptionButton = document.getElementById('desc-btn')
const closeDescriptionButton = document.getElementById('close-desc-btn')
const overlay = document.getElementById('overlay')
const description = document.getElementById('description')
const InitialInvestment = document.getElementById('initialInvestment')

const yearsInv = document.getElementById('years')
const investmentPerYear = document.getElementById('investmentPerYear')
const averageReturn = document.getElementById('averageReturn')

//Get calculation Buttons 
const ResultButton = document.getElementById('result-btn')
const closeResultButton = document.getElementById('close-result-btn')
const result = document.getElementById('result')
const dataResults = document.getElementById('data-results')

//Add event listeners to the buttons
openDescriptionButton.addEventListener('click', () => {
    description.classList.add('active')
    overlay.classList.add('active')
})


closeDescriptionButton.addEventListener('click', () => {
    description.classList.remove('active')
    overlay.classList.remove('active')
})


//Get users inputs
ResultButton.addEventListener('click', () => {
    var initInv = InitialInvestment.value;
    var Years = yearsInv.value;
    var avgReturn = averageReturn.value;
    var InvYearly = investmentPerYear.value;
    var investmentValue = Calculate(initInv,Years,avgReturn,InvYearly);
    var sumOfInvestment = parseInt(initInv) + parseInt(Years)*parseInt(InvYearly);
    var profit = investmentValue - sumOfInvestment ;
    if (Number.isNaN(profit)) {
        var output = "Pleae fill in all the fields.."
    }
    else{
        var output = "After " + Years + " years \n  your Investment's value will be " + Math.floor(investmentValue) + " \n and your \n profit will be " + Math.floor(profit) + " \n" ;
    }
    dataResults.innerHTML = output;
    result.classList.add('active')
    overlay.classList.add('active')
})


//Calculate investment value after x years.
function Calculate(initInv,Years,avgReturn,InvYearly){
    var money = parseInt(initInv);
    var avgreturn = parseInt(avgReturn);
    var extramoneyYearly = parseInt(InvYearly);
    var yearsInvesting = parseInt(Years);
    var count = yearsInvesting;
    while (count > 0){
        count = count -1;
        money = money + extramoneyYearly + (money*avgreturn)/100 ;
    }
    return money;
}


closeResultButton.addEventListener('click', () => {
    result.classList.remove('active')
    overlay.classList.remove('active')
})