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


        if (!isNaN(char) || char === ".") {   // checks if the character is a number or a decimal point
            number += char; // if yes then add the number to the existing characters (1(y)->1, 2(y)->12, 5(y)->125 .(y)->125. 6(y)->125.6)
        }
        else {    // condition for when we reach an operator
            if (number !== "") {  // checks if a number is already built (125.6 is alr built. if not -> "")
                tokens.push(Number(number));  // convers the number sting into an actual integer ("125.6" -> 125.6) and push it to the token array
                number = "";  // since the number is already pushed to tokens, we reset the number variable to "" to build the next number
            }


            if ("+-*/()".includes(char)) {   // condition to check if the expression is an operator
                tokens.push(char);  // push to tokens array
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
            // Get the current token
            let token = tokens[position];

            // If it is a number, return it
            if (typeof token === "number") {
                position++;
                return token;
            }


            // If it is (, calculate everything inside ()
            if (token === "(") {
                position++; // skip (

                let result = parseExpression();  // calculate everything inside the parentheses
                position++; // skip )

                return result;  //  timeComplexity : O(n) (even tho TC of parseFactor() is O(1), since tokenize() is O(n), hence...)
            }
        }

        function parseTerm() {   // for multiplication and division operations
            let result = parseFactor();

            while (tokens[position] === "*" || tokens[position] === "/") {
                let operator = tokens[position];
                position++;

                let nextNumber = parseFactor();

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

