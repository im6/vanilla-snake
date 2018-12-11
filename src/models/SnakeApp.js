import Snake from './Snake';
import service from '../service.js';
import {
  BOX_SIZE,
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  CANVAS_DOM_ID,
  SNAKE_HEAD_COLOR,
  SNAKE_BODY_COLOR,
  DIRECTIONS,
  INIT_DIRECTION,
  FOOD_COLOR,
} from '../constant';

const canvas_width = CANVAS_WIDTH * BOX_SIZE,
  canvas_height = CANVAS_HEIGHT * BOX_SIZE,
  startBtnElem = document.getElementById('gameStartBtn'),
  scoreElem = document.getElementById('scoreText');

class SnakeApp{
  constructor() {
    const me = this;
    me.initCanvas();
    me.addAppListener();

    Object.assign(me, {
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

  addAppListener(){
    const me = this;
    document.addEventListener("keydown", e => {
      const { keyCode } = e;
      if(keyCode in DIRECTIONS && !me.gameOver){
        me.snake.changeDirection(DIRECTIONS[keyCode]);
      }
    });

    startBtnElem.addEventListener('click', e => {
      me.resetGame();
    });
  }

  showGameOver(reason){
    const me = this;
    //me.ctx.clearRect(0, 0, canvas_width, canvas_height);
    me.ctx.font = "30px Play";
    me.ctx.fillStyle = SNAKE_HEAD_COLOR;
    me.ctx.fillText(`You hit ${reason}, game over.`,10,50);
  }

  detectNext(){
    const me = this;
    let res = null;
    if(service.detectCollision(me.snake.nextHead, me.food)){
      me.snake.eat();
      me.food = service.createNewFood(me.snake.location);
      scoreElem.innerText = me.snake.score;
    } else if(service.checkHitWall(me.snake.nextHead)){
      res = 'wall';
    } else if(service.checkHeadHitBody(me.snake.nextHead, me.snake.location)){
      res = 'body';
    }

    return res;
  }

  render(){
    const me = this;
    if(me.gameOver){
      return;
    }
    const detectResult = me.detectNext();
    if(detectResult){
      me.gameOver = true;
      me.showGameOver(detectResult);
    } else {
      me.ctx.clearRect(0, 0, canvas_width, canvas_height);
      me.snake.move();
      service.drawSnake(me.ctx, me.snake.location);
      service.drawFood(me.ctx, me.food);
    }
  }

  resetGame(){
    const me = this;
    me.snake = new Snake();
    scoreElem.innerText = 0;
    // food need create after snake initialized, for not conflict purpose
    me.food = service.createNewFood(me.snake.location);
    me.gameOver = false;
  }
}

export default SnakeApp;