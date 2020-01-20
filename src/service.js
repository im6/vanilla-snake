import {
  BOX_SIZE,
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  SNAKE_HEAD_COLOR,
  SNAKE_BODY_COLOR,
  FOOD_COLOR,
} from './constant';

const drawBox = (ctx, point, color) => {
  ctx.fillStyle = color;
  ctx.fillRect(point.x * BOX_SIZE, point.y * BOX_SIZE, BOX_SIZE, BOX_SIZE);
};

const getSnakeBoxColor = idx =>
  idx === 0 ? SNAKE_HEAD_COLOR : SNAKE_BODY_COLOR;

const getRandomNumber = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

export const drawSnake = (ctx, snake) => {
  snake.forEach((v, k) => {
    drawBox(ctx, v, getSnakeBoxColor(k));
  });
};

export const drawFood = (ctx, food) => {
  drawBox(ctx, food, FOOD_COLOR);
};

export const detectCollision = (n1, n2) => n1.x === n2.x && n1.y === n2.y;

export const isEmptyCell = (point, snake) =>
  !snake.some(v => detectCollision(v, point));

export const checkHitWall = point =>
  point.x >= CANVAS_WIDTH ||
  point.x < 0 ||
  point.y >= CANVAS_HEIGHT ||
  point.y < 0;

export const createNewFood = snake => {
  const position = {
    x: getRandomNumber(0, CANVAS_WIDTH - 1),
    y: getRandomNumber(0, CANVAS_HEIGHT - 1),
  };
  return isEmptyCell(position, snake) ? position : createNewFood(snake);
};

export const checkHeadHitBody = (head, body) => {
  let willHit = false;
  for (let i = 3; i < body.length; i += 1) {
    // head cannot hit index in [0,1,2]
    if (detectCollision(head, body[i])) {
      willHit = true;
    }
  }
  return willHit;
};
