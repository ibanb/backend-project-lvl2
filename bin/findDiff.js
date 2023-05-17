import sort from './sort.js';
import normalize from './normalize.js';

export default function findDiff(dataOne, dataTwo) {
  const result = {};

  const propsDataOne = Object.entries(dataOne);
  const propsDataTwo = Object.entries(dataTwo);
  const uniquePropsDataOne = propsDataOne.filter((prop) => {
    const [key] = prop;
    const keysOfPropsDataTwo = propsDataTwo.map((item) => item[0]);
    return !keysOfPropsDataTwo.includes(key);
  });
  const uniquePropsDataTwo = propsDataTwo.filter((prop) => {
    const [key] = prop;
    const keysOfPropsDataOne = propsDataOne.map((item) => item[0]);
    return !keysOfPropsDataOne.includes(key);
  });
  const keysCommonProps = propsDataOne.filter((prop) => {
    const [key] = prop;
    const keysOfPropsDataTwo = propsDataTwo.map((item) => item[0]);
    return keysOfPropsDataTwo.includes(key);
  }).map((prop) => prop[0]);

  uniquePropsDataOne.map((prop) => {
    const [key, value] = prop;
    result[`- ${key}`] = value;
    return null;
  });

  uniquePropsDataTwo.map((prop) => {
    const [key, value] = prop;
    result[`+ ${key}`] = value;
    return null;
  });

  keysCommonProps.map((key) => {
    const dataOneValue = dataOne[key];
    const dataTwoValue = dataTwo[key];
    const typeDataOneValue = typeof dataOneValue === 'object' && dataOneValue !== null ? 'complex' : 'prime';
    const typeDataTwoValue = typeof dataTwoValue === 'object' && dataTwoValue !== null ? 'complex' : 'prime';

    // types different
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

    // types complex
    if (typeDataOneValue === typeDataTwoValue && typeDataOneValue === 'complex') {
      result[`  ${key}`] = findDiff(dataOneValue, dataTwoValue);
    }
    return null;
  });

  const sorted = sort(result);
  const normalized = normalize(sorted);

  return normalized;
}
