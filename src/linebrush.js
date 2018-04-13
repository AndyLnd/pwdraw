import Brush from './brush.js';

class LineBrush extends Brush {
  doDraw(oldX, oldY, newX, newY) {
    if (oldX === newX && oldY === newY) {
      newX += .1;
    }
    this.ctx.strokeStyle = Brush.color;
    this.ctx.lineWidth = Brush.size;
    this.ctx.lineCap = 'round';
    this.ctx.beginPath();
    this.ctx.moveTo(oldX, oldY);
    this.ctx.lineTo(newX, newY);
    this.ctx.stroke();
  }

  getImage(size = 32, color = "#000") {
    return `
      <svg width="${size}" height="${size}" viewBox="0 0 32 32">
        <circle fill="${color}" cx="16" cy="16" r="16"/>
      </svg>
    `
  }
}

export default LineBrush;