


const displayValue = document.querySelector("#display");
const numButtons = document.querySelectorAll(".number-btn");
const operatorButtons = document.querySelectorAll(".operator-btn");
//const buttons = document.querySelectorAll('button');

//Calculator memory
var memory = {
    input1:null,
    input2:null, 
    operator:null,
    previousKey:null
};

function operate(input1, input2, operator){
    let sum = 0
    switch(operator) {
        case '+':
            sum = parseFloat(input1) + parseFloat(input2);
            if(!Number.isInteger(sum)) {
                return sum.toFixed(3);
            }
            else {return sum};
            break;
        case '-':
            sum = parseFloat(input1) - parseFloat(input2);
            if(!Number.isInteger(sum)) {
                return sum.toFixed(3);
            }
            else {return sum};
            break;
        case '*':
            sum = parseFloat(input1) * parseFloat(input2);
            if(!Number.isInteger(sum)) {
                return sum.toFixed(3);
            }
            else {return sum};
            break;
        case '/':
            sum = parseFloat(input1) / parseFloat(input2);
            if(!Number.isInteger(sum)) {
                return sum.toFixed(3);
            }
            else {return sum};
            break;
        default:
            return 'error';
    }
}

function lengthChecker() {
    if((displayValue.textContent.length) < 6) {
        displayValue.style.fontSize = "56px";
    }
    
    if((displayValue.textContent.length) > 6) {
        displayValue.style.fontSize = "40px";
    }

    if((displayValue.textContent.length) >= 9) {
        disableNum();
    }

    if((displayValue.textContent.length) >= 10) {
        clearAll();
        displayValue.textContent = 'error';
    }
    
}

function disableNum() {
    numButtons.forEach((button) => {
        button.disabled = true;   
    });
}  

function enableNum() {
    numButtons.forEach((button) => {
        button.disabled = false;   
    });
}  

function disableOperators() {
    operatorButtons.forEach((button) => {
        button.disabled = true;   
    });
}  

function enableOperators() {
    operatorButtons.forEach((button) => {
        button.disabled = false;   
    });
} 

function clearDisplay() {
    displayValue.textContent = "";
    enableNum();
}

function clearAll() {
    displayValue.textContent = "";
    memory.input1 = null;
    memory.input2 = null;
    memory.operator = null;
    memory.previousKey = null;
    enableNum();
    enableOperators();
}

//comma-btn
document.getElementById("comma-btn").addEventListener("click", () => {
    let currentDisplay = displayValue.textContent;
    if (currentDisplay.includes('.') || (displayValue.textContent.length >= 9)) {
        return;
    }
    else if(!currentDisplay.includes('.')) {
        displayValue.textContent += '.';
        lengthChecker();
    }
});

//numbutton eventlisteners
numButtons.forEach((button) => {
    button.addEventListener('click', () => {
        enableOperators();
        if(memory.previousKey === 'sum') {
            clearDisplay();
            displayValue.textContent += button.textContent;
            lengthChecker();
            memory.input1 = displayValue.textContent;
        }
        if(memory.previousKey === null) {
            displayValue.textContent += button.textContent;
            lengthChecker();
            memory.input1 = displayValue.textContent;
        }
        else if(memory.previousKey === 'operator') {
            clearDisplay();
            memory.previousKey = 'numButton';
            displayValue.textContent += button.textContent;
            lengthChecker();
            memory.input2 = displayValue.textContent;
        }
        else if(memory.previousKey === 'numButton') {
            displayValue.textContent += button.textContent;
            lengthChecker();
            memory.input2 = displayValue.textContent;
        }
    });
}); 
    
//operatorbutton eventlisteners
operatorButtons.forEach((button) => {
    button.addEventListener('click', () => {
        enableNum();
        if (button.textContent === '=') {
            if(memory.input1 !== null && memory.input2 !== null){
                displayValue.textContent = operate(memory.input1, memory.input2, memory.operator);
                lengthChecker();
                memory.input1 = displayValue.textContent;
                memory.previousKey = 'sum';
            }
            return;
        }
        else if(memory.previousKey === 'sum'){
            disableOperators();
            memory.operator = button.textContent;
            memory.previousKey = 'operator';
        }
        
        else if (memory.input2 === null) {
            disableOperators();
            memory.operator = button.textContent;
            memory.previousKey = 'operator';
        }

        else if (memory.input2 !== null) {
            disableOperators();
            displayValue.textContent = operate(memory.input1, memory.input2, memory.operator);
            lengthChecker();
            memory.input1 = displayValue.textContent;
            memory.operator = button.textContent;
            memory.previousKey = 'operator';
        }
    })           
});
            
               
            
    
/*
TODO
-add comma functionality                            CHECK
-fix bugs in operator functions                     CHECK
-clean code
    -make sure its to standard and simplified
    -remove unused code
-Add active state to operator buttons
*/






