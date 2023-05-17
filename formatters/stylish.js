/* eslint-disable */
export default function stylish(diff, intend = ' ', mult = 4) {
  const iter = (diff, deep) => {
    const entries = Object.entries(diff);

    return entries.reduce((acc, [key, value]) => {
      const typeOfValue = typeof value === 'object' && value !== null ? 'complex' : 'prime';
      const newIntend = intend.repeat((mult * deep) - 2);

      if (typeOfValue === 'prime') {
        const primeElementKey = `${newIntend}${key}: ${value}`;
        return [...acc, primeElementKey];
      }

      if (typeOfValue === 'complex') {
        const complexElementKey = `${newIntend}${key}: {`;
        const finishIntend = intend.repeat((mult * deep));
        return [...acc, complexElementKey, ...iter(value, deep + 1), `${finishIntend}}`];
      }
    }, []);
  };

  const stylushDiff = iter(diff, 1);
  const formedOutput = `{\n${stylushDiff.join('\n')}\n}`;

  return formedOutput;
}
