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
export {};
//# sourceMappingURL=main.js.map