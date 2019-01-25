import '../style.scss';
import SnakeApp from './models/SnakeApp';
import { GAME_INTERVAL } from '../constant';

const app = new SnakeApp();
setInterval(app.render.bind(app), GAME_INTERVAL);