import {
  INIT_DIRECTION,
  SNAKE_INIT_LENGTH,
} from '../constant.js';
import service from '../service.js';

class Snake {
  constructor() {
    const me = this;
    me.direction = INIT_DIRECTION;
    me._score = 0;
    me.location = [];
    for(let i = SNAKE_INIT_LENGTH; i > 0; i--){
      me.location.push({
        x: 0,
        y: i,
      });
    }
  }

  get head() {
    return this.location[0];
  }

  get score(){
    return this._score;
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
    if (me._score + SNAKE_INIT_LENGTH === me.location.length) {
      me.location.pop();
    }

    const nextBox = {
      x: me.head.x + me.direction.x,
      y: me.head.y + me.direction.y,
    };

    me.previousDirection = me.direction;
    me.location.unshift(nextBox);
  }

  eat(){
    const me = this;
    me._score += 1;
  }
}

export default Snake;