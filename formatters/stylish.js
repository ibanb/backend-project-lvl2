import _ from 'lodash';
import { make, getName, getValue, getType, hasProp, getChild } from '../bin/make.js';

const stylish = (diff, intend = ' ', mult = 2) => {
  
  const iter = (data, mult) => {
    let result = '';
    data.map(item => {
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
