import './style.scss';
import SnakeApp from './models/SnakeApp';
import { GAME_INTERVAL } from './constant';

const startBtnElem = document.getElementById('gameStartBtn');
const app = new SnakeApp();
startBtnElem.addEventListener('click', e => {
  app.resetGame();
});

setInterval(app.render.bind(app), GAME_INTERVAL);
