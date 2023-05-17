/* eslint-disable */
import _ from 'lodash';

const reverseSigns = {
  '-': '+',
  '+': '-',
};
const hasSign = (key) => ['+', '-'].includes(key.slice(0, 1));
const hasPair = (obj, key) => _.has(obj, `${reverseSigns[key.slice(0, 1)]}${key.slice(1)}`);

export default function uniteProps(diff) {
  const entries = Object.entries(diff);
  return entries.reduce((acc, [key, value]) => {
    if (hasSign(key) && hasPair(diff, key)) {
      if (_.has(acc, `*${key.slice(1)}`)) {
        return acc;
      }
      if (!_.has(acc, `*${key.slice(1)}`)) {
        acc[`*${key.slice(1)}`] = [diff[key], diff[`${reverseSigns[key.slice(0, 1)]}${key.slice(1)}`]];
        return acc;
      }
    }

    if (hasSign(key) && !hasPair(diff, key)) {
      acc[key] = value;
      return acc;
    }

    if (!hasSign(key)) {
      const typeOfValue = typeof value === 'object' && value !== null ? 'complex' : 'prime';

      if (typeOfValue === 'prime') {
        acc[key] = value;
      }
      if (typeOfValue === 'complex') {
        acc[key] = uniteProps(value);
      }
      return acc;
    }
  }, {});
}
