import {
  getName, getValue, getType, hasProp, getChild,
} from '../bin/make.js';
import setMarker from '../bin/setMarker.js';
// import travelersePlain from '../bin/travelersePlain.js';

const normalized = (value) => ([true, false, null, 0].includes(value) ? value : `'${value}'`);

function plain(diff) {
  const stackPaths = [];
  const result = [];
  const markedDiff = diff.map(setMarker);
  const setSign = {
    '+': '-',
    '-': '+',
  };
  /* eslint-disable-next-line */
  const travelersePlain = (diff) => {
    /* eslint-disable-next-line */
    for (const item of diff) {
      if (item.marker === '+') {
        /* eslint-disable-next-line */
        continue;
      } else {
        const name = getName(item);
        const type = getType(item);
        const value = getValue(item);
        const sign = name[0];
        const pairName = `${setSign[sign]}${name.slice(1)}`;
        const checkPair = hasProp(diff, pairName);
        const pair = checkPair ? getChild(diff, pairName) : false;
        const pairType = pair ? getType(pair) : null;
        if (pairType !== null) {
          pair.marker = '+';
        }
        stackPaths.push(name.slice(2));

        if (type === 'prime') {
          if (checkPair) {
            result.push(`Property '${stackPaths.join('.')}' was updated. From ${normalized(value)} to ${pairType === 'complex' ? '[complex value]' : normalized(getValue(pair))}`);
          } else {
            if (sign === '+') {
              result.push(`Property '${stackPaths.join('.')}' was added with value: ${type === 'complex' ? '[complex value]' : normalized(value)}`);
            }
            if (sign === '-') {
              result.push(`Property '${stackPaths.join('.')}' was removed`);
            }
          }
          stackPaths.pop();
        }

        if (type === 'complex') {
          if (checkPair) {
            result.push(`Property '${stackPaths.join('.')}' was updated. From ${type === 'complex' ? '[complex value]' : normalized(value)} to ${pairType === 'complex' ? '[complex value]' : normalized(getValue(pair))}`);
          } else {
            if (sign === '+') {
              result.push(`Property '${stackPaths.join('.')}' was added with value: [complex value]`);
            }
            if (sign === '-') {
              result.push(`Property '${stackPaths.join('.')}' was removed`);
            }
          }
          if (!checkPair) {
            travelersePlain(value);
          }
          stackPaths.pop();
        }
      }
    }
  };
  travelersePlain(markedDiff);
  return result.join('\n');
}

export default plain;
