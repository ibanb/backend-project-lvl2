import _ from 'lodash';
import { make, getName, getValue, getType, hasProp, getChild } from '../bin/make.js';

const stylish = (diff, intend = ' ', mult = 2) => {
  

  // сначала засуну в массив тип prime
  const iter = (data, mult) => {
    const result = [];
    data.map(item => {
      if (getType(item) === 'prime') {
        result.push(`${intend.repeat(mult)}${getName(item)}: ${getValue(item)}`);
      } else {
        result.push(`${intend.repeat(mult)}${getName(item)}: ${iter(getValue(item), mult + 4)}\n${intend.repeat(mult + 2)}}`);
      }
    });
    return `{\n${result.join('\n')}`;
  };


  // затем верну снова строку из склееного массива через перенос строки
  return iter(diff, 2) + '\n}';
};

export default stylish;
