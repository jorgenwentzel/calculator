


const displayValue = document.querySelector("#display");
const numButtons = document.querySelectorAll(".number-btn");
const operatorButtons = document.querySelectorAll(".operator-btn");
//const buttons = document.querySelectorAll('button');

//Calculator memory
var memory = {
    input1:null,
    input2:null, 
    operator:null,
    sum:null,
    ongoing:false,
    previousKey:null
};

function operate(input1, input2, operator){
    switch(operator) {
        case '+':
            return parseFloat(input1) + parseFloat(input2);
            break;
        case '-':
            return parseFloat(input1) - parseFloat(input2);
            break;
        case '*':
            return parseFloat(input1) * parseFloat(input2);
            break;
        case '/':
            return parseFloat(input1) / parseFloat(input2);
            break;
        default:
            return 'error';
    }
}

function lengthChecker() {
    if ((displayValue.textContent.length) < 6) {
        displayValue.style.fontSize = "56px";
        }
    
    if ((displayValue.textContent.length) > 6) {
        displayValue.style.fontSize = "40px";
        }

    if (displayValue.textContent.length >= 9) {
        disableNum();
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
    if (currentDisplay.includes('.')) {
        return;
    }
    else if(!currentDisplay.includes('.')) {
        displayValue.textContent += '.';
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
            memory.previousKey = null;
            displayValue.textContent += button.textContent;
            lengthChecker();
            memory.input2 = displayValue.textContent;
        }
    });
}); 
    
    
//operatorbutton eventlisteners
//BUG: displayValue over 10 resets calculations
//BUG: multiplying by one and then pressing plus operator adds one to sum before operating
operatorButtons.forEach((button) => {
    button.addEventListener('click', () => {
        enableNum();
        if (button.textContent === '=') {
            if(memory.input1 !== null && memory.input2 !== null){
                displayValue.textContent = operate(memory.input1, memory.input2, memory.operator);
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
            displayValue.textContent = operate(memory.input1, memory.input2, button.textContent);
            memory.input1 = displayValue.textContent;
            memory.operator = button.textContent;
            memory.previousKey = 'operator';
        }
    })           
});
            
               
            
    
/*
TODO
-add comma functionality
-fix bugs in operator functions
-clean code
    -make sure its to standard and simplified
    -remove unused code
*/






