import Brush from './brush';
import { rand } from './util';

class SplatBrush extends Brush {
  doDraw(oldX, oldY, newX, newY) {
    this.ctx.fillStyle = Brush.color;
    for (let i = 0; i < 16; i++) {
      const angle = rand(Math.PI * 2);
      const dist = rand(Brush.size);
      const rad = rand(Brush.size / (2 + dist / 4));
      const x = newX + Math.cos(angle) * dist;
      const y = newY + Math.sin(angle) * dist;
      this.ctx.beginPath();
      this.ctx.arc(x, y, rad, 0, Math.PI * 2);
      this.ctx.fill();
    }
  }

  getImage(size = 32, color = "#000") {
    return `
      <svg width="${size}" height="${size}" viewBox="0 0 32 32">
        <path fill="${color}" d="M8.3 14A4 4 0 1 1 12 7.3V7a7 7 0 1 1 13.1 3.4A5 5 0 0 1 32 15a5 5 0 0 1-8.4 3.6 8 8 0 0 1-11.9 4.2A6 6 0 1 1 8 15.4l.3-1.5zM22 32a4 4 0 1 1 0-8 4 4 0 0 1 0 8z"/>
      </svg>
    `
  }
}

export default SplatBrush;