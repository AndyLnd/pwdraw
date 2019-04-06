const deg2Quart = rot => (rot / 90 + 4) % 4;

const getQuarterTurns = () => {
  if ('orientation' in window) {
    return deg2Quart(window.orientation);
  }
  if ('orientation' in window.screen) {
    return deg2Quart(window.screen.orientation.angle);
  }
  return window.screen.width > window.screen.height ? 1 : 0;
};

export class ResizeRotator {
  constructor(canvas) {
    this.currentRotation = getQuarterTurns();
    this.canvas = canvas;
    window.addEventListener('orientationchange', this.checkRotation);
    window.addEventListener('resize', this.checkRotation);
  }
  checkRotation = () => {
    console.log('checkRotation');
    const newRotation = getQuarterTurns();
    const changeRotation = (this.currentRotation - newRotation + 4) % 4;
    this.currentRotation = newRotation;
    console.log(changeRotation);
    if (changeRotation) {
      this.rotate(changeRotation);
    }
  };
  rotate = quarterTurns => {
    const aspectChange = !!quarterTurns % 2;
    const width = this.canvas.width;
    const height = this.canvas.height;
    const newWidth = aspectChange ? height : width;
    const newHeight = aspectChange ? width : height;
    const offCan = document.createElement('canvas');
    const offCtx = offCan.getContext('2d');
    offCan.width = newWidth;
    offCan.height = newHeight;
    offCtx.rotate((Math.PI / 2) * quarterTurns);
    offCtx.drawImage(this.canvas, quarterTurns > 1 ? -width : 0, quarterTurns < 3 ? -height : 0);
    this.canvas.width = newWidth;
    this.canvas.height = newHeight;
    const context = this.canvas.getContext('2d');
    context.drawImage(offCan, 0, 0);
  };
}
