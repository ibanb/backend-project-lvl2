import _ from 'lodash';
import sort from './sort.js';
import normalize from './normalize.js';

export default function findDiff(objOne, objTwo) {
  const iter = (dataOne, dataTwo) => {
    const propsDataOne = Object.entries(_.cloneDeep(dataOne));
    const propsDataTwo = Object.entries(_.cloneDeep(dataTwo));

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
          const newAcc = {
            [`- ${key}`]: dataOneValue,
            [`+ ${key}`]: dataTwoValue,
          };
          return sort({ ...acc, ...newAcc, ...uniteUnique });
        }
        // types prime
        if (typeDataOneValue === typeDataTwoValue && typeDataOneValue === 'prime') {
          if (dataOneValue === dataTwoValue) {
            const newAcc = {
              [`  ${key}`]: dataOneValue,
            };
            return sort({ ...acc, ...newAcc, ...uniteUnique });
          }

          if (dataOneValue !== dataTwoValue) {
            const newAcc = {
              [`- ${key}`]: dataOneValue,
              [`+ ${key}`]: dataTwoValue,
            };
            return sort({ ...acc, ...newAcc, ...uniteUnique });
          }
        }

        // types complex
        if (typeDataOneValue === typeDataTwoValue && typeDataOneValue === 'complex') {
          const newAcc = {
            [`  ${key}`]: iter(dataOneValue, dataTwoValue),
          };
          return sort({ ...acc, ...newAcc, ...uniteUnique });
        }

        return null;
      },
      {},
    );

    return commonKP;
  };

  const result = iter(objOne, objTwo);
  const sorted = sort(_.cloneDeep(result));
  const normalized = normalize(sorted);

  return normalized;
}
