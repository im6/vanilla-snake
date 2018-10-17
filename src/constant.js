
export const BOX_SIZE = 20;

export const CANVAS_DOM_ID = 'appCan';
export const CANVAS_WIDTH = 20; // not actual pixel, but number of box width
export const CANVAS_HEIGHT = 20; // same as above


export const SNAKE_INIT_LENGTH = 4;
export const SNAKE_HEAD_COLOR = '#3f72af';
export const SNAKE_BODY_COLOR = '#c7d0d5';

export const FOOD_COLOR = '#ff7148';

export const DIRECTIONS = {
  "65": { x: -1, y: 0 }, // a
  "68": { x: 1, y: 0 },  // d
  "87": { x: 0, y: -1 }, // w
  "83": { x: 0, y: 1 },   // s
};

export const INIT_DIRECTION = DIRECTIONS["83"];