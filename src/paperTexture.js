import { loadJson, storeJson } from './storage';

const drawCircle = (context, x, y, r) => {
  const { width, height } = context.canvas;
  context.beginPath();
  context.arc(x * width, y * height, r, 0, Math.PI * 2);
  context.fill();
};

const drawWrapCircle = (context, x, y, r) => {
  for (let xOffset = -1; xOffset <= 1; xOffset++) {
    for (let yOffset = -1; yOffset <= 1; yOffset++) {
      drawCircle(context, x + xOffset, y + yOffset, r);
    }
  }
};

const generatePoints = (num, size) =>
  Array.from({ length: num }, () => ({
    x: Math.random(),
    y: Math.random(),
    r: Math.random() ** 2 * (size / 4),
  }));

export function createTexture(size = 1024, restore) {
  const can = document.createElement('canvas');
  can.width = can.height = size;
  const ctx = can.getContext('2d');

  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, size, size);
  ctx.globalAlpha = 0.01;

  const hue = (restore && loadJson('textureHue')) || Math.floor(Math.random() * 360);
  ctx.fillStyle = `hsl(${hue}, 100%, 80%)`;
  storeJson('textureHue', hue);
  
  const points = (restore && loadJson('texturePoints')) || generatePoints(150, size);
  points.forEach(({ x, y, r }) => drawWrapCircle(ctx, x, y, r));
  storeJson('texturePoints', points);

  return ctx.createPattern(can, 'repeat');
}
