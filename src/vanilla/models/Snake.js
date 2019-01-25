import {
  INIT_DIRECTION,
  SNAKE_INIT_LENGTH,
} from '../../constant.js';

class Snake {
  constructor() {
    const self = this;
    self.direction = INIT_DIRECTION;
    self.previousDirection = null;
    self._score = SNAKE_INIT_LENGTH;
    self.location = [];
    for(let i = SNAKE_INIT_LENGTH; i > 0; i--){
      self.location.push({
        x: 0,
        y: i,
      });
    }
  }

  get nextHead() {
    const self = this;
    const head = self.location[0];
    return {
      x: head.x + self.direction.x,
      y: head.y + self.direction.y,
    }
  }

  get score(){
    return this._score - SNAKE_INIT_LENGTH;
  }

  changeDirection(newDir){
    const self = this;
    if(self.previousDirection.x === newDir.x * -1 ||
      self.previousDirection.y === newDir.y * -1
    ) {
      return;
    }

    self.direction = newDir;
  }
  
  move() {
    const self = this;
    if (self._score === self.location.length) {
      self.location.pop();
    }

    self.previousDirection = self.direction;
    self.location.unshift(self.nextHead);
  }

  eat(){
    const self = this;
    self._score += 1;
  }
}

export default Snake;