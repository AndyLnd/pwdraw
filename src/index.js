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
import { BrushManager } from './brushmanager';

const drawingBoard = document.querySelector('#drawingboard');
const menu = document.querySelector('#menu');
const menuButton = document.querySelector('#menubutton');
const clearButton = document.querySelector('#clear');
const saveButton = document.querySelector('#save');

const drawingContext = drawingBoard.getContext('2d');

const brush = new BrushManager({
  context: drawingContext,
  eraser: EraserBrush,
  colors: [
    'hsl(50, 100%, 99%)',
    'hsl(48, 100%, 50%)',
    'hsl(84, 82%, 35%)',
    'hsl(216, 100%, 52%)',
    'hsl(278, 93%, 40%)',
    'hsl(353, 73%, 50%)',
    'hsl(90, 73%, 5%)',
  ],
  sizes: [40, 20, 10],
  brushes: [LineBrush, SplatBrush, DripBrush],
  colorContainer: document.getElementById('colorcontainer'),
  sizeContainer: document.getElementById('sizecontainer'),
  brushContainer: document.getElementById('brushcontainer'),
  menuButton: document.getElementById('menubutton'),
});

drawingBoard.width = window.innerWidth;
drawingBoard.height = window.innerHeight;

on(drawingBoard, 'mousedown touchstart', startDraw);
on(drawingBoard, 'mousemove touchmove', draw);
on(drawingBoard, 'mouseup mouseleave touchend touchleave', stopDraw);
on(menuButton, 'click', () => menu.classList.toggle('active'));
on(clearButton, 'click', () => clear());
on(saveButton, 'click', save);

function clear(restore = false) {
  const paperPattern = createTexture(1024, restore);
  brush.setBackground(paperPattern);
  drawingContext.fillStyle = paperPattern;
  drawingContext.fillRect(0, 0, drawingBoard.width, drawingBoard.height);
}

function save() {
  saveButton.href = drawingBoard.toDataURL();
  saveButton.download = `doodle-${getTime()}.png`;
}

function startDraw(e) {
  const coords = getCoordsfromEvent(e);
  brush.startDraw(coords);
  menu.classList.remove('active');
  e.preventDefault();
}

function stopDraw(e) {
  brush.stopDraw();
  store('image', drawingBoard.toDataURL());
  e.preventDefault();
}

function draw(e) {
  const coords = getCoordsfromEvent(e);
  brush.draw(coords);
  e.preventDefault();
}

clear(true);
const loadedImage = load('image');
if (loadedImage) {
  const img = new Image();
  img.onload = () => drawingContext.drawImage(img, 0, 0);
  img.src = loadedImage;
}
