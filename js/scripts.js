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
    fatherElement.appendChild(this.minValue);    
    fatherElement.appendChild(this.input);
    fatherElement.appendChild(this.maxValue);
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