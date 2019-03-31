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

const brushes = [new LineBrush(drawingContext), new SplatBrush(drawingContext), new DripBrush(drawingContext)];
const eraser = new EraserBrush(drawingContext);

const store = (key, value) => localStorage.setItem(key, value);
const load = (name, fallback) => (localStorage.getItem(name) !== null ? localStorage.getItem(name) : fallback);

const colors = [
  'hsl(50, 100%, 99%)',
  'hsl(48, 100%, 50%)',
  'hsl(84, 82%, 35%)',
  'hsl(216, 100%, 52%)',
  'hsl(278, 93%, 40%)',
  'hsl(353, 73%, 50%)',
  'hsl(90, 73%, 5%)',
];

function createPaper(size = 1024, data = {}) {
  const can = document.createElement('canvas');
  can.width = can.height = size;
  const ctx = can.getContext('2d');
  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, size, size);
  console.log(data.hue);
  const hue = data.hue || Math.floor(Math.random() * 360);
  ctx.fillStyle = `hsl(${hue}, 100%, 80%)`;
  ctx.globalAlpha = 0.01;
  const circle = (x, y, r) => {
    ctx.beginPath();
    ctx.arc(x * size, y * size, r, 0, Math.PI * 2);
    ctx.fill();
  };
  const points =
    data.points ||
    Array.from({ length: 150 }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: Math.random() ** 2 * (size / 4),
    }));
  points.forEach(({ x, y, r }) => {
    circle(x - 1, y - 1, r);
    circle(x, y - 1, r);
    circle(x + 1, y - 1, r);
    circle(x - 1, y, r);
    circle(x, y, r);
    circle(x + 1, y, r);
    circle(x - 1, y + 1, r);
    circle(x, y + 1, r);
    circle(x + 1, y + 1, r);
  });
  store('paperPattern', JSON.stringify({ hue, points }));
  return can;
}

const sizes = [40, 20, 10];

let currentBrush = brushes[load('brushNumber', 1)] || eraser;
Brush.setColor(load('brushColor', colors[1]));
Brush.setSize(load('brushSize', sizes[0]));

drawingBoard.width = window.innerWidth;
drawingBoard.height = window.innerHeight;

on(drawingBoard, 'mousedown touchstart', startDraw);
on(drawingBoard, 'mousemove touchmove', draw);
on(drawingBoard, 'mouseup mouseleave touchend touchleave', stopDraw);
on(menuButton, 'click', () => menu.classList.toggle('active'));
on(clearButton, 'click', () => clear(true));
on(saveButton, 'click', save);
on(eraseButton, 'click', () => setBrush(eraser));

function updateButton() {
  const size = Math.min(32, Math.max(8, Brush.size));
  menuButton.innerHTML = currentBrush.getImage(size, Brush.color);
}

function clear(doNewPattern = false) {
  const paper = doNewPattern ? createPaper() : createPaper(1024, JSON.parse(load('paperPattern', '{}')));
  const paperPattern = drawingContext.createPattern(paper, 'repeat');
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
  store('brushNumber', brushes.indexOf(brush));
  updateButton();
}

function setSize(size) {
  Brush.setSize(size);
  store('brushSize', size);
  updateButton();
}

function setColor(color) {
  Brush.setColor(color);
  store('brushColor', color);
  updateButton();
}

clear();
const loadedImage = load('image');
if (loadedImage) {
  const img = new Image();
  img.onload = () => drawingContext.drawImage(img, 0, 0);
  img.src = loadedImage;
}

updateButton();
