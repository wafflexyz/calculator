let displayNum = "0";
let firstNum = 0, secondNum = 0;
let currentOp = "";


function init(){
    updateDisplay();

    let buttons = document.querySelectorAll("button");

    buttons.forEach((btn) => {
        assignButton(btn);
    });
}

function addNumToDisplay(num) {
    if(displayNum === "0") {
        if(num !== 0) {
            displayNum = num;
        }        
    } else {
        displayNum += num;
    }
    updateDisplay();
}

function assignButton(btn) {
    if(btn.className === "number") {
        btn.addEventListener("click", () => {
            addNumToDisplay(btn.textContent);
        });
    } else if(btn.className === "operator") {
        btn.addEventListener("click", () => {
            operatorPressed(btn.textContent);
        });
    } else {
        /* Either clear, toggleMinus, percent, dot or equals
        */
        switch(btn.className) {
            case "clear":
                btn.addEventListener("click", () => {
                    btnClear();
                });
                break;
            case "toggleMinus":
                btn.addEventListener("click", () => {
                    toggleMinus();
                });
                
                break;
            case "percent":
                btn.addEventListener("click", () => {
                    takePercentage();
                });
                
                break;
            case "dot":
                btn.addEventListener("click", () => {
                    makeFraction();
                });
                break;
            case "equals":
                btn.addEventListener("click", () => {
                    compute();
                });
                break;
        }
    }
}

function compute() {
    secondNum = Number(displayNum);
    firstNum = operate(currentOp, firstNum, secondNum);
    currentOp = "";
    displayNum = ""+firstNum;
    updateDisplay();
}

function operatorPressed(op) {
    if(currentOp !== "") {
        alert("Operator pressed twice.")
    } else {
        currentOp = op;
        firstNum = Number(displayNum);
        displayNum = "0";
    }
    updateDisplay();
    
}

function btnClear() {
    displayNum = "0";
    firstNum = 0;
    secondNum = 0;
    currentOp = "";
    updateDisplay();
}

function toggleMinus() {
    if(displayNum.charAt(0) === "-") {
        displayNum = displayNum.substring(1);
    } else {
        displayNum = "-" + displayNum;
    }
    updateDisplay();
}

function takePercentage() {
    displayNum = ""+(Number(displayNum)/100);
    updateDisplay();
}

function makeFraction() {
    if(!displayNum.includes(".")) {
        displayNum += ".";
        updateDisplay();
    }
}


function updateDisplay() {
    document.getElementById("display").textContent = displayNum;
}



/* Calculations with operators
*/

/*
- add
- subtract
- multiply
- divide
*/

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
    if(b === 0) {
        alert("Division by 0");
        btnClear();
        return "ERROR";
    } else {
        return a / b;
    }

    
}

function operate(op, a, b) {
    switch(op) {
        case "+":
            return add(a, b);
        case "-":
            return subtract(a, b);
        case "*":
            return multiply(a, b);
        case "/":
            return divide(a, b);
    }
}

init();