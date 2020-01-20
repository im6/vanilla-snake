import Snake from '.';

let mySnake = null;
beforeAll(() => {
  mySnake = new Snake();
});

describe('Snake behavior', () => {
  test('instantiation', () => {
    expect(mySnake.direction).toEqual({
      x: 1,
      y: 0,
    });
  });
  test('get score', () => {
    expect(mySnake.score).toEqual(0);
  });
  test('get head location', () => {
    expect(mySnake.nextHead).toEqual({ x: 1, y: 3 });
  });
  test('eat', () => {
    mySnake.eat();
    expect(mySnake.score).toEqual(1);
  });
  test('move', () => {
    mySnake.move();
    mySnake.move();
    expect(mySnake.nextHead).toEqual({ x: 3, y: 3 });
  });
  test('changeDirection', () => {
    mySnake.changeDirection({
      x: 0,
      y: -1,
    });
    expect(mySnake.nextHead).toEqual({ x: 2, y: 2 });
  });
  test('changeDirection with bad direction', () => {
    mySnake.changeDirection({
      x: 1,
      y: 0,
    });
    expect(mySnake.nextHead).toEqual({ x: 2, y: 2 });
  });
});
