import {
  detectCollision,
  drawSnake,
  drawFood,
  checkHitWall,
  createNewFood,
  checkHeadHitBody,
} from './service';

describe('service util testing', () => {
  test('detectCollision', () => {
    const a1 = { x: 1, y: 2 };
    const a2 = { x: 1, y: 2 };
    expect(detectCollision(a1, a2)).toBeTruthy();
  });
  test('drawFood', () => {
    const fillRect = jest.fn();
    drawFood(
      {
        fillRect,
      },
      { x: 1, y: 1 }
    );
    expect(fillRect).toBeCalled();
  });
  test('drawSnake', () => {
    const fillRect = jest.fn();
    const snake = [
      { x: 1, y: 1 },
      { x: 2, y: 1 },
    ];
    drawSnake(
      {
        fillRect,
      },
      snake
    );
    expect(fillRect).toBeCalledTimes(snake.length);
  });
  test('checkHitWall', () => {
    expect(checkHitWall({ x: 1, y: 1 })).toBeFalsy();
  });
  test('createNewFood', () => {
    expect(
      createNewFood([
        { x: 1, y: 2 },
        { x: 2, y: 2 },
      ])
    ).toBeTruthy();
  });
  test('checkHeadHitBody', () => {
    expect(
      checkHeadHitBody({ x: 0, y: 1 }, [
        { x: 1, y: 1 },
        { x: 2, y: 1 },
        { x: 3, y: 1 },
        { x: 4, y: 1 },
      ])
    ).toBeFalsy();
  });
  test('checkHeadHitBody - hit', () => {
    expect(
      checkHeadHitBody({ x: 4, y: 1 }, [
        { x: 1, y: 1 },
        { x: 2, y: 1 },
        { x: 3, y: 1 },
        { x: 4, y: 1 },
      ])
    ).toBeTruthy();
  });
});
