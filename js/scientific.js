// Goal of this function is to solve square root problems

import { display } from "./display.js";

function squareRoot() {
    display.value = Math.sqrt(Number(display.value));
}


// Goal of this function is to solve squaring problems
function square() {
    display.value = Number(display.value) ** 2;
}


// Goal of this function is to solve problems involving a power more than 2
function power() {
    display.value += "^";
}

// Goal of this function is to convert a decimal into a fraction or a fraction into a decimal.
function convertFractionDecimal() {
    // Get the current calculator input.
    let value = display.value.trim();

    // If the input contains "/", treat it as a fraction.
    if (value.includes("/")) {
        // Split the fraction into numerator and denominator.
        let parts = value.split("/");

        // Make sure there are exactly two parts.
        if (parts.length !== 2) {
            display.value = "error";
            return;
        }

        // Convert both parts into numbers.
        let numerator = Number(parts[0]);
        let denominator = Number(parts[1]);

        // A denominator of zero is invalid.
        if (
            !Number.isFinite(numerator) ||
            !Number.isFinite(denominator) ||
            denominator === 0
        ) {
            display.value = "error";
            return;
        }

        // Divide the numerator by the denominator.
        display.value = numerator / denominator;
    } else {
        // Convert the displayed value into a number.
        let decimal = Number(value);

        // Reject invalid or empty input.
        if (value === "" || !Number.isFinite(decimal)) {
            display.value = "error";
            return;
        }

        // Store the sign separately.
        let sign = decimal < 0 ? -1 : 1;
        decimal = Math.abs(decimal);

        // Approximate the decimal as a fraction.
        let denominator = 1000000;
        let numerator = Math.round(decimal * denominator);

        // Find the greatest common divisor (GCD).
        function gcd(a, b) {
            while (b !== 0) {
                let remainder = a % b;
                a = b;
                b = remainder;
            }

            return a;
        }

        // Simplify the fraction by dividing both parts by the GCD.
        let divisor = gcd(numerator, denominator);

        numerator = (numerator / divisor) * sign;
        denominator = denominator / divisor;

        // Display the simplified fraction.
        display.value = numerator + "/" + denominator;
    }
}

// Calculates the reciprocal of the number on the display.
// Example: 4 → 1/4 → 0.25
function reciprocal() {
    // Convert the displayed value into a number.
    let value = Number(display.value);

    // Division by zero is undefined, so show an error.
    if (value === 0) {
        display.value = "error";
        return;
    }

    // Divide 1 by the number to calculate its reciprocal.
    display.value = 1 / value;
}

// Calculates the cube root of the number on the display.
// Example: 27 → 3, and -8 → -2.
function cubeRoot() {
    // Convert the displayed value into a number.
    let value = Number(display.value);

    // Calculate the cube root and show the result.
    display.value = Math.cbrt(value);
}

// Calculates the angle whose sine is the given number.
// Example: 0.5 → 30°
function inverseSin() {
    display.value += "asin(";
}


// Calculates the angle whose cosine is the given number.
// Example: 0.5 → 60°
function inverseCos() {
    display.value += "acos(";
}


// Calculates the angle whose tangent is the given number.
// Example: 1 → 45°
function inverseTan() {
    display.value += "atan(";
}


function absoluteValue() {
    // Convert the displayed input into a number.
    let value = Number(display.value);

    // Math.abs() returns the non-negative magnitude.
    display.value = Math.abs(value);
}

// Calculates the cube of the number on the display.
function cube() {
    let value = Number(display.value);
    display.value = value ** 3;
}

export {
    squareRoot,
    square,
    power,
    convertFractionDecimal,
    reciprocal,
    cubeRoot,
    inverseSin,
    inverseCos,
    inverseTan,
    absoluteValue,
    cube
};