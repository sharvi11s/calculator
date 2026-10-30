
// Goal of this function is to arrange everything properly,
// calculate the answer, and display it.

import { display } from "./display.js";
import { tokenize } from "./tokenizer.js";
import { angleMode } from "./angleMode.js";


// Saves successful calculations to the user's history.
async function saveToHistory(expression, result) {

    try {

        const formData = new FormData();

        formData.append("expression", expression);
        formData.append("result", String(result));
        formData.append("calculator_type", "engineering");

        const response = await fetch("../backend/save_history.php", {
            method: "POST",
            body: formData
        });

        const data = await response.json();

        if (!data.success) {
            console.log(data.message);
        }

    }

    catch (error) {
        console.error("History save failed:", error);
    }
}


function calculate() {

    // Store the original expression before replacing it with the result.
    const expression = display.value.trim();

    try {

        let tokens = tokenize(expression);
        let position = 0;


        function parseFactor() {

            let token = tokens[position];

            let result;


            // Number
            if (typeof token === "number") {

                position++;
                result = token;

            }


            // Square root
            else if (token === "√") {

                position++;
                result = Math.sqrt(parseFactor());

            }


            // Inverse sine
            else if (token === "asin") {

                position++;
                result = Math.asin(parseFactor());

                if (angleMode === "DEG") {
                    result = result * 180 / Math.PI;
                }

            }


            // Inverse cosine
            else if (token === "acos") {

                position++;
                result = Math.acos(parseFactor());

                if (angleMode === "DEG") {
                    result = result * 180 / Math.PI;
                }

            }


            // Inverse tangent
            else if (token === "atan") {

                position++;
                result = Math.atan(parseFactor());

                if (angleMode === "DEG") {
                    result = result * 180 / Math.PI;
                }

            }


            // Sine
            else if (token === "sin") {

                position++;

                let angle = parseFactor();

                if (angleMode === "DEG") {
                    angle = angle * Math.PI / 180;
                }

                result = Math.round(Math.sin(angle) * 1e10) / 1e10;

            }


            // Cosine
            else if (token === "cos") {

                position++;

                let angle = parseFactor();

                if (angleMode === "DEG") {
                    angle = angle * Math.PI / 180;
                }

                result = Math.round(Math.cos(angle) * 1e10) / 1e10;

            }


            // Tangent
            else if (token === "tan") {

                position++;

                let angle = parseFactor();

                if (angleMode === "DEG") {
                    angle = angle * Math.PI / 180;
                }

                result = Math.round(Math.tan(angle) * 1e10) / 1e10;

            }


            // Log
            else if (token === "log") {

                position++;
                result = Math.log10(parseFactor());

            }


            // Natural log
            else if (token === "ln") {

                position++;
                result = Math.log(parseFactor());

            }


            // Euler's number
            else if (token === "e") {

                position++;
                result = Math.E;

            }


            // Pi
            else if (token === "π") {

                position++;
                result = Math.PI;

            }


            // Unary minus
            else if (token === "-") {

                position++;
                result = -parseFactor();

            }


            // Parentheses
            else if (token === "(") {

                position++;

                result = parseExpression();

                position++; // skip ")"

            }


            // Postfix square
            if (tokens[position] === "²") {

                position++;
                result = result * result;

            }


            // Factorial
            if (tokens[position] === "!") {

                position++;

                let factorial = 1;

                for (let i = 1; i <= result; i++) {
                    factorial = factorial * i;
                }

                result = factorial;

            }

            return result;

        }


        // Handles powers
        function parsePower() {

            let result = parseFactor();

            while (tokens[position] === "^") {

                position++;

                let exponent = parseFactor();

                result = result ** exponent;

            }

            return result;

        }


        // Handles multiplication and division
        function parseTerm() {

            let result = parsePower();

            while (
                tokens[position] === "*" ||
                tokens[position] === "/"
            ) {

                let operator = tokens[position];

                position++;

                let nextNumber = parsePower();

                if (operator === "*") {
                    result = result * nextNumber;
                }

                else {
                    result = result / nextNumber;
                }

            }

            return result;

        }


        // Handles addition and subtraction
        function parseExpression() {

            let result = parseTerm();

            while (
                tokens[position] === "+" ||
                tokens[position] === "-"
            ) {

                let operator = tokens[position];

                position++;

                let nextNumber = parseTerm();

                if (operator === "+") {
                    result = result + nextNumber;
                }

                else {
                    result = result - nextNumber;
                }

            }

            return result;

        }


        // Calculate and display the final result.
        const result = parseExpression();

        display.value = result;

        // Save only valid calculations to history.
        if (expression !== "" && Number.isFinite(result)) {
            saveToHistory(expression, result);
        }

    }

    catch {

        display.value = "error";

    }

}


export {
    calculate
};
