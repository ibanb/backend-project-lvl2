// import _ from 'lodash';

export default function normalize(diff) {
  const signs = ['-', '+', ' '];

  const iter = (item) => {
    if (typeof item !== 'object' || item === null) {
      return item;
    }

    const result = Object.entries(item).reduce((acc, [key, value]) => {
      const typeOfValue = typeof value === 'object' && value !== null ? 'complex' : 'prime';
      // prime
      if (typeOfValue === 'prime' && signs.includes(key.slice(0, 1))) {
        // const newAcc = _.cloneDeep(acc);
        acc[key] = value;
        // return acc;
        // return { ...acc };
      }
      if (typeOfValue === 'prime' && !signs.includes(key.slice(0, 1))) {
        acc[`  ${key}`] = value;
        // return acc;
      }
      // complex
      if (typeOfValue === 'complex' && signs.includes(key.slice(0, 1))) {
        acc[key] = iter(value);
        // return acc;
      }

      if (typeOfValue === 'complex' && !signs.includes(key.slice(0, 1))) {
        acc[`  ${key}`] = iter(value);
        // return acc;
      }
      return acc;
    }, {});

    return result;
  };

  return iter(diff);
}
