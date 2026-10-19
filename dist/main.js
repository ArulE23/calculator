let displayStr = "";
const display = document.querySelector("#display");
function updateDisplay() {
    if (!display)
        return;
    display.textContent = displayStr;
}
// in a combination of "+" and "-" operator will simplify and return the
// correct sign. e.g "--+-" = -1
// cannot have multiplification or division symbol
function getNumSign(remainingOpStr) {
    // if (remainingOpStr.includes("×") || remainingOpStr.includes("÷")) {
    //   throw "Syntax Error";
    // }
    let sign = 1;
    for (const op of remainingOpStr) {
        if (op === "-") {
            sign *= -1;
        }
    }
    1;
    return sign;
}
function replaceFunc(matchSubStr, ...args) {
    const nums = matchSubStr.match(/(^[\-])?[0-9\.]+/g);
    if (nums === null)
        return "";
    matchSubStr = matchSubStr.replace(/^\-/, "");
    const operator = matchSubStr.match(/[\+\-\÷\×]+/);
    if (operator == null)
        return "";
    const op = operator[0];
    const floatNums = nums.map(num => parseFloat(num));
    let total;
    switch (op[0]) {
        case "÷":
            total = floatNums.reduce((acc, curr) => acc / curr);
            return `${total * getNumSign(op.slice(1))}`;
        case "×":
            total = floatNums.reduce((acc, curr) => acc * curr);
            return `${total * getNumSign(op.slice(1))}`;
        default:
            total = floatNums.reduce((acc, curr) => acc + (curr * getNumSign(op)));
            return `${total}`;
    }
}
function sum() {
    if (/([\+\-]+|^)[\÷\×]|[\+\-\÷\×]$|.*\..*\..*/.test(displayStr)) {
        displayStr = "Syntax Error!";
    }
    if (/[\÷][\+\-]*0/.test(displayStr)) {
        displayStr = "Can't divide by 0!";
    }
    while (/[\-]?[\.0-9]+[\÷][\+\-]*[\.0-9]+/.exec(displayStr)) {
        displayStr = displayStr.replace(/[\-]?[0-9]+[\÷][\+\-]*[0-9]+/, replaceFunc);
    }
    while (/[\-]?[\.0-9]+[\×][\+\-]*[\.0-9]+/.exec(displayStr)) {
        displayStr = displayStr.replace(/[\-]?[\.0-9]+[\×][\+\-]*[\.0-9]+/, replaceFunc);
    }
    while (/[\-]?[\.0-9]+[\+\-]+[\.0-9]+/.exec(displayStr)) {
        displayStr = displayStr.replace(/[\-]?[\.0-9]+[\+\-]+[\.0-9]+/, replaceFunc);
    }
}
const calcBtns = document.querySelectorAll(".row > button");
for (const calcBtn of calcBtns) {
    calcBtn?.addEventListener("click", () => {
        // to check if display has an error msg on it
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
    sum();
    updateDisplay();
});
export {};
//# sourceMappingURL=main.js.map