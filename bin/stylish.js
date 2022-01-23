import _ from 'lodash';

const stylish = (result, intend = ' ', mult = 2) => {
  const final = [];
  
  const iter = (result, mult) => {

    const keys = Object.keys(result);
    for (const key of keys) {
      if (_.isObject(result[key])) {
        if (['-', '+'].includes(key[0])) {
          final.push(`${intend.repeat(mult)}${key}: {\n`);
          iter(result[key], mult + 6);
        } else {
        final.push(`${intend.repeat(mult)}${key}: {\n`);
        iter(result[key], mult + 4);
        }
      }
      if (!_.isObject(result[key])) {
          final.push(`${intend.repeat(mult)}${key}: ${result[key]}\n`);
      }
    }
    if (['-', '+', ' '].includes(_.last(keys)[0])) {
      final.push(`${intend.repeat(mult - 2)}}\n`);
    } else {
      final.push(`${intend.repeat(mult - 4)}}\n`);
    }
  };
  
  iter(result, mult);
  
  return `{\n${final.join('')}`;
};

export default stylish;
