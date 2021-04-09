import { clockImage, sunImage, earthImage, moonImage } from "./images";

// element
const boomEl: HTMLCanvasElement = document.getElementById(
  "boom"
) as HTMLCanvasElement;

const width = boomEl.width;
const height = boomEl.height;

// context
const context: CanvasRenderingContext2D = boomEl.getContext("2d");
context.globalCompositeOperation = "destination-over";

class ClockObject {
  image: HTMLImageElement;
  imageWidth: number;
  imageHeight: number;
  x: number;
  y: number;

  draw(): void {
    context.drawImage(
      this.image,
      this.x - this.imageWidth / 2,
      this.y - this.imageHeight / 2,
      this.imageWidth,
      this.imageHeight
    );
  }
}

const clock = new ClockObject();
clock.image = new Image();
clock.image.src = clockImage;
clock.imageWidth = 500;
clock.imageHeight = 500;
clock.x = width / 2;
clock.y = height / 2;

const hoursHandle = new ClockObject();
hoursHandle.image = new Image();
hoursHandle.image.src = sunImage;
hoursHandle.imageWidth = 40;
hoursHandle.imageHeight = 40;

const minutesHandle = new ClockObject();
minutesHandle.image = new Image();
minutesHandle.image.src = earthImage;
minutesHandle.imageWidth = 20;
minutesHandle.imageHeight = 20;

const secondsHandle = new ClockObject();
secondsHandle.image = new Image();
secondsHandle.image.src = moonImage;
secondsHandle.imageWidth = 15;
secondsHandle.imageHeight = 15;

function handleInput(): void {
  // Empty
}

function getHoursDegree(hours: number, minutes: number): number {
  // input output     output in pi
  // 0      90        3    *   π / 6
  // 1      60        2    *   π / 6
  // 2      30        1    *   π / 6
  // 3      0         0    *   π / 6
  // 4      330       11   *   π / 6
  // 5      300       10   *   π / 6
  // 6      270       9    *   π / 6
  // 7      240       8    *   π / 6
  // 8      210       7    *   π / 6
  // 9      180       6    *   π / 6
  // 10     150       5    *   π / 6
  // 11     120       4    *   π / 6

  return ((((15 - hours) % 12) - minutes / 60) * Math.PI) / 6;
}

function getMinutesDegree(minutes: number, seconds: number): number {
  return ((((75 - minutes) % 60) * 2 - seconds / 60) * Math.PI) / 60;
}

function getSecondsDegree(seconds: number, ms: number): number {
  return ((((75 - seconds) % 60) * 2 - ms / 500) * Math.PI) / 60;
}

function update(): void {
  const date = new Date();

  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const ms = date.getMilliseconds();

  const hoursDeg = getHoursDegree(hours, minutes);
  const minutesDeg = getMinutesDegree(minutes, seconds);
  const secondsDeg = getSecondsDegree(seconds, ms);

  hoursHandle.x = clock.x + Math.cos(hoursDeg) * 120;
  hoursHandle.y = clock.y - Math.sin(hoursDeg) * 120;

  minutesHandle.x = clock.x + Math.cos(minutesDeg) * 190;
  minutesHandle.y = clock.y - Math.sin(minutesDeg) * 190;

  secondsHandle.x = clock.x + Math.cos(secondsDeg) * 200;
  secondsHandle.y = clock.y - Math.sin(secondsDeg) * 200;
}

function draw(): void {
  context.clearRect(0, 0, width, height);

  // draw moon
  secondsHandle.draw();

  // draw earth
  minutesHandle.draw();

  // draw sun
  hoursHandle.draw();

  // draw clock
  clock.draw();

  context.fillStyle = "white";
  context.fillRect(0, 0, width, height);
}

function mainLoop(): void {
  handleInput();
  update();
  draw();

  requestAnimationFrame(mainLoop);
}

requestAnimationFrame(mainLoop);

// setInterval(mainLoop, 500);
