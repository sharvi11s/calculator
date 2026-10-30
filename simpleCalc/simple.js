
const display = document.getElementById("display");

function appendToDisplay(input) {
    display.value += input;
}

function clearDisplay() {
    display.value = "";
}

function deleteLast() {
    display.value = display.value.slice(0, -1);
}

function calculate() {
    try {
        display.value = Function(
            '"use strict"; return (' + display.value.replace(/x/g, "*") + ')'
        )();
    } catch {
        display.value = "Error";
    }
}

window.appendToDisplay = appendToDisplay;
window.clearDisplay = clearDisplay;
window.deleteLast = deleteLast;
window.calculate = calculate;
