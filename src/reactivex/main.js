import '../style.scss';
import { fromEvent } from 'rxjs';
import { map, filter } from 'rxjs/operators';

const canvas = document.getElementById('appCan');
const ctx = canvas.getContext('2d');

const keyboardEvent = fromEvent(document, 'keydown')

keyboardEvent.subscribe({
  next: x => console.log('got value ' + x),
  error: err => console.error('something wrong occurred: ' + err),
  complete: () => console.log('done'),
});