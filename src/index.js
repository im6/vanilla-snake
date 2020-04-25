import './style.scss';
import SnakeApp from './models/App';
import { GAME_INTERVAL, CANVAS_DOM_ID } from './constant';

const app = new SnakeApp({
  startBtnElem: document.getElementById('gameStartBtn'),
  scoreElem: document.getElementById('scoreText'),
  canvasElem: document.getElementById(CANVAS_DOM_ID),
});
setInterval(app.render.bind(app), GAME_INTERVAL);
