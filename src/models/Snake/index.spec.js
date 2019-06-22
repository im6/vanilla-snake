import Snake from '.';

describe('Snake object', () => {
  test('instantiation', () => {
    const s = new Snake();
    expect(s.direction).toEqual({
      x: 1,
      y: 0,
    });
  });
});
