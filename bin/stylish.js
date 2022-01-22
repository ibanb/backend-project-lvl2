import _ from 'lodash';

const testing = {
    '  common': {
      '+ follow': false,
      '  setting1': 'Value 1',
      '- setting2': 200,
      '- setting3': true,
      '+ setting3': null,
      '+ setting4': 'blah blah',
      '+ setting5': { key5: 'value5' },
      '  setting6': { '  doge': { '- wow': '', '+ wow':'so much'}, '  key': 'value', '+ ops': 'vops' }
    },
    '  group1': {
      '- baz': 'bas',
      '+ baz': 'bars',
      '  foo': 'bar',
      '- nest': { key: 'value' },
      '+ nest': 'str'
    },
    '- group2': { abc: 12345, deep: { id: 45 } },
    '+ group3': { deep: { id: {number: 45 }, fee: 100500 }}
};

const stylish = (result, intend, mult) => {
  const final = [];
  
  
  const iter = (result, mult) => {

    const keys = Object.keys(result);
    for (const key of keys) {

      
      if (_.isObject(result[key])) {
        final.push(`${intend.repeat(mult)}${key}: {\n`);
        iter(result[key], mult + 4);
      }
      if (!_.isObject(result[key])) {
          final.push(`${intend.repeat(mult)}${key}: ${result[key]}\n`);
      }
    }
    final.push(`${intend.repeat(mult - 2)}}\n`);
  };
  
  iter(result, mult);
  
  return `{\n${final.join('')}`;
};

console.log(stylish(testing, ' ', 2));

export default stylish;