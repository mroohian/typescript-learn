export function getInput() {
  const inputEl: HTMLInputElement = document.getElementById(
    "input"
  ) as HTMLInputElement;
  return inputEl.value;
}

export function setInput(value) {
  const inputEl: HTMLInputElement = document.getElementById(
    "input"
  ) as HTMLInputElement;
  inputEl.value = value;
}

export function showResult(result) {
  const outputDiv: HTMLElement = document.getElementById("output");
  outputDiv.innerHTML = `<h1>${result}</h1>`;
}
