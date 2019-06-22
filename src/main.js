import './style.scss';
import SnakeApp from './models/App';
import { GAME_INTERVAL } from './constant';

const app = new SnakeApp();
setInterval(app.render.bind(app), GAME_INTERVAL);
