import Brush from './brush';

class EraserBrush extends Brush {
  doDraw(oldX, oldY, newX, newY) {
    const size = Brush.size;
    const grad = this.ctx.createRadialGradient(newX, newY, size * .9, newX, newY, size);
    grad.addColorStop(0, 'rgba(255,255,255,1)');
    grad.addColorStop(1, 'rgba(255,255,255,0)');
    this.ctx.fillStyle = grad;
    this.ctx.fillRect(newX - size, newY - size, size * 2, size * 2);
  }
  
  getImage() {
    return `
					<svg width="32" height="32" viewBox="0 0 32 32">
						<g fill="none" fill-rule="evenodd">
							<path fill="#fff" fill-rule="nonzero" d="M17.5 4.23l-7.4 7.4 10.24 10.22 7.39-7.39c1-1 1-2.7 0-3.7l-6.54-6.53c-1-1-2.7-1-3.7 0z"
							/>
							<path stroke="#fff" stroke-linejoin="round" stroke-linecap="round" stroke-width="4" d="M14.8 27.68L27.86 14.6c1-1 1-2.7 0-3.7l-6.54-6.54c-1-1-2.7-1-3.7 0L3.86 18.16c-1 1-1 2.7 0 3.7l5.83 5.82H30"
							/>
						</g>
					</svg>
    `
  }
}

export default EraserBrush;