// Import stylesheets
import './style.scss';
import { on, getCoordsfromEvent, getTime } from './util';
import Brush from './brush';
import LineBrush from './linebrush';
import SplatBrush from './splatbrush';
import DripBrush from './dripbrush';
import EraserBrush from './eraserbrush';

const drawingBoard = document.querySelector('#drawingboard');
const menu = document.querySelector('#menu');
const menuButton = document.querySelector('#menubutton');
const clearButton = document.querySelector('#clear');
const saveButton = document.querySelector('#save');
const eraseButton = document.querySelector('#erase');

const drawingContext = drawingBoard.getContext('2d');

const brushes = [
  new LineBrush(drawingContext),
  new SplatBrush(drawingContext),
  new DripBrush(drawingContext),
];

const eraser = new EraserBrush(drawingContext);

const colors = [
  '#666547',
  '#fb2e01',
  '#6fcb9f',
  '#ffe28a',
  '#fffeb3',
];

const sizes = [40, 20, 10];

let currentBrush = brushes[1];
Brush.setColor(colors[1]);
Brush.setSize(sizes[0]);

drawingBoard.width = window.innerWidth;
drawingBoard.height = window.innerHeight;

on(drawingBoard, 'mousedown touchstart', startDraw);
on(drawingBoard, 'mousemove touchmove', draw);
on(drawingBoard, 'mouseup mouseleave touchend touchleave', stopDraw);
on(menuButton, 'click', () => menu.classList.toggle('active'));
on(clearButton, 'click', clear);
on(saveButton, 'click', save);
on(eraseButton, 'click', () => setBrush(eraser));

function updateButton() {
  const size = Math.min(32, Math.max(8, Brush.size));
  menuButton.innerHTML = currentBrush.getImage(size, Brush.color);
}

function clear() {
  drawingContext.fillStyle = '#fff';
  drawingContext.fillRect(0, 0, drawingBoard.width, drawingBoard.height);
}

function save() {
  saveButton.href = drawingBoard.toDataURL();
  saveButton.download = `doodle-${getTime()}.png`;
}

function startDraw(e) {
  const coords = getCoordsfromEvent(e);
  currentBrush.startDraw(coords);
  menu.classList.remove('active');
  e.preventDefault();
}

function stopDraw(e) {
  currentBrush.stopDraw();
  e.preventDefault();
}

function draw(e) {
  const coords = getCoordsfromEvent(e);
  currentBrush.draw(coords);
  e.preventDefault();
}

colors.forEach(color => {
  const colorPicker = document.createElement('div');
  colorPicker.className = 'colorpicker';
  colorPicker.style.backgroundColor = color;
  on(colorPicker, 'click', () => setColor(color));
  document.querySelector('#colorcontainer').appendChild(colorPicker);
})

brushes.forEach(brush => {
  const brushPicker = document.createElement('div');
  brushPicker.className = 'brushpicker';
  brushPicker.innerHTML = brush.getImage();
  on(brushPicker, 'click', () => setBrush(brush));
  document.querySelector('#brushcontainer').appendChild(brushPicker);
});

sizes.forEach(size => {
  const sizePicker = document.createElement('div');
  sizePicker.className = 'sizepicker';
  sizePicker.style.width = sizePicker.style.height = `${size}px`;
  on(sizePicker, 'click', () => setSize(size));
  document.querySelector('#sizecontainer').appendChild(sizePicker);
})

function setBrush(brush) {
  currentBrush = brush;
  updateButton();
}

function setSize(size) {
  Brush.setSize(size);
  updateButton();
}

function setColor(color) {
  Brush.setColor(color);
  updateButton();
}

updateButton();
clear();
