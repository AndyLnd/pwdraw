import LineBrush from './linebrush';
import { rand } from './util';

export class DripBrush extends LineBrush {
  doDraw(oldX, oldY, newX, newY) {
    super.doDraw(oldX, oldY, newX, newY);
    const dX = oldX - newX;
    const dY = oldY - newY;
    const dist = dX * dX + dY * dY;
    this.animateDrip(newX, newY);
  }

  getImage(size = 32, color = "#301") {
    return `
      <svg width="${size}" height="${size}" viewBox="0 0 32 32">
        <path fill="${color}" d="M25 19.524V28.5a3.5 3.5 0 0 1-7 0v-7.449l-1 .211V22.5a4.5 4.5 0 1 1-9 0v-.216c-3.78-.794-6.923-3.718-7.778-7.708-1.157-5.402 2.32-10.712 7.765-11.86L19.821.22c5.446-1.149 10.799 2.3 11.957 7.702 1.086 5.068-1.907 10.055-6.778 11.6z" />
      </svg>
    `;
  }

  animateDrip(centerX, centerY) {
    if (rand() > .3) return;
    const size = LineBrush.size;
    const scale = rand(.2, .4);
    const dripSize = scale * size;
    let speed = rand(.3, .7);
    const damp = rand(.975, .995);
    const color = LineBrush.color;
    const sizeDiff = size - dripSize;
    const x = centerX + rand(sizeDiff) - sizeDiff / 2;
    let y = centerY;
    const loop = () => {
      y += speed;
      speed *= damp;
      if (speed > .1) {
        requestAnimationFrame(loop);
      }
      this.ctx.fillStyle = color;
      this.ctx.beginPath();
      this.ctx.arc(x, y, dripSize / 2, 0, Math.PI * 2);
      this.ctx.fill();
    }
    loop();
  }
}
