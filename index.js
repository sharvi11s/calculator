const display = document.getElementById("display");

function appendToDisplay(input){
    display.value += input;
}

function clearDisplay(){
    display.value = "";
}

function deleteLast() {
    display.value = display.value.slice(0, -1);
}


// goal of this function is to turn a full mathematical expression into small tokens like [5, "+", 2, "-", 3]
function tokenize(expression) {  // created a function tokenize with expression as its input
    let tokens = []; // this array will store all our tokens
    let number = ""; // temporarily stores digits while we're building a number


    for (let i = 0; i < expression.length; i++) {  // loop will go through one expression at a time (it wont go to 125 as a whole direct number but 1->2->5 -> +)
        let char = expression[i]; // stores the current character in char


        if ((char >= "0" && char <= "9") || char === ".") {   // checks if the character is a number or a decimal point
            number += char; // if yes then add the number to the existing characters (1(y)->1, 2(y)->12, 5(y)->125 .(y)->125. 6(y)->125.6)
        }
        else {    // condition for when we reach an operator
            if (number !== "") {  // checks if a number is already built (125.6 is alr built. if not -> "")
                tokens.push(Number(number));  // convers the number sting into an actual integer ("125.6" -> 125.6) and push it to the token array
                number = "";  // since the number is already pushed to tokens, we reset the number variable to "" to build the next number
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
            else if ("+-*/()√²^!".includes(char)) {
                tokens.push(char);
            }
        }
    }


    if (number !== "") {
        tokens.push(Number(number)); // after the loop ends we manually push the final number because there is no operator present
    }


    return tokens;  // timeComplexity : O(n) , spaceComplexity : O(n)
}




// goal of this function is to arrange everything together properly and calculate and finally display the answer


function calculate() {
    try {
        let tokens = tokenize(display.value); //uses the tokenize function created earlier
        let position = 0; // tells us which position we are at

        function parseFactor() {

            let token = tokens[position];

            let result;

            if (typeof token === "number") {
                position++;
                result = token;
            }

            else if (token === "√") {
                position++;
                result = Math.sqrt(parseFactor());
            }

            else if (token === "sin") {
                position++;
                result = Math.round(Math.sin(parseFactor() * Math.PI / 180) * 1e10) / 1e10;
            }

            else if (token === "cos") {
                position++;
                result = Math.round(Math.cos(parseFactor() * Math.PI / 180) * 1e10) / 1e10;
            }

            else if (token === "tan") {
                position++;
                result = Math.round(Math.tan(parseFactor() * Math.PI / 180) * 1e10) / 1e10;
            }

            else if (token === "log") {
                position++;
                result = Math.log10(parseFactor());
            }

            else if (token === "ln") {
                position++;
                result = Math.log(parseFactor());
            }

            else if (token === "e") {
                position++;
                result = Math.E;
            }

            else if (token === "π") {
                position++;
                result = Math.PI;
            }

            else if (token === "-") {
                position++;
                result = -parseFactor();
            }

            else if (token === "(") {
                position++;
                result = parseExpression();
                position++;
            }

            // postfix square
            if (tokens[position] === "²") {
                position++;
                result = result * result;
            }

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

        function parsePower() {
            let result = parseFactor();

            while (tokens[position] === "^") {

                position++;
                let exponent = parseFactor();

                result = result ** exponent;
            }

            return result;
        }

        function parseTerm() {   // for multiplication and division operations
            let result = parsePower();

            while (tokens[position] === "*" || tokens[position] === "/") {
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

        function parseExpression() {    // for addition and subtraction operations

            let result = parseTerm();

            while (tokens[position] === "+" || tokens[position] === "-") {

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

        display.value = parseExpression();  // displays result
    }
    catch {
        display.value = "error";
    }
}

// goal of this function is to solve square root problems
function squareRoot() {
    display.value = Math.sqrt(Number(display.value));
}

// goal of this function is to solve squaring problems
function square() {
    display.value = Number(display.value) ** 2;
}

// goal of this function is to solve problems involving a power more that 2
function power() {
    display.value += "^";
}


// goal of this function is that rather than giving number inputs by clicking on the screen we can now use they keyboard
document.addEventListener("keydown", function(event) {

    // Shift + Backspace = AC
    if (event.shiftKey && event.key === "Backspace") {
        clearDisplay();
    }

    // Backspace = DEL
    else if (event.key === "Backspace") {
        deleteLast();
    }

    // Enter = calculate
    else if (event.key === "Enter") {
        calculate();
    }

    // Shift + R = square
    else if (event.shiftKey && event.key.toLowerCase() === "r") {
        appendToDisplay("²");
    }

    // Shift + 6 = power
    else if (event.shiftKey && event.key === "^") {
        appendToDisplay("^");
    }

    // R = square root
    else if (!event.ctrlKey && event.key.toLowerCase() === "r") {
        appendToDisplay("√");
    }

    // s = sin
    else if (event.key.toLowerCase() === "s") {
        appendToDisplay("sin");
    }

    // c = cos
    else if (event.key.toLowerCase() === "c") {
        appendToDisplay("cos");
    }

    // t = tan
    else if (event.key.toLowerCase() === "t") {
        appendToDisplay("tan");
    }

    // Shift + l = ln
    else if (event.shiftKey && event.key.toLowerCase() === "l") {
        appendToDisplay("ln");
    }

    // l = log
    else if (event.key.toLowerCase() === "l") {
        appendToDisplay("log");
    }

    // e = e
    else if (event.key.toLowerCase() === "e") {
        appendToDisplay("e");
    }

    // p = pi
    else if (event.key.toLowerCase() === "p") {
        appendToDisplay("π");
    }

    // Numbers + operators
    else if (
        (event.key >= "0" && event.key <= "9") ||
        ["+", "-", "*", "/", "(", ")", ".", "!"].includes(event.key)
    ) {
        appendToDisplay(event.key);
    }

});