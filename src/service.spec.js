import { detectCollision } from './service';

describe('detectCollision testing', () => {
  test('case 1', () => {
    const a1 = { x: 1, y: 2 };
    const a2 = { x: 1, y: 2 };
    expect(detectCollision(a1, a2)).toBeTruthy();
  });
});
