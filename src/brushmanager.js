import { on } from './util';
import { Brush } from './brush';
import { loadJson, storeJson } from './storage';

function createItem(className, container, onClick) {
  const item = document.createElement('div');
  item.className = className;
  on(item, 'click', onClick);
  container.appendChild(item);
  return item;
}

export class BrushManager {
  constructor({ colors, brushes, sizes, context, eraser, colorContainer, brushContainer, sizeContainer, menuButton }) {
    this.brushes = brushes.map(brushClass => new brushClass(context));
    this.eraser = new eraser(context);
    this.menuButton = menuButton;

    this.currentBrush = this.brushes[loadJson('brushNumber')] || this.brushes[0];
    this.previousBrush = this.currentBrush;
    Brush.setColor(loadJson('brushColor') || colors[1]);
    Brush.setSize(loadJson('brushSize') || sizes[1]);

    const eraserItem = createItem('brushpicker eraser', brushContainer, () => this.setBrush(this.eraser));
    eraserItem.innerHTML = this.eraser.getImage();

    colors.forEach(color => {
      const colorItem = createItem('colorpicker', colorContainer, () => this.setColor(color));
      colorItem.style.backgroundColor = color;
    });

    this.brushes.forEach(brush => {
      const brushItem = createItem('brushpicker', brushContainer, () => this.setBrush(brush));
      brushItem.innerHTML = brush.getImage();
    });

    sizes.forEach(size => {
      const sizeItem = createItem('sizepicker', sizeContainer, () => this.setSize(size));
      sizeItem.style.width = sizeItem.style.height = `${size}px`;
    });

    this.updateButton();
  }

  setBackground = fill => this.eraser.setFill(fill);

  setBrush(brush) {
    if (brush !== this.eraser) {
      this.previousBrush = brush;
    }
    this.currentBrush = brush;
    storeJson('brushNumber', this.brushes.indexOf(brush));
    this.updateButton();
  }

  setSize(size) {
    Brush.setSize(size);
    this.currentBrush = this.previousBrush;
    storeJson('brushSize', size);
    this.updateButton();
  }

  setColor(color) {
    Brush.setColor(color);
    this.currentBrush = this.previousBrush;
    storeJson('brushColor', color);
    this.updateButton();
  }

  updateButton() {
    const size = Math.min(32, Math.max(8, Brush.size));
    this.menuButton.innerHTML = this.currentBrush.getImage(size, Brush.color);
  }

  startDraw = coords => this.currentBrush.startDraw(coords);
  draw = coords => this.currentBrush.draw(coords);
  stopDraw = () => this.currentBrush.stopDraw();
}
