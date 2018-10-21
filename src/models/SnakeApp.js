import Snake from './Snake';
import service from '../service.js';
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
} from '../constant';

const canvas_width = CANVAS_WIDTH * BOX_SIZE,
  canvas_height = CANVAS_HEIGHT * BOX_SIZE,
  scoreElem = document.getElementById('scoreText');

class SnakeApp{
  constructor() {
    const me = this;
    me.initCanvas();
    me.addKeyboardListener();

    Object.assign(me, {
      score: null,
      snake: null,
      food: null,
      gameOver: true,
    });
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
      if(keyCode in DIRECTIONS && !me.gameOver){
        me.snake.changeDirection(DIRECTIONS[keyCode]);
      }
    });
  }

  updateScore(newScore){
    const me = this;
    me.score = newScore;
    scoreElem.innerText = newScore - SNAKE_INIT_LENGTH;
  }

  showGameOver(reason){
    const me = this;
    me.ctx.clearRect(0, 0, canvas_width, canvas_height);
    me.ctx.font = "30px Play";
    me.ctx.fillStyle = SNAKE_HEAD_COLOR;
    me.ctx.fillText(`You hit ${reason}, game over.`,10,50);
  }

  onSnakeEatCheck(target){
    const me = this;
    if(target === 'food'){
      me.updateScore(me.score + 1);
      me.food = service.createNewFood(me.snake.location);
    } else if(target === 'wall'){
      me.gameOver = true;
      me.showGameOver(target);
    } else if(target === 'body'){
      me.gameOver = true;
      me.showGameOver(target);
    }
  }

  render(){
    const me = this;
    if(me.gameOver){
      return;
    }
    me.ctx.clearRect(0, 0, canvas_width, canvas_height);
    me.snake.move(me.score);
    me.snake.eat(me.food, me.onSnakeEatCheck.bind(me));
    service.drawSnake(me.ctx, me.snake.location);
    service.drawFood(me.ctx, me.food);
  }

  resetGame(){
    const me = this;
    me.updateScore(SNAKE_INIT_LENGTH);
    me.snake = new Snake();

    // food need create after snake initialized
    me.food = service.createNewFood(me.snake.location);

    me.gameOver = false;
  }
}

export default SnakeApp;