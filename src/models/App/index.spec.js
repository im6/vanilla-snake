import App from '.';

describe('App object', () => {
  test('instantiation', () => {
    const s0 = new App();
    const s1 = new App();
    expect(s1).toBe(s0);
  });
});
