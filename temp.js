import _ from 'lodash';

const testing = {
  a: {
    ab: 100
  },
  b: 2,
  c: {
    d: 4,
    e: {
      f: 5
    }
  }
};

const stylish = (result) => {

const final = [];
const intend = ' ';
const mult = 2;

  const iter = (result, mult) => {
    
    const keys = Object.keys(result);
    const spaces = intend.repeat(mult);
    // const lastSpaces = 


    for (const key of keys) {
      if (_.isObject(result[key])) {
        final.push(`${spaces}${key}: {\n`);
        iter(result[key], mult + 2);
      }
      if (!_.isObject(result[key])) {
        final.push(`${spaces}${key}: ${result[key]}\n`);
      }
    }
    final.push(`${intend.repeat(mult - 2)}}\n`);
  };

iter(result, mult);

return `{\n${final.join('')}`;
};

console.log(stylish(testing));

