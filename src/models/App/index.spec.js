import App from '.';

let app = null;
beforeAll(() => {
  const startBtnElem = document.createElement('div');
  const scoreElem = document.createElement('div');
  const canvasElem = {
    getContext: jest.fn(() => ({
      fillRect: jest.fn(),
      fillText: jest.fn(),
      clearRect: jest.fn(),
    })),
  };
  app = new App({ startBtnElem, scoreElem, canvasElem });
  app.resetGame();
});

describe('App object', () => {
  test('instantiation', () => {
    const s0 = new App({});
    expect(s0).toBe(app);
  });
  test('showGameOver', () => {
    app.showGameOver('over');
    expect(app.ctx.font).toBe('30px Play');
  });
});
