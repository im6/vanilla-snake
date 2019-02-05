import {
  SNAKE_INIT_LENGTH,
 } from '../constant';
import { 
   checkCollision,
   getRandomPosition,
} from './canvas';
 
export const initSnake = () => {
  let snake = [];
  for (let i = SNAKE_INIT_LENGTH; i > 0; i--) {
    // box on index == 0 will be the head
    snake.push({ x: i, y: 0 });
  }
  return snake;
}

export const initApple = () => {
  return getRandomPosition();
}

export const move = (snake, [direction, len]) => {
  let nx = snake[0].x + direction.x;
  let ny = snake[0].y + direction.y;

  let nextHead = {
    x: nx,
    y: ny,
  };
  if(snake.length > len){
    snake.pop()
  }
  snake.unshift(nextHead);
  return snake;
}

export const eat = (apple, snake) => {
  const head = snake[0];
  for(let i = 0; i < apple.length; i ++){
    if(checkCollision(apple[i], head)){
      apple.slice(i, 1);
      return [...apple, getRandomPosition(snake)];
    }
  }
  return apple;
}