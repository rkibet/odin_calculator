
//javascript variable to link to buttons on the html

const displayWindow = document.querySelector('#displayOutput');
const backspaceButton = document.querySelector('#back');
const clearButton = document.querySelector('#ac');
const numberButtons = document.querySelectorAll('.operand');
const operatorButtons = document.querySelectorAll('.operator');
const decimalButton = document.querySelector('#decimal');
const equalsButton = document.querySelector('#equals');

//variables for numbers and operator

let firstNumber = '';
let operator = '';
let secondNumber = '';
let saveNumber = '';

// Adding listeners to number buttons 

for (let i = 0; i < numberButtons.length; i++) {
    numberButtons[i].addEventListener('click', processNumber)
};



// Adding listeners to operator buttons

for (let i = 0; i < operatorButtons.length; i++) {
    operatorButtons[i].addEventListener('click', function () {
        if (!firstNumber) {
            return
        } else {
            operator = operatorButtons[i].value;
        }
        secondNumber = '';
        useOperator();
    })
};


// display value

function displayNumber(intNumber) {
    displayWindow.innerHTML = intNumber;
}

// Function for backspace button

backspaceButton.addEventListener('click', function() {
    if (secondNumber) {
        strNumber = secondNumber.toString();
        strChars = strNumber.split('')
        strChars.pop();
        strNumber = strChars.join('');
        secondNumber = Number(strNumber);
        displayNumber(secondNumber);
    } else {
        strNumber = firstNumber.toString();
        strChars = strNumber.split('')
        strChars.pop();
        strNumber = strChars.join('');
        firstNumber = Number(strNumber);
        displayNumber(firstNumber);
    }
});

// Function for All Clear 
clearButton.addEventListener('click', function() {
    firstNumber = '';
    secondNumber = '';
    saveNumber = '';
    tot = '';
    operator = '';
    displayWindow.innerHTML = '';
})
//Operator Function 

function useOperator () {
    if (firstNumber && secondNumber) {
        saveNumber = operate(+firstNumber, operator, +secondNumber);
        if (saveNumber % 1 != 0) {
            saveNumber = saveNumber.toFixed(3);
        }
        displayNumber(saveNumber);
        firstNumber = saveNumber;
        secondNumber = '';
    }
}

// Function for decimal point

decimalButton.addEventListener('click', function() {
    decimal = decimalButton.value;
    if (displayWindow.innerHTML == '') {
        return
    } else if (displayWindow.innerHTML.includes('.')) {
        return
    } else {
        createNumber(decimal);
        if (secondNumber) {
            displayNumber(secondNumber);
        } else {
            displayNumber(firstNumber);
        }
    }
})

// Function for equals symbol

equalsButton.addEventListener('click', function() {
    let tot = operate(+firstNumber, operator, +secondNumber);
    if (!secondNumber) {
        return
    }
    if (tot % 1 != 0) {
        tot = tot.toFixed(3);
    }
    displayWindow.innerHTML = tot;
    firstNumber = tot;
})

function processNumber(e) {
    const number = Number(e.target.value);
    if (firstNumber && operator && secondNumber.length < 13) {
        createNumber(number);
        displayNumber(secondNumber);
      } else if (firstNumber.length < 13) {
        createNumber(number);
        displayNumber(firstNumber);
      }
}


function createNumber(number) {
	if (firstNumber && operator) {
		secondNumber += number;
	} else {
		firstNumber += number;
	}
};



// mathematical functions

function operate(x, operator, y) {
    switch(operator) {
        
        case 'minus':
            return minus(x, y);
            break;
        case 'times':
            return times(x, y);
            break;
        case 'plus':
            return plus(x, y);
            break;
        case 'divide':
            if (secondNumber == 0) {
                alert('undefined');
            } else {
            return divide(x, y);
            }
            break;
        default:
            console.log('Something went wrong')
    }
}

// Simple maths functions

function plus(x, y) {
    return x + y;
}

function minus(x, y) {
    return x - y;
}

function times(x, y) {
    return x * y;
}

function divide(x, y) {
    return x / y;
}