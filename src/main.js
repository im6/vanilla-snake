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
  canvas_height = CANVAS_HEIGHT * BOX_SIZE,
  scoreElem = document.getElementById('scoreText'),
  startBtnElem = document.getElementById('gameStartBtn');

class SnakeApp{
  constructor() {
    const me = this;
    me.initCanvas();
    me.addKeyboardListener();

    me.score = null;
    me.snake = new Snake();
    me.food = {
      x: 0,
      y: 6,
    };
    //me.food = me.createNewFood(me.snake.location);
    me.gameOver = true;
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
  updateScore(newScore){
    const me = this;
    me.score = newScore;
    scoreElem.innerText = newScore - SNAKE_INIT_LENGTH;
  }

  showGameOver(reason){
    const me = this;
    me.ctx.font = "30px Play";
    me.ctx.fillText(`You hit ${reason}, game over.`,10,50);
  }

  render(){
    const me = this;
    if(me.gameOver){
      return;
    }
    me.ctx.clearRect(0, 0, canvas_width, canvas_height);
    me.snake.move(me.score);
    me.snake.detect(me.food, target => {
      if(target === 'food'){
        me.updateScore(me.score + 1);
        me.food = me.createNewFood(me.snake.location);
      } else if(target === 'wall'){
        me.gameOver = true;
        me.showGameOver(target);
      } else if(target === 'body'){
        me.gameOver = true;
        me.showGameOver(target);
      }
    });
    service.drawSnake(me.ctx, me.snake.location);
    service.drawFood(me.ctx, me.food);
  }
  resetGame(){
    const me = this;
    me.updateScore(SNAKE_INIT_LENGTH);
    me.snake = new Snake();
    me.gameOver = false;
  }
}

const app = new SnakeApp();
startBtnElem.addEventListener('click', e => {
  app.resetGame();
});
setInterval(app.render.bind(app), 300);
