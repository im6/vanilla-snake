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
 } from 'rxjs/operators';
import { 
  DIRECTIONS, 
  INIT_DIRECTION,
  SNAKE_INIT_LENGTH,
 } from '../constant';

const canvas = document.getElementById('appCan');
const ctx = canvas.getContext('2d');

const nextDirection = (prev, next)=> {
  if(prev.x === next.x * -1 || prev.y === next.y * -1){
    return prev;
  } else {
    return next;
  }
}

const keyboardSource = fromEvent(document, 'keydown').pipe(
  map(({ keyCode }) => DIRECTIONS[keyCode]),
  startWith(INIT_DIRECTION),
  filter(d => !!d), // ignore other keydown
  scan(nextDirection), //determin direction change condition
  distinctUntilChanged(), // change on curve
);

const lengthSource = new BehaviorSubject(SNAKE_INIT_LENGTH);
const scoreSource = lengthSource.pipe(
  scan((prev, next) => prev + next),
  share()
);

const clockSource = interval(10);
const takeFour = clockSource.pipe(take(4));




keyboardSource.subscribe(c => {
  //console.log(c);
});

takeFour.subscribe(c => {
  //console.log(c);
});

scoreSource.subscribe(c => {
  console.log(c);
});