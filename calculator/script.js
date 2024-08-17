// Get display element
const result = document.getElementById('result');
let currentInput = '';
let operator = '';
let previousInput = '';
let shouldResetScreen = false;

// Function to append values to the input
function appendNumber(value) {
    if (result.value === '0' || shouldResetScreen) {
        resetDisplay();
    }
    currentInput += value;
    result.value = currentInput;
}

// Function to reset the display when needed
function resetDisplay() {
    result.value = '';
    shouldResetScreen = false;
}

// Function to handle operator inputs
function chooseOperator(op) {
    if (currentInput === '') return;
    if (previousInput !== '') {
        compute();
    }
    operator = op;
    previousInput = currentInput;
    currentInput = '';
}

// Function to calculate the result
function compute() {
    let computation;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    if (isNaN(prev) || isNaN(current)) return;

    switch (operator) {
        case '+':
            computation = prev + current;
            break;
        case '-':
            computation = prev - current;
            break;
        case '*':
            computation = prev * current;
            break;
        case '/':
            computation = prev / current;
            break;
        default:
            return;
    }
    result.value = computation;
    currentInput = computation;
    operator = '';
    previousInput = '';
}

// Function to clear all inputs
function clearAll() {
    currentInput = '';
    operator = '';
    previousInput = '';
    result.value = '0';
}

// Add event listeners to buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', (event) => {
        if (event.target.classList.contains('operator')) {
            chooseOperator(event.target.value);
        } else {
            appendNumber(event.target.value);
        }
    });
});

// Add event listener for equals button
document.getElementById('equals').addEventListener('click', compute);

// Add event listener for clear button
document.getElementById('clear').addEventListener('click', clearAll);

// Keyboard support
window.addEventListener('keydown', (event) => {
    if (event.key >= 0 && event.key <= 9 || event.key === '.') {
        appendNumber(event.key);
    } else if (event.key === '+' || event.key === '-' || event.key === '*' || event.key === '/') {
        chooseOperator(event.key);
    } else if (event.key === 'Enter') {
        compute();
    } else if (event.key === 'Escape') {
        clearAll();
    }
});