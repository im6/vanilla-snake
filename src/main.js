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


const canvas_width = CANVAS_WIDTH * BOX_SIZE,
  canvas_height = CANVAS_HEIGHT * BOX_SIZE;

class SnakeApp{
  constructor() {
    const me = this;
    me.initCanvas();
    me.addKeyboardListener();

    me.score = SNAKE_INIT_LENGTH;
    me.snake = new Snake();
    me.food = {
      x: 0,
      y: 6,
    };
    //me.food = me.createNewFood(me.snake.location);

    me.render();
  }

  initCanvas(){
    const me = this;
    const canvasElem = document.getElementById(CANVAS_DOM_ID);
    canvasElem.width = canvas_width;
    canvasElem.height = canvas_height;

    me.ctx = canvasElem.getContext('2d');
    me.ctx.fillStyle = '#f5f5f5';
    me.ctx.fillRect(0, 0, canvas_width, canvas_height);
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
  createNewFood(snakeLocation){
    const me = this;
    return service.getRandomPosition(snakeLocation);
  }

  render(){
    const me = this;
    me.ctx.clearRect(0, 0, canvas_width, canvas_height);
    me.snake.move(me.score);
    me.snake.eat(me.food, () => {
      me.score += 1;
      me.food = me.createNewFood(me.snake.location)
    });
    service.drawSnake(me.ctx, me.snake.location);
    service.drawFood(me.ctx, me.food);
  }
}

const app = new SnakeApp();
setInterval(app.render.bind(app), 1000);
