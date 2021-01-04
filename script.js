


const displayValue = document.querySelector("#display");
const numButtons = document.querySelectorAll(".number-btn");
const operatorButtons = document.querySelectorAll(".operator-btn");
let ongoing = false;
//const buttons = document.querySelectorAll('button');

//Calculator memory
var memory = {
    input1:null,
    input2:null, 
    input3:null,
    input4:null,
    operator:null,
    sum:null
};

function operate(input1, input2, operator){
    switch(operator) {
        case '+':
            displayValue.textContent = add(input1, input2);
            break;
        case '-':
            displayValue.textContent = subtract(input1, input2);
            break;
        case '*':
            displayValue.textContent = multiply(input1, input2);
            break;
        case '/':
            displayValue.textContent = divide(input1, input2);
            break;
        default:
            displayValue.textContent = 'error';
    }
}

//Calculator operations
function add(input1, input2) {
    var in1 = memory.input1;
    var in2 = memory.input2;
    return (in1+in2);
}

function subtract(input1, input2) {
        var in1 = memory.input1;
        var in2 = memory.input2;
        return (in1-in2);
}

function multiply(input1, input2) {
        var in1 = memory.input1;
        var in2 = memory.input2;
        return (in1*in2);
}

function divide(input1, input2) {
    var in1 = memory.input1;
    var in2 = memory.input2;
    return (in1/in2);
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

function sum(){
    if((memory.input1 !== null) && (memory.input2 !== null)) {
        displayValue.textContent = operate(input1, input2, operator);
    }
}

function clearAll() {
    displayValue.textContent = "";
    memory.input1 = null
    memory.input2 = null
    memory.operator = null
    memory.sum = null
    enableNum();
    enableOperators();
}


    //Add event listeners to numbuttons
    
    numButtons.forEach((button) => {
        button.addEventListener('click', () => {
            enableOperators();
            displayValue.textContent += button.textContent;
            lengthChecker();
            memory.input1 = displayValue.textContent;
        });
    }); 
    
    

    //Add event listeners to operatorbuttons
    operatorButtons.forEach((button) => {
        button.addEventListener('click', () => {  
            disableOperators();
            if(memory.input2 === null) {
                memory.input2 = memory.input1;
            }
            else if(memory.input2 !== null) {
                displayValue.textContent = operate(memory.input1, memory.input2, button,textContent);
                memory.input1 = displayValue.textContent;
                memory.input2 = null;
            }
            
            
            
        });
    }); 







