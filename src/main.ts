let displayStr: string = "";

const display: HTMLDivElement | null = document.querySelector("#display");
const calcBtns = document.querySelectorAll<HTMLButtonElement>(".row > button");
for (const calcBtn of calcBtns) {
  calcBtn?.addEventListener("click", () => {
    displayStr += calcBtn.value;
    if (!display) return;
    display.textContent = displayStr;
  })
}