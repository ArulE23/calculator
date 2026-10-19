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
  }
  return sign;
}

function divide(matchSubStr: string, ...args: any[]) {
  const nums = matchSubStr.match(/(^[\-])?[0-9\.]+/g);
  if (nums === null) return "";

  matchSubStr = matchSubStr.replace(/^\-/, "");

  const operator = matchSubStr.match(/[\+\-\÷\×]+/);
  if (operator == null) return "";
  const op = operator[0]

  let total = nums.map(num => parseFloat(num))
    .reduce((acc, curr) => acc / curr);

  return `${total * getNumSign(op.slice(1))}`;
}

function multiply(matchSubStr: string, ...args: any[]) {
  const nums = matchSubStr.match(/(^[\-])?[\.0-9]+/g);
  if (nums === null) return "";

  matchSubStr = matchSubStr.replace(/^\-/, "");

  const operator = matchSubStr.match(/[\+\-\÷\×]+/);
  if (operator == null) return "";
  const op = operator[0];

  let total = nums.map(num => parseFloat(num))
    .reduce((acc, curr) => acc * curr);

  return `${total * getNumSign(op.slice(1))}`;
}

function addSubtract(matchSubStr: string, ...args: any[]) {
  const nums = matchSubStr.match(/(^[\-])?[\.0-9]+/g);
  if (nums === null) return "";

  matchSubStr = matchSubStr.replace(/^\-/, "");

  const operator = matchSubStr.match(/[\+\-\÷\×]+/);
  if (operator == null) return "";
  const op = operator[0];

  let total = nums.map(num => parseFloat(num))
    .reduce((acc, curr) => acc + (curr * getNumSign(op)));

  return `${total}`;
}

function sum() {
  if (/([\+\-]+|^)[\÷\×]|[\+\-\÷\×]$|.*\..*\..*/.test(displayStr)) {
    displayStr = "Syntax Error!";
  }
  if (/[\÷][\+\-]*0/.test(displayStr)) {
    displayStr = "Can't divide by 0!";
  }

  while(/[\-]?[\.0-9]+[\÷][\+\-]*[\.0-9]+/.exec(displayStr)) {
    displayStr = displayStr.replace(/[\-]?[0-9]+[\÷][\+\-]*[0-9]+/, divide);
  }
  while(/[\-]?[\.0-9]+[\×][\+\-]*[\.0-9]+/.exec(displayStr)) {
    displayStr = displayStr.replace(/[\-]?[\.0-9]+[\×][\+\-]*[\.0-9]+/, multiply);
  }
  while(/[\-]?[\.0-9]+[\+\-]+[\.0-9]+/.exec(displayStr)) {
    displayStr = displayStr.replace(/[\-]?[\.0-9]+[\+\-]+[\.0-9]+/, addSubtract);
  }

  return displayStr;
}

const calcBtns = document.querySelectorAll<HTMLButtonElement>(".row > button");
for (const calcBtn of calcBtns) {
  calcBtn?.addEventListener("click", () => {
    // to check if display has an error on it
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