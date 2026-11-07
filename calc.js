let currentInput = '';
let previousInput = '';
let currentOperation = null;

const display = document.getElementById('display');

// Appends numbers to the display
function appendNumber(number) {
    if (currentInput === '0') {
        currentInput = number;
    } else {
        currentInput += number;
    }
    updateDisplay();
}

// Handles operator button presses (+, -, *, /)
function appendOperator(operator) {
    if (currentInput === '') return;
    
    if (previousInput !== '') {
        calculate();
    }
    
    currentOperation = operator;
    previousInput = currentInput;
    currentInput = '';
}

// Deletes the last character typed (Backspace)
function deleteLast() {
    if (currentInput.length > 0) {
        currentInput = currentInput.slice(0, -1);
    }
    updateDisplay();
}

// Clears the entire state and display
function clearDisplay() {
    currentInput = '';
    previousInput = '';
    currentOperation = null;
    display.value = '0';
}

// Updates the HTML text input
function updateDisplay() {
    display.value = currentInput || previousInput || '0';
}

// Core math processing (safe alternative to eval)
function calculate() {
    let computation;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    
    if (isNaN(prev) || isNaN(current)) return;
    
    switch (currentOperation) {
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
            if (current === 0) {
                alert("Cannot divide by zero");
                clearDisplay();
                return;
            }
            computation = prev / current;
            break;
        default:
            return;
    }
    
    currentInput = computation.toString();
    currentOperation = null;
    previousInput = '';
    updateDisplay();
}

// KEYBOARD SUPPORT LOGIC
document.addEventListener('keydown', function(event) {
    const key = event.key;

    // Check if the key is a number (0-9)
    if (!isNaN(key) && key !== ' ') {
        appendNumber(key);
    }
    // Check if the key is an operator
    else if (key === '+' || key === '-' || key === '*' || key === '/') {
        appendOperator(key);
    }
    // Check for Enter or Equals key to calculate
    else if (key === 'Enter' || key === '=') {
        event.preventDefault(); // Prevent accidental form submission
        calculate();
    }
    // Check for Backspace
    else if (key === 'Backspace') {
        deleteLast();
    }
    // Check for Escape key to clear display
    else if (key === 'Escape') {
        clearDisplay();
    }
});


