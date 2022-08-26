let value = 0;
let firstOperand;
let operator;
let hasUnusedDecimal = false;
let clearValueOnNext = false;

const operators = {
    ADD: 'add',
    SUBTRACT: 'subtract',
    MULTIPLY: 'multiply',
    DIVIDE: 'divide'
};

const solvers = {
    [operators.ADD]: (a, b) => a + b,
    [operators.SUBTRACT]: (a, b) => a - b,
    [operators.MULTIPLY]: (a, b) => a * b,
    [operators.DIVIDE]: (a, b) => a / b
};

const valueElement = document.querySelector('#value');
const numbersElement = document.querySelector('#numbers');
const operatorsElement = document.querySelector('#operators');
const clearElement = document.querySelector('#clear');
const equalElement = document.querySelector('#equal');

function updateValueDisplay() {
    valueElement.value = `${value.toString()}${hasUnusedDecimal ? '.' : ''}`;
}

function clearIfNeeded() {
    if (clearValueOnNext) {
        value = 0;
        clearValueOnNext = false;
    }
}

function addNumber(newNumberString) {
    const newNumber = parseInt(newNumberString);

    clearIfNeeded();

    if (hasUnusedDecimal) {
        value += newNumber * .1;
        hasUnusedDecimal = false;
    } else {
        value = parseFloat(`${value}${newNumberString}`);
    }

    updateValueDisplay();
}

function solve() {
    value = solvers[operator](firstOperand, value);

    clearValueOnNext = true;
    firstOperand = undefined;
    operator = undefined;

    updateValueDisplay();
}

numbersElement.addEventListener('click', (event) => {
   if (!event.target.matches('button')) return;

   const stringValue = event.target.dataset.value;

   if (stringValue === '.') {
       clearIfNeeded();
        hasUnusedDecimal = true;
        updateValueDisplay();
   } else { // is a number
       addNumber(stringValue);
   }
});

operatorsElement.addEventListener('click', (event) => {
   if (!event.target.matches('button')) return;

   if (operator) {
       solve();
   }

   operator = event.target.dataset.operator;
   firstOperand = value;
   clearValueOnNext = true;
});

clearElement.addEventListener('click', () => {
    value = 0;
    updateValueDisplay();
});

equalElement.addEventListener('click', () => {
    solve();
});

updateValueDisplay();