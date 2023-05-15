import {
  getName, getValue, getType,
} from '../bin/make.js';
/* eslint-disable-next-line */
const stylish = (diff, intend = ' ', mult = 2) => {
  /* eslint-disable-next-line */
  const iter = (data, mult) => {
    let result = '';
    /* eslint-disable-next-line */
    data.map((item) => {
      if (getType(item) === 'prime') {
        result += `${intend.repeat(mult)}${getName(item)}: ${getValue(item)}\n`;
      } else {
        result += `${intend.repeat(mult)}${getName(item)}: {\n${iter(getValue(item), mult + 4)}${intend.repeat(mult + 2)}}\n`;
      }
    });
    return `${result}`;
  };

  return `{\n${iter(diff, 2)}}`;
};

export default stylish;
