let displayStr = "";
const display = document.querySelector("#display");
function updateDisplay() {
    if (!display)
        return;
    display.textContent = displayStr;
}
function parseDisplayNumbers() {
    const numbers = displayStr.split(/[\+\-\÷\×]+/);
    if (numbers.includes("")) {
        throw "Syntax Error.";
    }
    return numbers.map(num => parseFloat(num));
}
function parseDisplayOperators() {
    return displayStr
        .split(/[\.0-9]+/)
        .slice(0, -1);
}
// in a combination of "+" and "-" operators will simplify and return the
// correct sign. e.g "--+-" = -1
// cannot have multiplification or division symbol
function getNumSign(remainingOpStr) {
    if (remainingOpStr.includes("×") || remainingOpStr.includes("÷")) {
        throw "Syntax Error";
    }
    let sign = 1;
    for (const op of remainingOpStr) {
        if (op === "-") {
            sign *= -1;
        }
    }
    return sign;
}
function sum() {
    try {
        let sum = 0;
        // each operatorStr corresponds to a number in displayStr i.e:
        // "1+2" = ["", "+"] & [1, 2] 
        // "-1+2" = ["-", "+"] & [1, 2]
        // "1÷--+-2" = ["", "×--+-"] & [1, 2]
        const operators = parseDisplayOperators();
        const numbers = parseDisplayNumbers();
        for (let i = 0; i < numbers.length; i++) {
            let operatorStr = operators[i];
            let num = numbers[i];
            if (num === undefined || operatorStr === undefined)
                return;
            // case where operator is like "×--+-"
            if (operatorStr.length > 1) {
                // operatorStr becomes first symbol = "×"
                // remainingOpStr is rest of string = "--+-"
                let remainingOpStr = operatorStr.slice(1);
                operatorStr = operatorStr.slice(0, 1);
                const numSign = getNumSign(remainingOpStr);
                num = numSign * num;
            }
            switch (operatorStr) {
                // "" accounts for case where no operator in front of first number
                case "":
                    sum += num;
                    break;
                case "+":
                    sum += num;
                    break;
                case "-":
                    sum -= num;
                    break;
                case "×":
                    sum *= num;
                    break;
                case "÷":
                    if (num == 0) {
                        return "Cannot divide by 0.";
                    }
                    sum /= num;
                    break;
            }
        }
        if (sum % 1 !== 0) { // checks if sum is a float
            return sum.toFixed(9);
        }
        return sum;
    }
    catch (err) {
        return err;
    }
}
const calcBtns = document.querySelectorAll(".row > button");
for (const calcBtn of calcBtns) {
    calcBtn?.addEventListener("click", () => {
        // to check if display has an error on it
        if (/[a-z]/i.test(displayStr)) {
            displayStr = "";
        }
        displayStr += calcBtn.value;
        updateDisplay();
    });
}
const acBtn = document.querySelector("#ac");
acBtn?.addEventListener("click", () => {
    displayStr = "";
    updateDisplay();
});
const delBtn = document.querySelector("#del");
delBtn?.addEventListener("click", () => {
    displayStr = displayStr.slice(0, -1);
    updateDisplay();
});
const equalsBtn = document.querySelector("#equals");
equalsBtn?.addEventListener("click", () => {
    displayStr = `${sum()}`;
    updateDisplay();
});
export {};
//# sourceMappingURL=main.js.map