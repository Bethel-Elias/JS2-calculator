// --------------------
// Math Functions
// --------------------

function add(a, b) {
  return a + b;
}
function subtract(a, b) {
  return a - b;
}
function multiply(a, b) {
  return a * b;
}
function divide(a, b) {
  if (b === 0) {
    return null;
  }
  return a / b;
}

// --------------------
// Operate Function
// --------------------

function operate(operator, a, b) {
  a = Number(a);
  b = Number(b);

  switch (operator) {
    case "+":
      return add(a, b);
    case "-":
      return subtract(a, b);
    case "*":
      return multiply(a, b);
    case "/":
      return divide(a, b);
    default:
      return b;
  }
}

// --------------------
// DOM Elements
// --------------------

const display = document.getElementById("display");
const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");
const equalsButton = document.querySelector(".equals");
const clearButton = document.querySelector(".clear");
const decimalButton = document.querySelector(".decimal");
const backspaceButton = document.querySelector(".backspace");
const signBtn = document.querySelector(".sign");
const percentBtn = document.querySelector(".percent");
const DIVIDE_BY_ZERO_MESSAGE = "Nice try";

// --------------------
// Variables
// --------------------

let firstNumber = "";
let secondNumber = "";
let currentOperator = null;
let shouldResetDisplay = false;
let hasError = false;

// --------------------
// Display Functions
// --------------------

function updateDisplay(value) {
  if (!isNaN(value) && Number(value).toString().length > 9) {
    display.textContent = Number(value).toExponential(3);
  } else {
    display.textContent = value;
  }
}

function clearOperatorHighlight() {
  operatorButtons.forEach((button) => {
    button.classList.remove("active-operator");
  });
}

function showError(message) {
  hasError = true;
  firstNumber = "";
  secondNumber = "";
  currentOperator = null;
  shouldResetDisplay = true;
  display.textContent = message;
  clearOperatorHighlight();
}

function appendNumber(number) {
  if (hasError && shouldResetDisplay) {
    hasError = false;
  }

  // User started typing second number
  if (shouldResetDisplay) {
    display.textContent = number;
    shouldResetDisplay = false;

    // Remove operator highlight here
    clearOperatorHighlight();
    return;
  }

  // Replace initial 0
  if (display.textContent === "0") {
    display.textContent = number;
    return;
  }

  // Limit digits
  const plainText = display.textContent.replace(".", "").replace("-", "");
  if (plainText.length >= 9) {
    return;
  }
  display.textContent += number;
}

function appendDecimal() {
  if (hasError && shouldResetDisplay) {
    hasError = false;
  }

  // Start fresh after operator or =
  if (shouldResetDisplay) {
    display.textContent = "0";
    shouldResetDisplay = false;

    // Remove operator highlight
    clearOperatorHighlight();
    return;
  }

  // Prevent multiple decimals
  if (display.textContent.includes(".")) {
    return;
  }
  display.textContent += ".";
}

// --------------------
// Operator Functions
// --------------------

function setOperator(operator) {
  if (hasError) {
    return;
  }

  // chain calculation first
  if (currentOperator !== null && !shouldResetDisplay) {
    calculateResult();
  }
  if (hasError) {
    return;
  }
  firstNumber = display.textContent;
  currentOperator = operator;
  shouldResetDisplay = true;

  // update operator highlight
  operatorButtons.forEach((button) => {
    button.classList.remove("active-operator");

    if (button.textContent === operator) {
      button.classList.add("active-operator");
    }
  });
}

function calculateResult() {
  if (hasError || currentOperator === null || shouldResetDisplay) {
    return;
  }
  secondNumber = display.textContent;
  let result = operate(currentOperator, firstNumber, secondNumber);
  if (result === null) {
    showError(DIVIDE_BY_ZERO_MESSAGE);
    return;
  }

  // Round decimals
  if (typeof result === "number") {
    result = Math.round(result * 1000) / 1000;
  }
  updateDisplay(result);
  firstNumber = result;
  currentOperator = null;
  shouldResetDisplay = true;

  // Remove operator highlight after =
  clearOperatorHighlight();
}

// --------------------
// Utility Functions
// --------------------

function clearCalculator() {

  firstNumber = "";
  secondNumber = "";
  currentOperator = null;
  shouldResetDisplay = false;
  hasError = false;
  updateDisplay("0");
  clearOperatorHighlight();
}

function backspace() {
  if (hasError) {
    clearCalculator();
    return;
  }

  // If we're waiting for the next operand, keep the queued operator state intact.
  if (currentOperator !== null && shouldResetDisplay) {
    return;
  }

  // Allow editing result after =
  if (shouldResetDisplay) {
    shouldResetDisplay = false;
  }
  display.textContent = display.textContent.slice(0, -1);
  if (display.textContent === "" || display.textContent === "-") {
    display.textContent = "0";
  }
}

function toggleSign() {
  if (hasError) {
    return;
  }
  let currentValue = display.textContent;
  if (currentValue === "0") {
    return;
  }
  if (currentValue.startsWith("-")) {
    display.textContent = currentValue.slice(1);
  } else {
    display.textContent = "-" + currentValue;
  }
}

function convertPercent() {
  if (hasError) {
    return;
  }
  let currentValue = parseFloat(display.textContent);
  if (isNaN(currentValue)) {
    return;
  }
  updateDisplay(currentValue / 100);
}

// --------------------
// Handler Functions
// --------------------

function handleNumberInput(value) {
  appendNumber(value);
}
function handleOperatorInput(value) {
  setOperator(value);
}
function handleEquals() {
  calculateResult();
}
function handleClear() {
  clearCalculator();
}
function handleDecimal() {
  appendDecimal();
}
function handleBackspace() {
  backspace();
}
function handleSign() {
  toggleSign();
}
function handlePercent() {
  convertPercent();
}

// --------------------
// Button Event Listeners
// --------------------

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    handleNumberInput(button.textContent);
  });
});
operatorButtons.forEach((button) => {
  button.addEventListener("click", () => {
    handleOperatorInput(button.textContent);
  });
});
equalsButton.addEventListener("click", handleEquals);
clearButton.addEventListener("click", handleClear);
decimalButton.addEventListener("click", handleDecimal);
backspaceButton.addEventListener("click", handleBackspace);
signBtn.addEventListener("click", handleSign);
percentBtn.addEventListener("click", handlePercent);

// --------------------
// Keyboard Support
// --------------------

function handleKeyboardInput(event) {
  const key = event.key;

  // Numbers
  if (key >= "0" && key <= "9") {
    handleNumberInput(key);
  }

  // Decimal
  else if (key === ".") {
    handleDecimal();
  }

  // Operators
  else if (["+", "-", "*", "/"].includes(key)) {
    handleOperatorInput(key);
  }

  // Equals
  else if (key === "Enter" || key === "=") {
    handleEquals();
  }

  // Backspace
  else if (key === "Backspace") {
    handleBackspace();
  }

  // Clear
  else if (key.toLowerCase() === "c") {
    handleClear();
  }

  // Percent
  else if (key === "%") {
    handlePercent();
  }
}
window.addEventListener("keydown", handleKeyboardInput);
