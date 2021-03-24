import { getInput, setInput, showResult } from "./utils";

function counterFunction(): void {
  const value: string = getInput();

  const valueParts: string[] = value.split(':');

  let hours: number = parseInt(valueParts[0]);
  let minutes: number = parseInt(valueParts[1]);
  let seconds: number = parseInt(valueParts[2]);

  seconds = seconds + 1;

  if (seconds > 59) {
    seconds = 0;
    minutes = minutes + 1;
  }

  if (minutes > 59) {
    minutes = 0;
    hours = hours + 1;
  }

  const output = `${hours}:${minutes}:${seconds}`

  setInput(output);
  showResult(output);
}

setInput('12:00:00');

setInterval(counterFunction, 1000);
// setTimeout(counterFunction, 50);

const inputElement = document.getElementById('input');

inputElement.addEventListener('dblclick', function() {
  setInput('12:00:00');
});