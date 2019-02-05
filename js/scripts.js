var newStylesheet = document.createElement("style");
document.head.appendChild(newStylesheet);

var fatherElement1 = document.querySelector('.years-of-mortgage-slider');
var fatherElement2 = document.querySelector('.rate-of-interest-slider');

var inputsRy = [];

function Input(id) {
  //<input type="range" value="35" min="0" max="100" autocomplete="off" step="1">
  this.att = {};
  this.att.type = "range";
  this.att.id = id;
  this.att.value = 30;
  this.att.min = 1;
  this.att.max = 40;
  this.att.autocomplete = "off";
  this.att.step = "1";
  this.color = {};
  this.color.a = "#1091cc"; // la parte "baja" del slider
  this.color.b = "#d8d8d8"; // la parte "alta" del slider
  this.input;
  this.output;
  this.interval = this.att.max - this.att.min;

  this.create = function(fatherElement) {
    this.sliderContainer = document.createElement("div");
    this.sliderContainer.setAttribute("class", "sliderContainer");
    this.minValue = document.createElement("div");
    this.minValue.innerHTML = this.att.min;
    this.minValue.setAttribute("class", "minValue");
    this.input = document.createElement("input");
    this.maxValue = document.createElement("div");
    this.maxValue.innerHTML = this.att.max;
    this.maxValue.setAttribute("class", "maxValue");
    this.output = document.createElement("div");
    this.output.innerHTML = this.att.value;
    this.output.setAttribute("class", "output");
    for (var name in this.att) {
      if (this.att.hasOwnProperty(name)) {
        this.input.setAttribute(name, this.att[name]);
      }
    }
    
    fatherElement.appendChild(this.sliderContainer);
    this.sliderContainer.appendChild(this.minValue);    
    this.sliderContainer.appendChild(this.input);
    this.sliderContainer.appendChild(this.maxValue);
    fatherElement.appendChild(this.output);

    this.CSSstyle()
  }
  this.update = function() {
    this.output.innerHTML = this.input.value;
    this.att.value = this.input.value;
    this.CSSstyle();
  }
  this.CSSstyle = function() {
    // calcula la posición del thumb en porcentajes
    this.percentage = ((this.att.value - this.att.min) / this.interval) * 100;
    // establece las nuevas reglas CSS
    this.style = "#" + this.att.id + "::-webkit-slider-runnable-track{ background-image:-webkit-linear-gradient(left, " + this.color.a + " " + this.percentage + "%, " + this.color.b + " " + this.percentage + "%)}\n";
    this.style += "#" + this.att.id + "::-moz-range-track{ background-image:-moz-linear-gradient(left, " + this.color.a + " " + this.percentage + "%, " + this.color.b + " " + this.percentage + "%)}\n";
  }
}

function updateCSS() {
  // una cadena de texto donde guardar los estilos
  var cssSheet = "";
  for (var i = 0; i < inputsRy.length; i++) {
    cssSheet += inputsRy[i].style;
  }

  newStylesheet.textContent = cssSheet;
}

// setup
var i = new Input("itr1");
i.create(fatherElement1);
inputsRy.push(i);

var i2 = new Input("itr2");
i2.att.value = 8.0;
i2.att.min = 0.1;
i2.att.max = 10;
i2.att.step = "0.1";
i2.interval = i2.att.max - i2.att.min;
i2.create(fatherElement2);
inputsRy.push(i2);

updateCSS();

for (var n = 0; n < inputsRy.length; n++) {

  (function(n) {
    inputsRy[n].input.addEventListener("input", function() {
      inputsRy[n].update();
      updateCSS();
    }, false)
  }(n));
}

var calculateBtn = document.getElementById("calculateBtn");

function calculateMortgage(){
    var yearsOfMortgage = i.att.value;
    var interestRate = i2.att.value;
    var loanAmount = document.getElementById("loan-amount").value;
    var annualTax = document.getElementById("annual-tax").value;
    var annualInsurance = document.getElementById("annual-insurance").value;

    if(loanAmount == ""){
        document.getElementById("loan-amount").style.borderColor = "#da3535";
        document.getElementById("loanAmountErrorMessage").style.display = "block";
        document.getElementById("loanAmountErrorMessage").style.color = "#da3535";
        document.getElementById("loanAmountErrorMessage").style.fontSize = "12px";
        document.getElementById("loanAmountErrorMessage").style.paddingTop = "3px";
        document.getElementById("loanAmountErrorMessage").textContent = "Loan Amount is mandatory";
    }
    else{
        document.getElementById("loan-amount").style.borderColor = "#000";
        document.getElementById("loanAmountErrorMessage").textContent = "";
    }

    if(annualTax == ""){
        document.getElementById("annual-tax").style.borderColor = "#da3535";
        document.getElementById("annualTaxErrorMessage").style.display = "block";
        document.getElementById("annualTaxErrorMessage").style.color = "#da3535";
        document.getElementById("annualTaxErrorMessage").style.fontSize = "12px";
        document.getElementById("annualTaxErrorMessage").style.paddingTop = "3px";
        document.getElementById("annualTaxErrorMessage").textContent = "Annual Tax is mandatory";
    }
    else{
        document.getElementById("annual-tax").style.borderColor = "#000";
        document.getElementById("annualTaxErrorMessage").textContent = "";
    }

    if(annualInsurance == ""){
        document.getElementById("annual-insurance").style.borderColor = "#da3535";
        document.getElementById("annualInsuranceErrorMessage").style.display = "block";
        document.getElementById("annualInsuranceErrorMessage").style.color = "#da3535";
        document.getElementById("annualInsuranceErrorMessage").style.fontSize = "12px";
        document.getElementById("annualInsuranceErrorMessage").style.paddingTop = "3px";
        document.getElementById("annualInsuranceErrorMessage").textContent = "Annual Insurance is mandatory";
    }
    else{
        document.getElementById("annual-insurance").style.borderColor = "#000";
        document.getElementById("annualInsuranceErrorMessage").textContent = "";
    }

    /*console.log(loanAmount);
    console.log(annualTax);
    console.log(annualInsurance);
    console.log(yearsOfMortgage);
    console.log(interestRate);*/

    var principleAndInterests = ((interestRate / 100) / 12)* loanAmount / (1-Math.pow((1 + ((interestRate / 100)/12)), -yearsOfMortgage*12));
    var tax = annualTax / 12;
    var insurance = annualInsurance / 12;
    var monthlyPayment = principleAndInterests + tax + insurance;

    console.log(principleAndInterests);
    console.log(tax);
    console.log(insurance);
    console.log(monthlyPayment);

    var interestValue = document.getElementById('interest-value').textContent;
    document.getElementById('interest-value').style.opacity = 1;
    document.getElementById('interest-value').textContent = "$ " + principleAndInterests.toFixed(2);

    var taxValue = document.getElementById('tax-value');
    document.getElementById('tax-value').style.opacity = 1;
    document.getElementById('tax-value').textContent = "$ " + tax.toFixed(2);

    var insuranceValue = document.getElementById('insurance-value');
    document.getElementById('insurance-value').style.opacity = 1;
    document.getElementById('insurance-value').textContent = "$ " + insurance.toFixed(2);

    var totalValue = document.getElementById('total-value');
    document.getElementById('total-value').style.height = "25px";
    document.getElementById('total-value').style.opacity = 1;
    document.getElementById('total-value').textContent = "$ " + monthlyPayment.toFixed(2);

    if(loanAmount != "" && annualTax != "" && annualInsurance != ""){
        document.getElementById("calculateBtn").textContent = "RECALCULATE";
    } 

    function showResults(x) {
        if (x.matches) { // If media query matches
            /*document.getElementsByClassName("container")[0].style.flexDirection = "column";
            document.getElementsByClassName("calculator")[0].style.marginBottom = "0px";*/
            document.getElementsByClassName("results")[0].style.display = "block";
            document.getElementsByClassName("results")[0].style.marginTop = "0px";
            document.getElementsByClassName("results")[0].style.marginLeft = "70px";
            document.getElementsByClassName("results")[0].style.width = "470px";
        }
    }
    
    var x = window.matchMedia("(max-width: 840px)");
    showResults(x); // Call listener function at run time
    x.addListener(showResults); // Attach listener function on state changes
}

function hideLoanAmountErrorMessage(){
    document.getElementById("loan-amount").style.borderColor = "#000";
    document.getElementById("loanAmountErrorMessage").style.display = "none";
}

function hideAnnualTaxErrorMessage(){
    document.getElementById("annual-tax").style.borderColor = "#000";
    document.getElementById("annualTaxErrorMessage").style.display = "none";
}

function hideAnnualInsuranceErrorMessage(){
    document.getElementById("annual-insurance").style.borderColor = "#000";
    document.getElementById("annualInsuranceErrorMessage").style.display = "none";
}
