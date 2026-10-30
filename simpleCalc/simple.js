
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


// Saves calculations to the user's history.
async function saveToHistory(expression, result) {
    try {
        const formData = new FormData();

        formData.append("expression", expression);
        formData.append("result", String(result));
        formData.append("calculator_type", "simple");

        const response = await fetch("../backend/save_history.php", {
            method: "POST",
            body: formData
        });

        const data = await response.json();

        if (!data.success) {
            console.log(data.message);
        }

    } catch (error) {
        console.error("History save failed:", error);
    }
}


// Calculates the expression.
function calculate() {
    try {
        // Store the original expression.
        const expression = display.value.trim();

        // Calculate the result.
        const result = Function(
            '"use strict"; return (' + expression.replace(/x/g, "*") + ')'
        )();

        // Display the result.
        display.value = result;

        // Save only valid calculations.
        if (expression !== "" && Number.isFinite(result)) {
            saveToHistory(expression, result);
        }

    } catch {
        display.value = "Error";
    }
}


// Keyboard support.
document.addEventListener("keydown", function(event) {

    // Escape = AC (clear everything).
    if (event.key === "Escape") {
        event.preventDefault();
        clearDisplay();
    }

    // Backspace = DEL (delete last character).
    else if (event.key === "Backspace") {
        event.preventDefault();
        deleteLast();
    }

    // Enter = Calculate.
    else if (event.key === "Enter") {
        event.preventDefault();

        // Remove focus from the previously clicked button.
        if (document.activeElement instanceof HTMLButtonElement) {
            document.activeElement.blur();
        }

        calculate();
    }

    // Numbers, operators, decimal point and parentheses.
    else if (
        (event.key >= "0" && event.key <= "9") ||
        ["+", "-", "*", "/", ".", "(", ")"].includes(event.key)
    ) {
        event.preventDefault();
        appendToDisplay(event.key);
    }

});


// Make functions available to HTML buttons.
window.appendToDisplay = appendToDisplay;
window.clearDisplay = clearDisplay;
window.deleteLast = deleteLast;
window.calculate = calculate;
