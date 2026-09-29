let displayStr: string = "";
const display: HTMLDivElement | null = document.querySelector("#display");
function updateDisplay() {
  if (!display) return;
  display.textContent = displayStr;
}

function parseDisplayNumbers(): number[] {
  return displayStr
    .split(/[\+\-\÷\×]/)
    .filter(num => num != "")
    .map(num => parseFloat(num));
}

function parseDisplayOperators(): string[] {
  return displayStr
    .split(/[0-9]+/)
    .slice(0, -1);
}

function sum() {
  let sum: number = 0;
  const operators: string[] = parseDisplayOperators();
  const numbers: number[] = parseDisplayNumbers();

  for (let i = 0; i < numbers.length; i++) {
    const num = numbers[i];
    if (num === undefined) return;
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

const equalsBtn: HTMLButtonElement | null = document.querySelector<HTMLButtonElement>("#equals");
equalsBtn?.addEventListener("click", () => {
  console.log(sum());
  displayStr = `${sum()}`;
  updateDisplay();
})
