import {
  INIT_DIRECTION,
  SNAKE_INIT_LENGTH,
} from '../constant.js';
import service from '../service.js';

class Snake {
  constructor() {
    const me = this;
    me.direction = INIT_DIRECTION;
    me.previousDirection = null;
    me._score = SNAKE_INIT_LENGTH;
    me.location = [];
    for(let i = SNAKE_INIT_LENGTH; i > 0; i--){
      me.location.push({
        x: 0,
        y: i,
      });
    }
  }

  get nextHead() {
    const me = this;
    const head = me.location[0];
    return {
      x: head.x + me.direction.x,
      y: head.y + me.direction.y,
    }
  }

  get score(){
    return this._score - SNAKE_INIT_LENGTH;
  }

  changeDirection(newDir){
    const me = this;
    if(me.previousDirection.x === newDir.x * -1 ||
      me.previousDirection.y === newDir.y * -1
    ) {
      return;
    }

    me.direction = newDir;
  }
  
  move() {
    const me = this;
    if (me._score === me.location.length) {
      me.location.pop();
    }

    me.previousDirection = me.direction;
    me.location.unshift(me.nextHead);
  }

  eat(){
    const me = this;
    me._score += 1;
  }
}

export default Snake;