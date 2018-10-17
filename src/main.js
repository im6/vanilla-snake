import './style.scss';
import Snake from './models/Snake';
import service from './service.js';
import {
  BOX_SIZE,
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  CANVAS_DOM_ID,
  SNAKE_INIT_LENGTH,
  SNAKE_HEAD_COLOR,
  SNAKE_BODY_COLOR,
  DIRECTIONS,
  INIT_DIRECTION,
  FOOD_COLOR,
} from './constant';


class SnakeApp{
  constructor() {
    const me = this;
    me.initCanvas();
    me.addKeyboardListener();

    me.score = SNAKE_INIT_LENGTH;
    me.snake = new Snake();
    me.food = {
      x: 10,
      y: 10,
    };

    me.render();
  }

  initCanvas(){
    const me = this;
    const canvasElem = document.getElementById(CANVAS_DOM_ID);
    canvasElem.width = CANVAS_WIDTH;
    canvasElem.height = CANVAS_HEIGHT;

    me.ctx = canvasElem.getContext('2d');
    me.ctx.fillStyle = '#f5f5f5';
    me.ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  }
  addKeyboardListener(){
    const me = this;
    document.addEventListener("keydown", e => {
      const { keyCode } = e;
      if(keyCode in DIRECTIONS){
        me.snake.changeDirection(DIRECTIONS[keyCode]);
      }
    });
  }

  render(){
    const me = this;
    me.ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    me.snake.move(me.score);
    service.drawSnake(me.ctx, me.snake.location);
    service.drawFood(me.ctx, me.food);
  }
}

const app = new SnakeApp();
setInterval(app.render.bind(app), 1000);
