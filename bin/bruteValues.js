import { make } from './make.js';
import travelerse from './travelerse.js';

function bruteValues(valueOne, valueTwo) {
  // console.log(valueOne);
  // console.log(valueTwo);
  const firstData = make(valueOne);
  const secondData = make(valueTwo);

  return travelerse(firstData, secondData);
}

export default bruteValues;
