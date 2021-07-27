function add(a, b) {
    return a + b;
}

function subtract (a, b) {
    return a - b;
}

function multiply (a, b) {
    return a * b;
}


function divide (a, b) {
    return a / b;
}

function operate(a, b, action) {
    return action(a, b);
}

userInput = Array.from(document.querySelectorAll('button'));
topDisplay = document.querySelector('#calc-display');
bottomDisplay = document.querySelector('#enter-num');

let equationArray = [];
let operators = /[-\/*+]/i;
let numValues = /[\d.]/i;

for (let i = 0; i < userInput.length; i++) {
    userInput[i].addEventListener('click', function () {
        
        // create equationArray and display numbers
        if (userInput[i].innerText.match(numValues)) {
            if (bottomDisplay.value.match(operators) ) {
                equationArray.push(bottomDisplay.value)
                bottomDisplay.value = '';
            }
        
            currentNum = userInput[i].innerText;
            topDisplay.innerText += `${userInput[i].innerText}`;
            bottomDisplay.value += currentNum;

        }
        else if (userInput[i].innerText == 'AC') {
            clearArray(equationArray);
            topDisplay.innerText = '';
            bottomDisplay.value = '';
        }
        else if (userInput[i].innerText.match(operators)) {
            if (bottomDisplay.value < 0) {
                equationArray.push(bottomDisplay.value);
                topDisplay.innerText += `${userInput[i].innerText}`;
                bottomDisplay.value = userInput[i].innerText;
            }
            else if (bottomDisplay.value.match(operators)) {
                alert('Cannot put two operators next to each other.')
            }
            else {
                equationArray.push(bottomDisplay.value);
                topDisplay.innerText += `${userInput[i].innerText}`;
                bottomDisplay.value = userInput[i].innerText;
            }

        }
    
        // calculate equation and do order of operations
        else {

            if (bottomDisplay.value.match(operators)) {
                alert('Cannot calculate. Last item is an operator.')
            }
            else {
                equationArray.push(bottomDisplay.value)
                // turn all strings into numbers
                for (let i = 0; i < equationArray.length; i++) {
                    if (equationArray[i] != '+' && equationArray[i] != '-' && equationArray[i] != '/' && 
                    equationArray[i] != '*') {
                        equationArray[i] = parseFloat(equationArray[i]);
                    }
                }

                // * and / loop
                for (let i = 0; i < equationArray.length; i++) {
                    if (equationArray[i] == '*') {
                        multiplyNumbers = equationArray[i-1] * equationArray[i+1];
                        equationArray.splice(i-1, 3, multiplyNumbers);
                        i = i - 1;
                    }
                    else if (equationArray[i] == '/'){
                        divideNumbers = equationArray[i-1] / equationArray[i+1];
                        equationArray.splice(i-1, 3, divideNumbers);
                        i = i - 1;
                    }
                }

                // + and - loop
                for (let i = 0; i < equationArray.length; i++) {
                    if (equationArray[i] == '+') {
                        addNumbers = equationArray[i-1] + equationArray[i+1];
                        equationArray.splice(i-1, 3, addNumbers);
                        i = i - 1;
                    }
                    else if (equationArray[i] == '-'){
                        subtractNumbers = equationArray[i-1] - equationArray[i+1];
                        equationArray.splice(i-1, 3, subtractNumbers);
                        i = i - 1;
                    }
                }

                bottomDisplay.value = equationArray[0];
                topDisplay.innerText = equationArray[0];
                equationArray.splice(0,1);
                console.log(equationArray);
            }
            
        }
 
            
    }); 
      
}



function clearArray (myArray) {
    let length = myArray.length;
    for (let i = 0; i < length; i++) {
        myArray.pop();
    }
    return myArray;
}
