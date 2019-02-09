import Snake from './Snake';
import service from '../service.js';
import {
  BOX_SIZE,
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  CANVAS_DOM_ID,
  SNAKE_HEAD_COLOR,
  DIRECTIONS,
} from '../constant';

const canvas_width = CANVAS_WIDTH * BOX_SIZE,
  canvas_height = CANVAS_HEIGHT * BOX_SIZE,
  startBtnElem = document.getElementById('gameStartBtn'),
  scoreElem = document.getElementById('scoreText');

class SnakeApp{
  constructor() {
    const self = this;
    self.initCanvas();
    self.addAppListener();

    self.snake = null;
    self.food = null;
    self.gameOver = true;
  }

  initCanvas(){
    const self = this;
    const canvasElem = document.getElementById(CANVAS_DOM_ID);
    canvasElem.width = canvas_width;
    canvasElem.height = canvas_height;

    self.ctx = canvasElem.getContext('2d');
    self.ctx.fillStyle = '#f5f5f5';
    self.ctx.fillRect(0, 0, canvas_width, canvas_height);
  }

  addAppListener(){
    const self = this;
    document.addEventListener("keydown", e => {
      const { keyCode } = e;
      if(keyCode in DIRECTIONS && !self.gameOver){
        self.snake.changeDirection(DIRECTIONS[keyCode]);
      }
    });

    startBtnElem.addEventListener('click', e => {
      self.resetGame();
    });
  }

  showGameOver(reason){
    const self = this;
    //self.ctx.clearRect(0, 0, canvas_width, canvas_height);
    self.ctx.font = "30px Play";
    self.ctx.fillStyle = SNAKE_HEAD_COLOR;
    self.ctx.fillText(`You hit ${reason}, game over.`,10,50);
  }

  detectNext(){
    const self = this;
    let res = null;
    if(service.detectCollision(self.snake.nextHead, self.food)){
      self.snake.eat();
      self.food = service.createNewFood(self.snake.location);
      scoreElem.innerText = self.snake.score;
    } else if(service.checkHitWall(self.snake.nextHead)){
      res = 'wall';
    } else if(service.checkHeadHitBody(self.snake.nextHead, self.snake.location)){
      res = 'body';
    }

    return res;
  }

  render(){
    const self = this;
    if(self.gameOver){
      return;
    }

    const detectResult = self.detectNext();
    if(detectResult){
      self.gameOver = true;
      self.showGameOver(detectResult);
      return;
    }

    self.ctx.clearRect(0, 0, canvas_width, canvas_height);
    self.snake.move();
    service.drawSnake(self.ctx, self.snake.location);
    service.drawFood(self.ctx, self.food);
  }

  resetGame(){
    const self = this;
    self.snake = new Snake();
    scoreElem.innerText = 0;
    // food need create after snake initialized, for not conflict purpose
    self.food = service.createNewFood(self.snake.location);
    self.gameOver = false;
  }
}

export default SnakeApp;