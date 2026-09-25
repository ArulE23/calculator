let displayStr = "";
const display = document.querySelector("#display");
const calcBtns = document.querySelectorAll(".row > button");
for (const calcBtn of calcBtns) {
    calcBtn?.addEventListener("click", () => {
        displayStr += calcBtn.value;
        if (!display)
            return;
        display.textContent = displayStr;
    });
}
export {};
//# sourceMappingURL=main.js.map