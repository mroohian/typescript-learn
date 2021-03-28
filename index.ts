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
earth.x = 0;
earth.y = 0;
earth.orbitRadius = 105;
earth.orbitalSpeed = 0.001;

const moon = new SolarSystemObject();
moon.image = new Image();
moon.image.src = "https://mdn.mozillademos.org/files/1443/Canvas_moon.png";
moon.imageWidth = 7;
moon.imageHeight = 7;
moon.x = 0;
moon.y = 0;
moon.orbitRadius = 28.5;
moon.orbitalSpeed = 0.01;

const dt = 0.5;
let t = 0;

function draw(): void {
  t = t + dt;

  earth.x = sun.x - Math.sin(t * earth.orbitalSpeed) * earth.orbitRadius;
  earth.y = sun.y + Math.cos(t * earth.orbitalSpeed) * earth.orbitRadius;

  moon.x = earth.x - Math.sin(t * moon.orbitalSpeed) * moon.orbitRadius;
  moon.y = earth.y + Math.cos(t * moon.orbitalSpeed) * moon.orbitRadius;

  context.clearRect(0, 0, width, height);

  // draw moon
  context.drawImage(
    moon.image,
    moon.x - moon.imageWidth / 2,
    moon.y - moon.imageHeight / 2,
    moon.imageWidth,
    moon.imageHeight);

  // draw earth
  context.drawImage(
    earth.image,
    earth.x - earth.imageWidth / 2,
    earth.y - earth.imageHeight / 2,
    earth.imageWidth,
    earth.imageHeight);

  context.drawImage(
    sun.image,
    sun.x - sun.imageWidth / 2,
    sun.y - sun.imageWidth / 2,
    sun.imageWidth,
    sun.imageHeight);

  window.requestAnimationFrame(draw);
}

window.requestAnimationFrame(draw);
