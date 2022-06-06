let runningTotal = 0;
let buffer = "0"
let previousOperator = null; //to track the previously pressed operator
const screen = document.querySelector(".display-text");


//bind event listeners
document.querySelector(".calc-buttons").addEventListener("click", (event) => {
    buttonClick(event.target.innerText);
});

function buttonClick(value) {
    if (isNaN(parseInt(value))) {
        handleSymbol(value);
    } else {
        handleNumber(value);
    }
    reRender();
}


function handleNumber(value) {
    if (buffer === "0") {
        buffer = value;
    } else {
        buffer += value;
    }
}


function handleSymbol(value) {
    switch (value) {
        case "C":
            buffer = "0";
            runningTotal = 0;
            previousOperator = null;
            break;
        case "=":
            if (previousOperator === null) {
                return;
            }
            flushOperation(parseInt(buffer));
            previousOperator = null
            buffer = "" + runningTotal;
            runningTotal = 0;
            break;
        case "←":
            if (buffer.length === 0) {
                buffer = 0;
            } else {
                buffer = buffer.substring(0, buffer.length - 1);
            }
            break;
        default:
            handleMath(value);
            break;
    }
}

function handleMath(value) {
    const intBuffer = parseInt(buffer);
    if(runningTotal === 0){
        runningTotal = intBuffer;
    } else {
        flushOperation(intBuffer);
    }
    previousOperator = value;
    buffer = "0"; 
}
function flushOperation(intBuffer) {
    if(previousOperator === "+"){
        runningTotal += intBuffer;
    } else if(previousOperator === "-"){
        runningTotal -= intBuffer;
    } else if(previousOperator === "x"){
        runningTotal *= intBuffer;
    } else {
        runningTotal /= intBuffer;
    }
}

function reRender() {
    screen.innerText = buffer;
}


/*
I plan to improve on this by creating a 2- display calculator
upper screen showing what what entered e.g 4 + 5
and when further operation is needed to be perform on the result,
upper screen shou display Ans + (whatever the operation is) 
if infinitty, it should display error.

will need to improve on it to pass fcc camp project
*/