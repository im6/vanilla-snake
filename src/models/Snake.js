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
  
  changeDirection(newDir){
    const me = this;
    if(me.previousDirection.x === newDir.x * -1 ||
      me.previousDirection.y === newDir.y * -1
    ) {
      return;
    }

    me.direction = newDir;
  }
  
  move(score) {
    const me = this;
    if (score === me.location.length) {
      me.location.pop();
    }

    const nextBox = {
      x: me.head.x + me.direction.x,
      y: me.head.y + me.direction.y,
    };

    me.previousDirection = me.direction;
    me.location.unshift(nextBox);
  }

  isHitBody(){
    const me = this;
    let isHit = false;
    for(let i = 4; i < me.location.length; i ++) {  // head cannot hit index in [1,2,3]
      if(service.detectCollision(me.head, me.location[i])){
        isHit = true;
      }
    }
    return isHit;
  }

  eat(food, callback){
    const me = this;
    if(service.detectCollision(me.head, food)){
      callback(false);
    } else if(service.checkHitWall(me.head)){
      callback(true, 'wall');
    } else if(me.isHitBody()){
      callback(true, 'body');
    }
  }
}

export default Snake;