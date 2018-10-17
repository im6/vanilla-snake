import {
  BOX_SIZE,
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

// =============== export function below ==================

const drawSnake = (ctx, snake) => {
  snake.forEach((v, k) => {
    drawBox(ctx, v, getSnakeBoxColor(k))
  });
};

const drawFood = (ctx, food) => {
  drawBox(ctx, food, FOOD_COLOR);
};

export default {
  drawSnake,
  drawFood,
}