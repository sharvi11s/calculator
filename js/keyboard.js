
import {
    appendToDisplay,
    clearDisplay,
    deleteLast
} from "./display.js";

import { calculate } from "./parser.js";

// Listen for keyboard input.
document.addEventListener("keydown", function(event) {

    // Shift + Backspace = AC (clear the display).
    if (event.shiftKey && event.key === "Backspace") {
        event.preventDefault();
        clearDisplay();
    }

    // Backspace = DEL (delete the last character).
    else if (event.key === "Backspace") {
        event.preventDefault();
        deleteLast();
    }

    else if (event.key === "Enter") {
        event.preventDefault();
        calculate();
    }

    // Enter calculates the current expression.
    else if (event.key === "Enter") {
        event.preventDefault();

    // Remove focus from the previously clicked button.
    if (document.activeElement instanceof HTMLButtonElement) {
        document.activeElement.blur();
    }

    calculate();
}

    // Allow numbers, arithmetic operators, parentheses,
    // decimal point, and factorial.
    else if (
        (event.key >= "0" && event.key <= "9") ||
        ["+", "-", "*", "/", "(", ")", ".", "!"].includes(event.key)
    ) {
        appendToDisplay(event.key);
    }
});
