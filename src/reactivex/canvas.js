import {
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
} from '../constant';

const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const isEmptyCell = (cell, snake) => {
  return snake.some(s => checkCollision(cell, s));
}



export const checkCollision = (a, b) => {
  return a.x === b.x && a.y === b.y;
}

export const getRandomPosition = snake => {
  const position = {
    x: getRandomNumber(0, CANVAS_WIDTH - 1),
    y: getRandomNumber(0, CANVAS_HEIGHT - 1)
  };

  if (isEmptyCell(position, snake)) {
    return position;
  }

  return getRandomPosition(snake);
}