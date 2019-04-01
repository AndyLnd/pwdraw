// Import stylesheets
import './style.scss';
import { on, getCoordsfromEvent, getTime } from './util';
import { createTexture } from './paperTexture';
import { load, store, loadJson, storeJson } from './storage';
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

const brushes = [new LineBrush(drawingContext), new SplatBrush(drawingContext), new DripBrush(drawingContext)];
const eraser = new EraserBrush(drawingContext);

const colors = [
  'hsl(50, 100%, 99%)',
  'hsl(48, 100%, 50%)',
  'hsl(84, 82%, 35%)',
  'hsl(216, 100%, 52%)',
  'hsl(278, 93%, 40%)',
  'hsl(353, 73%, 50%)',
  'hsl(90, 73%, 5%)',
];

const sizes = [40, 20, 10];

let currentBrush = brushes[loadJson('brushNumber')] || eraser;
Brush.setColor(loadJson('brushColor') || colors[1]);
Brush.setSize(loadJson('brushSize') || sizes[0]);

drawingBoard.width = window.innerWidth;
drawingBoard.height = window.innerHeight;

on(drawingBoard, 'mousedown touchstart', startDraw);
on(drawingBoard, 'mousemove touchmove', draw);
on(drawingBoard, 'mouseup mouseleave touchend touchleave', stopDraw);
on(menuButton, 'click', () => menu.classList.toggle('active'));
on(clearButton, 'click', () => clear());
on(saveButton, 'click', save);
on(eraseButton, 'click', () => setBrush(eraser));

function updateButton() {
  const size = Math.min(32, Math.max(8, Brush.size));
  menuButton.innerHTML = currentBrush.getImage(size, Brush.color);
}

function clear(restore = false) {
  const paperPattern = createTexture(1024, restore);
  eraser.setFill(paperPattern);
  drawingContext.fillStyle = paperPattern;
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
  store('image', drawingBoard.toDataURL());
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
});

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
});

function setBrush(brush) {
  currentBrush = brush;
  storeJson('brushNumber', brushes.indexOf(brush));
  updateButton();
}

function setSize(size) {
  Brush.setSize(size);
  storeJson('brushSize', size);
  updateButton();
}

function setColor(color) {
  Brush.setColor(color);
  storeJson('brushColor', color);
  updateButton();
}

clear(true);
const loadedImage = load('image');
if (loadedImage) {
  const img = new Image();
  img.onload = () => drawingContext.drawImage(img, 0, 0);
  img.src = loadedImage;
}

updateButton();
