// Goal of this function is to turn a full mathematical expression
// into small tokens like [5, "+", 2, "-", 3]

function tokenize(expression) {

    let tokens = []; // this array will store all our tokens
    let number = ""; // temporarily stores digits while we're building a number

    for (let i = 0; i < expression.length; i++) {

        let char = expression[i];

        // checks if the character is a number or a decimal point
        if ((char >= "0" && char <= "9") || char === ".") {

            // add the character to the existing number
            number += char;
        }

        else {

            // if a number has already been built, push it to tokens
            if (number !== "") {
                tokens.push(Number(number));
                number = "";
            }

            // Check for scientific functions
            if (expression.startsWith("asin", i)) {
                tokens.push("asin");
                i += 3;
            } else if (expression.startsWith("acos", i)) {
                tokens.push("acos");
                i += 3;
            } else if (expression.startsWith("atan", i)) {
                tokens.push("atan");
                i += 3;
            }
            if (expression.startsWith("sin", i)) {
                tokens.push("sin");
                i += 2;
            }

            else if (expression.startsWith("cos", i)) {
                tokens.push("cos");
                i += 2;
            }

            else if (expression.startsWith("tan", i)) {
                tokens.push("tan");
                i += 2;
            }

            else if (expression.startsWith("log", i)) {
                tokens.push("log");
                i += 2;
            }

            else if (expression.startsWith("ln", i)) {
                tokens.push("ln");
                i += 1;
            }

            else if (expression.startsWith("e", i)) {
                tokens.push("e");
            }

            else if (char === "π") {
                tokens.push("π");
            }

            // Check for mathematical operators
            else if ("+-*/()√²^!".includes(char)) {
                tokens.push(char);
            }
        }
    }

    // Push the final number after the loop ends
    if (number !== "") {
        tokens.push(Number(number));
    }

    return tokens;
}

export {
    tokenize
};

