import Snake from '../Snake';
import {
  checkHitWall,
  checkHeadHitBody,
  createNewFood,
  detectCollision,
  drawSnake,
  drawFood,
} from '../../service';
import {
  BOX_SIZE,
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  SNAKE_HEAD_COLOR,
  DIRECTIONS,
} from '../../constant';

const canvasWidth = CANVAS_WIDTH * BOX_SIZE;
const canvasHeight = CANVAS_HEIGHT * BOX_SIZE;

const appKey = Symbol('singleton');
const singleton = {};

class SnakeApp {
  constructor({ startBtnElem, scoreElem, canvasElem }) {
    if (appKey in singleton) {
      return singleton[appKey];
    }

    this.startBtnElem = startBtnElem;
    this.scoreElem = scoreElem;

    this.initCanvas(canvasElem);
    this.addAppListener();

    this.snake = null;
    this.food = null;
    this.gameOver = true;
    singleton[appKey] = this;
  }

  initCanvas(canvasElem) {
    // eslint-disable-next-line no-param-reassign
    canvasElem.width = canvasWidth;
    // eslint-disable-next-line no-param-reassign
    canvasElem.height = canvasHeight;

    this.ctx = canvasElem.getContext('2d');
    this.ctx.fillStyle = '#f5f5f5';
    this.ctx.fillRect(0, 0, canvasWidth, canvasHeight);
  }

  addAppListener() {
    document.addEventListener('keydown', e => {
      const { keyCode } = e;
      if (keyCode in DIRECTIONS && !this.gameOver) {
        this.snake.changeDirection(DIRECTIONS[keyCode]);
      }
    });
    if (this.startBtnElem) {
      this.startBtnElem.addEventListener('click', () => {
        this.resetGame();
      });
    }
  }

  showGameOver(reason) {
    // this.ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    this.ctx.font = '30px Play';
    this.ctx.fillStyle = SNAKE_HEAD_COLOR;
    this.ctx.fillText(`You hit ${reason}, game over.`, 10, 50);
  }

  detectNext() {
    let res = null;
    if (detectCollision(this.snake.nextHead, this.food)) {
      this.snake.eat();
      this.food = createNewFood(this.snake.location);
      this.scoreElem.innerText = this.snake.score;
    } else if (checkHitWall(this.snake.nextHead)) {
      res = 'wall';
    } else if (checkHeadHitBody(this.snake.nextHead, this.snake.location)) {
      res = 'body';
    }
    return res;
  }

  render() {
    if (this.gameOver) {
      return;
    }

    const detectResult = this.detectNext();
    if (detectResult) {
      this.gameOver = true;
      this.showGameOver(detectResult);
      return;
    }

    this.ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    this.snake.move();
    drawSnake(this.ctx, this.snake.location);
    drawFood(this.ctx, this.food);
  }

  resetGame() {
    this.snake = new Snake();
    this.scoreElem.innerText = 0;
    // food need create after snake initialized, for not conflict purpose
    this.food = createNewFood(this.snake.location);
    this.gameOver = false;
  }
}

export default SnakeApp;
