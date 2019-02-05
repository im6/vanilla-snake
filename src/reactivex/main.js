// https://github.com/thoughtram/reactive-snake/blob/master/src/main.ts
// https://zhuanlan.zhihu.com/p/35457418
// https://blog.thoughtram.io/rxjs/2017/08/24/taming-snakes-with-reactive-streams.html

import '../style.scss';
import {
  fromEvent,
  interval,
  BehaviorSubject, 
} from 'rxjs';
import { 
  map, 
  filter, 
  take,
  startWith,
  scan,
  distinctUntilChanged,
  share,
  withLatestFrom,
 } from 'rxjs/operators';
import { 
  DIRECTIONS, 
  INIT_DIRECTION,
  SNAKE_INIT_LENGTH,
 } from '../constant';

import { 
  eat,
  move,
  initSnake,
  initApple
} from './snake';

const canvas = document.getElementById('appCan');
const ctx = canvas.getContext('2d');

const nextDirection = (prev, next)=> {
  if(prev.x === next.x * -1 || prev.y === next.y * -1){
    return prev;
  } else {
    return next;
  }
}

const direction$ = fromEvent(document, 'keydown').pipe(
  map(({ keyCode }) => DIRECTIONS[keyCode]),
  startWith(INIT_DIRECTION),
  filter(d => !!d), // ignore other keydown
  scan(nextDirection), //determin direction change condition
  distinctUntilChanged(), // change on curve
);

const len$ = new BehaviorSubject(SNAKE_INIT_LENGTH);
const snakeLen$ = len$.pipe(
  scan((prev, next) => prev + 1),
  share()
);
const score$ = snakeLen$.pipe(
  startWith(0),
  scan((prev, next) => prev + 1)
)

const ticks$ = interval(1000);
const snake$ = ticks$.pipe(
  withLatestFrom(direction$, len$, (_, direction, snakeLength) => [direction, snakeLength]),
  scan(move, initSnake()),
  share());

const apple$ = snake$.pipe(
  scan(eat, initApple()),
  distinctUntilChanged(),
  share()
);


direction$.subscribe(c => {
  //console.log(c);
});

snakeLen$.subscribe(c => {
  //console.log('snakeLen: ', c);
});
score$.subscribe(c => {
  //console.log('score: ', c);
});

snake$.subscribe(c => {
  //console.log('snake: ', c);
});

apple$.subscribe(c => {
  console.log('apple: ', c);
});