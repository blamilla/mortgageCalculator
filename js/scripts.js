/**
 * A variable called 'newStylesheet' for creating an instance of the style tag.
 * @let newStylesheet
 */
let newStylesheet = document.createElement('style');

/** 
 * Calls the appendChild function to append the created style element. 
 */
document.head.appendChild(newStylesheet);

/**
 * Two variables called 'fatherElement1' and 'fatherElement2' respectively for saving the first element that is descendant of the node matching the indicated classes.
 * @let fatherElement1
 * @let fatherElement2
 */
let fatherElement1 = document.querySelector('.years-of-mortgage-slider');
let fatherElement2 = document.querySelector('.rate-of-interest-slider');

/**
 * An array called 'inputsRy'.
 * @let inputsRy
 */
let inputsRy = [];

/** @function sliderInput 
 * Function created to configure the range sliders for setting the Years of Mortgage and Rate of interest values.
*/

const rangeInput = function sliderInput(id) {
    this.att = {};
    this.att.type = 'range';
    this.att.id = id;
    this.att.value = 30;
    this.att.min = 1;
    this.att.max = 40;
    this.att.autocomplete = 'off';
    this.att.step = '1';
    this.color = {};
    this.color.a = '#1091cc';
    this.color.b = '#d8d8d8';
    this.input;
    this.output;
    this.interval = this.att.max - this.att.min;

    /** @function create
     * Function to create the elements belonging to the range slider.
    */
    this.create = function (fatherElement) {
        // Calls the createElement function to create a div element. 
        this.sliderContainer = document.createElement('div');

        // Calls the setAttribute function to set the sliderContainer class to the previously created div element. 
        this.sliderContainer.setAttribute('class', 'sliderContainer');

        // Calls the createElement function to create a div element. 
        this.minValue = document.createElement('div');

        // Attachs the min value for the range slider to the previously created div element. 
        this.minValue.innerHTML = this.att.min;

        // Calls the setAttribute function to set the minValue class to the previously created div element. 
        this.minValue.setAttribute('class', 'minValue');

        // Calls the createElement function to create a div element. 
        this.input = document.createElement('input');

        // Calls the createElement function to create a div element. 
        this.maxValue = document.createElement('div');

        // Attachs the max value for the range slider to the previously created div element. 
        this.maxValue.innerHTML = this.att.max;

        // Calls the setAttribute function to set the maxValue class to the previously created div element. 
        this.maxValue.setAttribute('class', 'maxValue');

        // Calls the createElement function to create a div element. 
        this.output = document.createElement('div');

        // Attachs the starting value for the range slider to the previously created div element. 
        this.output.innerHTML = this.att.value;

        // Calls the setAttribute function to set the output class to the previously created div element. 
        this.output.setAttribute('class', 'output');

        for (let name in this.att) {
            if (this.att.hasOwnProperty(name)) {
                this.input.setAttribute(name, this.att[name]);
            }
        }
        
        // Appends the sliderContainer element to the fatherElement.
        fatherElement.appendChild(this.sliderContainer);

        // Appends the minValue element to the sliderContainer element.
        this.sliderContainer.appendChild(this.minValue);    

        // Appends the input element to the sliderContainer element.
        this.sliderContainer.appendChild(this.input);

        // Appends the maxValue element to the sliderContainer element.
        this.sliderContainer.appendChild(this.maxValue);

        // Appends the output element to the fatherElement.
        fatherElement.appendChild(this.output);

        // Calls the CSSstyle function.
        this.CSSstyle();
    }

    /** @function update
     * Function to update the range slider value.
     */
    this.update = function () {
        this.output.innerHTML = this.input.value;
        this.att.value = this.input.value;
        this.CSSstyle();
    }

    /** @function CSSstyle
     * Function to apply CSS style for the range slider.
     */
    this.CSSstyle = function () {
        this.percentage = ((this.att.value - this.att.min) / this.interval) * 100;
        this.style = '#' + this.att.id + '::-webkit-slider-runnable-track{ background-image:-webkit-linear-gradient(left, ' + this.color.a + ' ' + this.percentage + '%, ' + this.color.b + ' ' + this.percentage + '%)}\n';
        this.style += '#' + this.att.id + '::-moz-range-track{ background-image:-moz-linear-gradient(left, ' + this.color.a + ' ' + this.percentage + '%, ' + this.color.b + ' ' + this.percentage + '%)}\n';
    }
}

/** @function updateCSS
 * Function to update the CSS according to the inputsRy array size.
*/
const updateCss = function updateCSS() {
    /**
     * @let cssSheet
     */
    let cssSheet = '';

    for (let i = 0; i < inputsRy.length; i++) {
        cssSheet += inputsRy[i].style;
    }

    newStylesheet.textContent = cssSheet;
}

/**
 * Setups a new range slider by calling the rangeInput function.
 * @let i
*/
let i = new rangeInput('itr1');

// Calls the create function and passes the fatherElement1 variable as parameter.
i.create(fatherElement1);
inputsRy.push(i);

/**
 * Setups a new range slider by calling the rangeInput function.
 * @let i2
*/
let i2 = new rangeInput('itr2');

// Defines different values for the new range slider.
i2.att.value = 8.0;
i2.att.min = 0.1;
i2.att.max = 10;
i2.att.step = '0.1';
i2.interval = i2.att.max - i2.att.min;

// Calls the create function and passes the fatherElement2 variable as parameter.
i2.create(fatherElement2);
inputsRy.push(i2);

// Calls the updateCss function.
updateCss();

for (let n = 0; n < inputsRy.length; n++) {
    (function(n) {
        inputsRy[n].input.addEventListener('input', function() {
            inputsRy[n].update();
            updateCss();
        }, false)
    }(n));
}

/**
 * A variable called 'calculateBtn' for saving the element with id = 'calculateBtn'.
 * @let calculateBtn
*/
let calculateBtn = document.getElementById('calculateBtn');

/** @function calculateMortgage
 * Function to calculate the mortgage values.
 * Receives a parameter which is used to create the transition effect on the mobile devices.
*/
calculateBtn.onclick = function calculateMortgage(results) {
    /**
     * A variable called 'yearsOfMortgage' for saving the Years of Mortgage selected value.
     * @let yearsOfMortgage
     * A variable called 'interestRate' for saving the Rate of Interest selected value.
     * @let interestRate
     * A variable called 'loanAmount' for saving the Loan Amount value.
     * @let loanAmount
     * A variable called 'annualTax' for saving the Annual Tax value.
     * @let annualTax
     * A variable called 'annualInsurance' for saving the Annual Insurance value.
     * @let annualInsurance
    */
    let yearsOfMortgage = i.att.value;
    let interestRate = i2.att.value;
    let loanAmount = document.getElementById('loan-amount').value;
    let annualTax = document.getElementById('annual-tax').value;
    let annualInsurance = document.getElementById('annual-insurance').value;

    if (loanAmount == '') {
        // Sets the border color for the loan amount input field.
        document.getElementById('loan-amount').style.borderColor = '#da3535';

        // Sets the class name for the loan amount input field.
        document.getElementById("loanAmountErrorMessage").className = 'emptyFieldMessage';

        // Sets the display property to block for the loan amount error message.
        document.getElementById('loanAmountErrorMessage').style.display = "block";

        // Sets the error message for the loan amount field.
        document.getElementById('loanAmountErrorMessage').textContent = 'Loan Amount is mandatory';
    }

    if (annualTax == '') {
        // Sets the border color for the annual tax input field.
        document.getElementById('annual-tax').style.borderColor = '#da3535';

        // Sets the class name for the annual tax input field.
        document.getElementById("annualTaxErrorMessage").className = 'emptyFieldMessage';

        // Sets the display property to block for the annual tax error message.
        document.getElementById('annualTaxErrorMessage').style.display = 'block';

        // Sets the error message for the annual tax field.
        document.getElementById('annualTaxErrorMessage').textContent = 'Annual Tax is mandatory';
    }

    if (annualInsurance == '') {
        // Sets the border color for the annual insurance input field.
        document.getElementById('annual-insurance').style.borderColor = '#da3535';

        // Sets the class name for the annual insurance input field.
        document.getElementById("annualInsuranceErrorMessage").className = 'emptyFieldMessage';

        // Sets the display property to block for the annual insurance error message.
        document.getElementById('annualInsuranceErrorMessage').style.display = 'block';

        // Sets the error message for the annual insurance field.
        document.getElementById('annualInsuranceErrorMessage').textContent = 'Annual Insurance is mandatory';
    }

    /**
     * A variable called 'principleAndInterests' for saving the Principle & Interest value.
     * @let principleAndInterests
     * A variable called 'tax' for saving the Tax value.
     * @let tax
     * A variable called 'insurance' for saving the Insurance value.
     * @let insurance
     * A variable called 'monthlyPayment' for saving the Total Monthly Payment value.
     * @let monthlyPayment
    */
    let principleAndInterests = ((interestRate / 100) / 12)* loanAmount / (1-Math.pow((1 + ((interestRate / 100)/12)), -yearsOfMortgage*12));
    let tax = annualTax / 12;
    let insurance = annualInsurance / 12;
    let monthlyPayment = principleAndInterests + tax + insurance;

    // Sets the opacity to 1 for the Principle & Interest value.
    document.getElementById('interest-value').style.opacity = 1;

    // Replaces the content from Principle & Interest with the calculated value. 
    document.getElementById('interest-value').textContent = '$ ' + principleAndInterests.toFixed(2);

    // Sets the opacity to 1 for the Tax value.
    document.getElementById('tax-value').style.opacity = 1;

    // Replaces the content from Tax with the calculated value.
    document.getElementById('tax-value').textContent = '$ ' + tax.toFixed(2);

    // Sets the opacity to 1 for the Insurance value.
    document.getElementById('insurance-value').style.opacity = 1;

    // Replaces the content from Insurance with the calculated value.
    document.getElementById('insurance-value').textContent = '$ ' + insurance.toFixed(2);

    // Sets the opacity to 1 for the Total Monthly Payment value.
    document.getElementById('total-value').style.opacity = 1;

    // Replaces the content from Total Monthly Payment with the calculated value.
    document.getElementById('total-value').textContent = '$ ' + monthlyPayment.toFixed(2);

    // Replaces the CALCULATE text with RECALCULATE once the values are calculated.
    if (loanAmount != '' && annualTax != '' && annualInsurance != '') {
        document.getElementById('calculateBtn').textContent = 'RECALCULATE';
        document.getElementById('results').style.display = 'block';
        window.scrollTo(0,document.querySelector('.results').scrollHeight);
    } 

    /** @function showResults
     * Function to display the results panel when using mobile version.
     * Receives a parameter which is used to check the media query.
    */
    const showResultsPanel = function showResults(x) {
        if (x.matches) {
            document.getElementById('loanAmountErrorMessage').textContent = 'Mandatory field';
            document.getElementById('annualTaxErrorMessage').textContent = 'Mandatory field';
            document.getElementById('annualInsuranceErrorMessage').textContent = 'Mandatory field';

            if (loanAmount == '' || annualTax == '' || annualInsurance == '') {
                document.getElementById('results').style.display = 'none';
            }
            else {
                document.getElementById('results').className = 'showResultsPanel';
            }
            
            /**
             * A variable called 'target' for saving the results element.
             * @let target
            */
            let target = document.getElementById('results');
            console.log(target);
            target.style.height =  target.children[0].clientHeight + 'px';                    
        }
    }
    
    let v = window.matchMedia('(max-width: 320px)');
    let w = window.matchMedia('(max-width: 375px)');
    let x = window.matchMedia('(max-width: 414px)');
    let y = window.matchMedia('(max-width: 768px)');
    let z = window.matchMedia('(max-width: 834px)');

    // Call listener function at run time
    showResultsPanel(v);
    showResultsPanel(w); 
    showResultsPanel(x);
    showResultsPanel(y);
    showResultsPanel(z);

    // Attach listener function on state changes
    v.addListener(showResultsPanel);
    w.addListener(showResultsPanel);
    x.addListener(showResultsPanel);
    y.addListener(showResultsPanel);
    z.addListener(showResultsPanel);
}

/**
 * A variable called 'loanAmountInput' for saving the input element with id = 'loan-amount'.
 * @let loanAmountInput
*/
let loanAmountInput = document.getElementById('loan-amount');

/** @function hideLoanAmountErrorMessage
 * Function to hide the error message below the loan amount field.
 * It also changes the border to its original color.
*/
loanAmountInput.oninput = function hideLoanAmountErrorMessage() {
    document.getElementById('loan-amount').style.borderColor = '#000';
    document.getElementById('loanAmountErrorMessage').style.display = 'none';
}

/**
 * A variable called 'annualTaxInput' for saving the input element with id = 'annual-tax'.
 * @let annualTaxInput
*/
let annualTaxInput = document.getElementById('annual-tax');

/** @function hideAnnualTaxErrorMessage
 * Function to hide the error message below the annual tax field.
 * It also changes the border to its original color.
*/
annualTaxInput.oninput = function hideAnnualTaxErrorMessage() {
    document.getElementById('annual-tax').style.borderColor = '#000';
    document.getElementById('annualTaxErrorMessage').style.display = 'none';
}

/**
 * A variable called 'annualInsuranceInput' for saving the input element with id = 'annual-insurance'.
 * @let annualInsuranceInput
*/
let annualInsuranceInput = document.getElementById('annual-insurance');

/** @function hideAnnualInsuranceErrorMessage
 * Function to hide the error message below the annual insurance field.
 * It also changes the border to its original color.
*/
annualInsuranceInput.oninput = function hideAnnualInsuranceErrorMessage() {
    document.getElementById('annual-insurance').style.borderColor = '#000';
    document.getElementById('annualInsuranceErrorMessage').style.display = 'none';
}
