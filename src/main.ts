let displayStr: string = "";
const display: HTMLDivElement | null = document.querySelector("#display");
function updateDisplay() {
  if (!display) return;
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

const calcBtns = document.querySelectorAll<HTMLButtonElement>(".row > button");
for (const calcBtn of calcBtns) {
  calcBtn?.addEventListener("click", () => {
    displayStr += calcBtn.value;
    updateDisplay();
  })
}

const acBtn: HTMLButtonElement | null = document.querySelector<HTMLButtonElement>("#ac");
acBtn?.addEventListener("click", () => {
  console.log(parseDisplayNumbers());
  displayStr = "";
  updateDisplay();
})