// Get number and decimal elements
let numbersAndDecimal = {
    button7: document.getElementById('seven'),
    button8: document.getElementById('eight'),
    button9: document.getElementById('nine'),
    button4: document.getElementById('four'),
    button5: document.getElementById('five'),
    button6: document.getElementById('six'),
    button1: document.getElementById('one'),
    button2: document.getElementById('two'),
    button3: document.getElementById('three'),
    buttonZero: document.getElementById('zero'),
    decimalButton: document.getElementById('decimal')
}

// Add event listeners to numbers
for (const property in numbersAndDecimal) {
    numbersAndDecimal[property].addEventListener('click', addNumber);
}

// Get operator elements
let operators = {
    multiplicationButton: document.getElementById('multiply'),
    divisionButton: document.getElementById('divide'),
    addButton: document.getElementById('add'),
    subtractionButton: document.getElementById('subtract'),
    remainderButton: document.getElementById('remainder')
}

// Add event listeners to operators
for (const element in operators) {
    operators[element].addEventListener('click', operate);
}

// Get remaining elements
let allClearButton = document.getElementById('allclear');
let clearButton = document.getElementById('delete');
let equalsButton = document.getElementById('equals');
let screen = document.getElementById('screen');

// let result = '';
let rightOperand = '';
let leftOperand = '';
let currentOperator = '';
let leftOperandHistory = [];
let lastValue = '';
let buttonHistory = [];
let usedEquals = false;
screen.innerHTML = '0';

function addNumber() {
    if (rightOperand.length < 11) {
        rightOperand += this.value;
        buttonHistory.push(+rightOperand);
        screen.innerHTML = rightOperand;
    }
}

let operations = {
    '+': function (x, y) { return x + y },
    '-': function (x, y) { return x - y },
    '*': function (x, y) { return x * y },
    '/': function (x, y) { return x / y },
    '%': function (x, y) { return x % y }
}

function checkLength(number, operator) {
    if (number > 99999999999 || number < -99999999999) {
        let shortened = Number(number).toExponential(6);
        screen.innerHTML = shortened;
        rightOperand = '';
        currentOperator = operator;
    }
}

function operate() {
    if (leftOperand === '') {
        leftOperand = +rightOperand;
        leftOperandHistory.push(leftOperand);
        rightOperand = '';
        currentOperator = this.value;
    } else if (currentOperator === this.value && rightOperand === '') {
        console.log(leftOperandHistory);
        console.log(currentOperator);
        console.log(buttonHistory);
        console.log(leftOperandHistory[leftOperandHistory.length - 1]);

    } else if (currentOperator) {
        evaluate();
        currentOperator = this.value;
    }
    
    checkLength(leftOperand, currentOperator);
    
}

function evaluate() {
    if (usedEquals) {
        leftOperand = operations[currentOperator](leftOperandHistory[leftOperandHistory.length - 1], buttonHistory[buttonHistory.length - 1]);
        screen.innerHTML = leftOperand;
        leftOperandHistory.push(leftOperand);
        rightOperand = '';
    } else {
        leftOperand = operations[currentOperator](+leftOperand, +rightOperand);
        screen.innerHTML = leftOperand;
        leftOperandHistory.push(leftOperand);
        rightOperand = '';
        usedEquals = true;
    }
    checkLength(leftOperand, currentOperator);
}

function clearEntry() {
    screen.innerHTML = 0;
    rightOperand = '';
}

function clearAll() {
    leftOperand = '';
    rightOperand = '';
    leftOperandHistory.length = 0;
    buttonHistory.length = 0;
    screen.innerHTML = 0;
    usedEquals = false;
}

allClearButton.addEventListener('click', clearAll);
clearButton.addEventListener('click', clearEntry);
equalsButton.addEventListener('click', evaluate);
