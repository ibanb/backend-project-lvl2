// import _ from 'lodash';
import sort from './sort.js';
import normalize from './normalize.js';

export default function findDiff(objOne, objTwo) {
  const iter = (dataOne, dataTwo) => {
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

    const commonKP = keysCommonProps.reduce(
      (acc, key) => {
        const preperedUniquePDO = Object.fromEntries(uniquePropsDataOne.map(([KeY, value]) => [`- ${KeY}`, value]));
        const preperedUniquePDT = Object.fromEntries(uniquePropsDataTwo.map(([KeY, value]) => [`+ ${KeY}`, value]));
        const uniteUnique = { ...preperedUniquePDO, ...preperedUniquePDT };
        // handle commonKeys
        const dataOneValue = dataOne[key];
        const dataTwoValue = dataTwo[key];
        // console.log(dataOneValue);
        const typeDataOneValue = typeof dataOneValue === 'object' && dataOneValue !== null ? 'complex' : 'prime';
        const typeDataTwoValue = typeof dataTwoValue === 'object' && dataTwoValue !== null ? 'complex' : 'prime';

        // types different
        if (typeDataOneValue !== typeDataTwoValue) {
          acc[`- ${key}`] = dataOneValue;
          acc[`+ ${key}`] = dataTwoValue;
          // return { ...acc, ...uniteUnique };
        }
        // types prime
        if (typeDataOneValue === typeDataTwoValue && typeDataOneValue === 'prime') {
          if (dataOneValue === dataTwoValue) {
            acc[`  ${key}`] = dataOne[key];
            // return { ...acc, ...uniteUnique };
          }

          if (dataOneValue !== dataTwoValue) {
            acc[`- ${key}`] = dataOneValue;
            acc[`+ ${key}`] = dataTwoValue;
            // return { ...acc, ...uniteUnique };
          }
        }

        // types complex
        if (typeDataOneValue === typeDataTwoValue && typeDataOneValue === 'complex') {
          acc[`  ${key}`] = iter(dataOneValue, dataTwoValue);
        }

        return { ...acc, ...uniteUnique };
      },
      {},
    );

    return commonKP;
  };

  const result = iter(objOne, objTwo);
  const sorted = sort(result);
  const normalized = normalize(sorted);

  return normalized;
}
