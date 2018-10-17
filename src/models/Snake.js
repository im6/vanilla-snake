import {
  INIT_DIRECTION,
  SNAKE_INIT_LENGTH,
} from '../constant.js';
import service from '../service.js';

class Snake {
  constructor() {
    const me = this;
    me.direction = INIT_DIRECTION;
    me.location = [];
    for(let i = 0; i < SNAKE_INIT_LENGTH; i++){
      me.location.push({
        x: 0,
        y: i,
      });
    }
  }
  
  changeDirection(newDir){
    const me = this;
    me.direction = newDir;
  }
  
  move(score) {
    const me = this;
    if (score === me.location.length) {
      me.location.pop();
    }

    const nextBox = {
      x: me.location[0].x + 1 * me.direction.x,
      y: me.location[0].y + 1 * me.direction.y,
    };
    me.location.unshift(nextBox);
  }

  eat(food, callback){
    const me = this;
    const head = me.location[0];
    if(service.detectCollision(head, food)){
      callback();
    }
  }
}

export default Snake;