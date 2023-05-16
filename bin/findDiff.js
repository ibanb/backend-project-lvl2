import _ from 'lodash';
import sorted from './sort.js';

// THIS MAIN func that create diff recursive in obj
// attention SEE in STD task)))

  // Короче всё ясно. 
  // 1) найти ключи которые есть в первом но их нет во втором и добавить их с правильными знаками
  // 2) найти ключи которые есть во втором но их нет в первом и добавить их с правильными знаками
  // 3) Найти ключи которые есть в обоих и они простые
  // 4) Найти ключи которые есть в обоих и они комплексные
  // 5) Провести сортировку ключей на выходе (использовать LODASH)

export default function findDiff(dataOne, dataTwo) {

  const result = {};
  
  const propsDataOne = Object.entries(dataOne);
  const propsDataTwo = Object.entries(dataTwo);
  const uniquePropsDataOne = propsDataOne.filter(prop => {
    const [key, value] = prop;
    const keysOfPropsDataTwo = propsDataTwo.map(item => item[0]);
    return !keysOfPropsDataTwo.includes(key);
  });
  const uniquePropsDataTwo = propsDataTwo.filter(prop => {
    const [key, value] = prop;
    const keysOfPropsDataOne = propsDataOne.map(item => item[0]);
    return !keysOfPropsDataOne.includes(key);
  });
  const keysCommonProps = propsDataOne.filter(prop => {
    const [key, value] = prop;
    const keysOfPropsDataTwo = propsDataTwo.map(item => item[0]);
    return keysOfPropsDataTwo.includes(key);
  }).map(prop => prop[0]);

  uniquePropsDataOne.map(prop => {
    const [key, value] = prop;
    result[`- ${key}`] = value;
  });

  uniquePropsDataTwo.map(prop => {
    const [key, value] = prop;
    result[`+ ${key}`] = value;
  });

  
  keysCommonProps.map(key => {
    
    const dataOneValue = dataOne[key];
    const dataTwoValue = dataTwo[key];
    const typeDataOneValue = typeof dataOneValue === 'object' && dataOneValue !== null ? 'complex' : 'prime';
    const typeDataTwoValue = typeof dataTwoValue === 'object' && dataTwoValue !== null ? 'complex' : 'prime';
    

    // types defferent
    if (typeDataOneValue !== typeDataTwoValue) {
      result[`- ${key}`] = dataOneValue;
      result[`+ ${key}`] = dataTwoValue;
    }

    // types prime
    if (typeDataOneValue === typeDataTwoValue && typeDataOneValue === 'prime') {
      if (dataOneValue === dataTwoValue) {
        result[`  ${key}`] = dataOne[key];
      }
  
      if (dataOneValue !== dataTwoValue) {
        result[`- ${key}`] = dataOneValue;
        result[`+ ${key}`] = dataTwoValue;
      }
    }

    // type complex
    if (typeDataOneValue === typeDataTwoValue && typeDataOneValue === 'complex') {
      result[`  ${key}`] = findDiff(dataOneValue, dataTwoValue);
    }
    
  })
  
  return sorted(result);
};
