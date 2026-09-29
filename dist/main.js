let displayStr = "";
const display = document.querySelector("#display");
function updateDisplay() {
    if (!display)
        return;
    display.textContent = displayStr;
}
function parseDisplayNumbers() {
    return displayStr
        .split(/[\+\-\÷\×]/)
        .filter(num => num != "")
        .map(num => parseFloat(num));
}
function parseDisplayOperators() {
    return displayStr
        .split(/[0-9]+/)
        .slice(0, -1);
}
function sum() {
    let sum = 0;
    const operators = parseDisplayOperators();
    const numbers = parseDisplayNumbers();
    for (let i = 0; i < numbers.length; i++) {
        const num = numbers[i];
        if (num === undefined)
            return;
        switch (operators[i]) {
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
                sum /= num;
                break;
        }
    }
    return sum;
}
const calcBtns = document.querySelectorAll(".row > button");
for (const calcBtn of calcBtns) {
    calcBtn?.addEventListener("click", () => {
        displayStr += calcBtn.value;
        updateDisplay();
    });
}
const acBtn = document.querySelector("#ac");
acBtn?.addEventListener("click", () => {
    console.log(parseDisplayNumbers());
    displayStr = "";
    updateDisplay();
});
const equalsBtn = document.querySelector("#equals");
equalsBtn?.addEventListener("click", () => {
    console.log(sum());
    displayStr = `${sum()}`;
    updateDisplay();
});
export {};
//# sourceMappingURL=main.js.map