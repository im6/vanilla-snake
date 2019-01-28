//https://github.com/thoughtram/reactive-snake/blob/master/src/main.ts
import '../style.scss';
import { 
  fromEvent,
  interval, 
} from 'rxjs';
import { map, filter, take } from 'rxjs/operators';
import { DIRECTIONS } from '../constant';

const canvas = document.getElementById('appCan');
const ctx = canvas.getContext('2d');

const keyboardSource = fromEvent(document, 'keydown').pipe(
  map(({ keyCode }) => DIRECTIONS[keyCode])
);

const clockSource = interval(10);
const takeFour = clockSource.pipe(take(4));
keyboardSource.subscribe(c => {
  console.log(c);
});

takeFour.subscribe(c => {
  console.log(c);
});