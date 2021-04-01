// element
const boomEl: HTMLCanvasElement = document.getElementById(
  "boom"
) as HTMLCanvasElement;

const width = boomEl.width;
const height = boomEl.height;

// context
const context: CanvasRenderingContext2D = boomEl.getContext("2d");
context.globalCompositeOperation = "destination-over";

class SolarSystemObject {
  image: HTMLImageElement;
  imageWidth: number;
  imageHeight: number;
  x: number;
  y: number;
  orbitRadius: number;
  orbitalSpeed: number;
}

const sun = new SolarSystemObject();
sun.image = new Image();
sun.image.src = "https://mdn.mozillademos.org/files/1456/Canvas_sun.png";
sun.imageWidth = 300;
sun.imageHeight = 300;
sun.x = width / 2;
sun.y = height / 2;

const earth = new SolarSystemObject();
earth.image = new Image();
earth.image.src = "https://mdn.mozillademos.org/files/1429/Canvas_earth.png";
earth.imageWidth = 24;
earth.imageHeight = 24;
earth.orbitRadius = 105;
earth.orbitalSpeed = 0.001;

const moon = new SolarSystemObject();
moon.image = new Image();
moon.image.src = "https://mdn.mozillademos.org/files/1443/Canvas_moon.png";
moon.imageWidth = 7;
moon.imageHeight = 7;
moon.orbitRadius = 28.5;
moon.orbitalSpeed = 0.01;

const showMoon = true;

const dt = 0.5;
let t = 0;

function handleInput(): void {
  // Empty
}

function update(): void {
  t = t + dt;

  earth.x = sun.x - Math.sin(t * earth.orbitalSpeed) * earth.orbitRadius;
  earth.y = sun.y + Math.cos(t * earth.orbitalSpeed) * earth.orbitRadius;

  moon.x = earth.x - Math.sin(t * moon.orbitalSpeed) * moon.orbitRadius;
  moon.y = earth.y + Math.cos(t * moon.orbitalSpeed) * moon.orbitRadius;
}

function drawSolarSystemObject(obj: SolarSystemObject): void {
  context.drawImage(
    obj.image,
    obj.x - obj.imageWidth / 2,
    obj.y - obj.imageHeight / 2,
    obj.imageWidth,
    obj.imageHeight
  );
}

function draw(): void {
  context.clearRect(0, 0, width, height);

  // draw moon
  if (showMoon) {
    drawSolarSystemObject(moon);
  }

  // draw earth
  drawSolarSystemObject(earth);

  // draw earth orbit
  context.fillStyle = "green";
  context.strokeStyle = "#e3ad13";
  context.beginPath();
  context.arc(sun.x, sun.y, earth.orbitRadius, 0, Math.PI * 2, false);
  context.stroke();

  // draw moon orbit
  context.beginPath();
  context.arc(earth.x, earth.y, moon.orbitRadius, Math.PI * 2, 0, false);
  context.stroke();

  // draw sun
  drawSolarSystemObject(sun);
}

function mainLoop(): void {
  handleInput();
  update();
  draw();

  window.requestAnimationFrame(mainLoop);
}

window.requestAnimationFrame(mainLoop);
