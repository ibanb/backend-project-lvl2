import {make, getChildren, getName, getType, getValue} from './make.js';
import travelerse from './travelerse.js';

function bruteValues(valueOne, valueTwo) {
    const firstData = make(valueOne);
    const secondData = make(valueTwo);

    return travelerse(firstData, secondData);
}

export default bruteValues;