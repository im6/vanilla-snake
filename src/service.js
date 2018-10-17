import {
  BOX_SIZE,
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  SNAKE_HEAD_COLOR,
  SNAKE_BODY_COLOR,
  FOOD_COLOR,
} from './constant.js'

// =============== private scope function ================

const drawBox = (ctx, point, color) => {
  ctx.fillStyle = color;
  ctx.fillRect(point.x * BOX_SIZE, point.y * BOX_SIZE, BOX_SIZE, BOX_SIZE);
};

const getSnakeBoxColor = idx => {
  return idx === 0 ? SNAKE_HEAD_COLOR : SNAKE_BODY_COLOR;
};

const isEmptyCell = (point, snake) => {
  return !snake.some(v => detectCollision(v, point));
};

const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};



// =============== export function below ==================

const drawSnake = (ctx, snake) => {
  snake.forEach((v, k) => {
    drawBox(ctx, v, getSnakeBoxColor(k))
  });
};

const drawFood = (ctx, food) => {
  drawBox(ctx, food, FOOD_COLOR);
};

const detectCollision = (n1, n2) => {
  return n1.x === n2.x && n1.y === n2.y;
};

const getRandomPosition = (snake) => {
  const position = {
    x: getRandomNumber(0, CANVAS_WIDTH - 1),
    y: getRandomNumber(0, CANVAS_HEIGHT - 1),
  };
  console.log(position);
  return isEmptyCell(position, snake) ? position : getRandomPosition(snake);
};

export default {
  drawSnake,
  drawFood,
  detectCollision,
  getRandomPosition,
}