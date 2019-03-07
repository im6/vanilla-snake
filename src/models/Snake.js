/* eslint no-underscore-dangle: "off" */
import {
  INIT_DIRECTION,
  SNAKE_INIT_LENGTH,
} from '../constant';

class Snake {
  constructor() {
    this.direction = INIT_DIRECTION;
    this.previousDirection = null;
    this._score = SNAKE_INIT_LENGTH;
    this.location = [];
    for (let i = SNAKE_INIT_LENGTH; i > 0; i -= 1) {
      this.location.push({
        x: 0,
        y: i,
      });
    }
  }

  get nextHead() {
    const head = this.location[0];
    return {
      x: head.x + this.direction.x,
      y: head.y + this.direction.y,
    };
  }

  get score() {
    return this._score - SNAKE_INIT_LENGTH;
  }

  changeDirection(newDir) {
    if (this.previousDirection.x === newDir.x * -1 || this.previousDirection.y === newDir.y * -1
    ) {
      return;
    }
    this.direction = newDir;
  }

  move() {
    if (this._score === this.location.length) {
      this.location.pop();
    }

    this.previousDirection = this.direction;
    this.location.unshift(this.nextHead);
  }

  eat() {
    this._score += 1;
  }
}

export default Snake;
