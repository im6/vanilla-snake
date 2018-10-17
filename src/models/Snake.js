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
      x: me.location[0].x + 1 * me.direction.x,
      y: me.location[0].y + 1 * me.direction.y,
    };

    me.previousDirection = me.direction;

    me.location.unshift(nextBox);
  }
  isHitBody(){
    const me = this;
    let isHit = false;
    let head = me.location[0];
    for(let i = 4; i < me.location.length; i ++){
      if(service.detectCollision(head, me.location[i])){
        isHit = true;
      }
    }
    return isHit;
  }

  detect(food, callback){
    const me = this;
    const head = me.location[0];
    if(service.detectCollision(head, food)){
      callback('food');
    } else if(service.checkHitWall(head)){
      callback('wall');
    } else if(me.isHitBody()){
      callback('body');
    }

  }
}

export default Snake;