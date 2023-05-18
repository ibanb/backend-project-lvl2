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
        const newAcc = {
          [`${key}`]: value,
        };
        return { ...acc, ...newAcc };
      }
      if (typeOfValue === 'prime' && !signs.includes(key.slice(0, 1))) {
        const newAcc = {
          [`  ${key}`]: value,
        };
        return { ...acc, ...newAcc };
      }
      // complex
      if (typeOfValue === 'complex' && signs.includes(key.slice(0, 1))) {
        const newAcc = {
          [`${key}`]: iter(value),
        };
        return { ...acc, ...newAcc };
      }

      if (typeOfValue === 'complex' && !signs.includes(key.slice(0, 1))) {
        const newAcc = {
          [`  ${key}`]: iter(value),
        };
        return { ...acc, ...newAcc };
      }
      return null;
    }, {});

    return result;
  };

  return iter(diff);
}
