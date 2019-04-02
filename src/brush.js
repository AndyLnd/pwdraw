export class Brush {
  static size = 20
  static color = '#000'

  static setSize(newSize) {
    Brush.size = newSize;
  }

  static setColor(newColor) {
    Brush.color = newColor;
  }

  constructor(ctx) {
    this.ctx = ctx;
    this.isDrawing = false;
    this.lastX = 0;
    this.lastY = 0;
  }

  startDraw(coords) {
    this.lastX = coords.x;
    this.lastY = coords.y;
    this.isDrawing = true;
    this.draw(coords);
  }

  stopDraw() {
    this.isDrawing = false;
  }

  draw(coords) {
    const size = 20;
    if (!this.isDrawing) return;
    this.doDraw(this.lastX, this.lastY, coords.x, coords.y)
    this.lastX = coords.x;
    this.lastY = coords.y;
  }

  doDraw() { }
  getImage() {
    return 'brush';
  }
}
