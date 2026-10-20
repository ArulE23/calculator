let displayStr: string = "";

const display: HTMLDivElement | null = document.querySelector("#display");
function updateDisplay() {
  if (!display) return;
  display.textContent = displayStr;
}

// in a combination of "+" and "-" operator will simplify and return the
// correct sign. e.g "--+-" = -1
// cannot have multiplification or division symbol
function getNumSign(remainingOpStr: string): number {
  // if (remainingOpStr.includes("×") || remainingOpStr.includes("÷")) {
  //   throw "Syntax Error";
  // }
  let sign = 1;
  for (const op of remainingOpStr) {
    if (op === "-") {
      sign *= -1;
    }
  }1
  return sign;
}

function replaceFunc(matchSubStr: string, ...args: any[]) {
  const nums = matchSubStr.match(/(^[\-])?[\.0-9]+/g);
  if (nums === null) return "";

  matchSubStr = matchSubStr.replace(/^\-/, "");

  const operator = matchSubStr.match(/[\+\-\÷\×]+/);
  if (operator == null) return "";
  const op = operator[0]

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
  // each regex checks for incorrect equation syntax:
  // first regex checks for equations like: "÷5+1", "1-×2"
  // second: "1+2-"
  // third: "2.5.6+5"
  if (/([\+\-]+|^)[\÷\×] | [\+\-\÷\×]$ | .*\..*\..*/.test(displayStr)) {
    displayStr = "Syntax Error!";
  }
  // checks for any divisions by 0
  if (/[\÷][\+\-]*0/.test(displayStr)) {
    displayStr = "Can't divide by 0!";
  }

  // regex checks for any divisons in equations and replaces
  // them with its result
  // e.g "-1+9÷3×-2" becomes "-1+3×-2"
  while(/[\-]?[\.0-9]+[\÷][\+\-]*[\.0-9]+/.exec(displayStr)) {
    displayStr = displayStr.replace(/[\-]?[\.0-9]+[\÷][\+\-]*[\.0-9]+/, replaceFunc);
  }
  // replaces multiplcations with result
  // e.g "-1+3×-2" => "-1+-6"
  while(/[\-]?[\.0-9]+[\×][\+\-]*[\.0-9]+/.exec(displayStr)) {
    displayStr = displayStr.replace(/[\-]?[\.0-9]+[\×][\+\-]*[\.0-9]+/, replaceFunc);
  }
  // replaces additions and subtractions with result
  // e.g "-1+-6" => "-7"
  while(/[\-]?[\.0-9]+[\+\-]+[\.0-9]+/.exec(displayStr)) {
    displayStr = displayStr.replace(/[\-]?[\.0-9]+[\+\-]+[\.0-9]+/, replaceFunc);
  }
}

const calcBtns = document.querySelectorAll<HTMLButtonElement>(".row > button");
for (const calcBtn of calcBtns) {
  calcBtn?.addEventListener("click", () => {
    // to check if display has an error msg on it
    if (/[a-z]/i.test(displayStr)) {
      displayStr = "";
    }
    displayStr += calcBtn.value;
    updateDisplay();
  })
}

const acBtn: HTMLButtonElement | null = document.querySelector<HTMLButtonElement>("#ac");
acBtn?.addEventListener("click", () => {
  displayStr = "";
  updateDisplay();
})

const delBtn: HTMLButtonElement | null = document.querySelector<HTMLButtonElement>("#del");
delBtn?.addEventListener("click", () => {
  displayStr = displayStr.slice(0, -1);
  updateDisplay();
})

const equalsBtn: HTMLButtonElement | null = document.querySelector<HTMLButtonElement>("#equals");
equalsBtn?.addEventListener("click", () => {
  sum();
  updateDisplay();
})

window.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "Backspace":
      displayStr = displayStr.slice(0, -1);
      break;
    case "c":
      displayStr = "";
      break;
    case "C":
      displayStr = "";
      break;
    case "=":
      sum();
      break;
    case "Enter":
      sum();
      break;
    case "/":
      displayStr += "÷";
      break;
    case "*":
      displayStr += "×";
      break;
    default:
      if (/^[\.\d\+\-]$/.test(event.key)) {
        displayStr += event.key;
      }
  }
  updateDisplay();
})