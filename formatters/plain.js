import uniteProps from "../bin/uniteProps.js";

const normalize = (value) => {
  const literals = [true, false, null, 0];
  const typeOfValue = typeof value === 'object' && value !== null ? 'complex' : 'prime';
  return typeOfValue === 'complex' ? `[complex value]` : `${literals.includes(value) ? value : `'${value}'`}`;
}

export default function plain(diff) {

  const diffWithUniteProps = uniteProps(diff);

  const iter = (obj, path) => {

    const entries = Object.entries(obj);

    return entries.reduce((acc, [key, value]) => {

      const currentPath = `${path}${path === '' ? '' : '.'}${key.slice(2)}`;
      const typeOfValue = typeof value === 'object' && value !== null ? 'complex' : 'prime';

      if (key.slice(0, 1) === '+') {
        return [...acc, `Property '${currentPath}' was added with value: ${normalize(value)}`];
      }
      if (key.slice(0, 1) === '-') {
        return [...acc, `Property '${currentPath}' was removed`];
      }
      if (key.slice(0, 1) === '*') {
        return [...acc, `Property '${currentPath}' was updated. From ${normalize(value[0])} to ${normalize(value[1])}`];
      }
      if (key.slice(0, 1) === ' ' && typeOfValue === 'prime') {
        return [...acc];
      }
      if (key.slice(0, 1) === ' ' && typeOfValue === 'complex') {
        return [...acc, ...iter(value, currentPath)];
      }

    }, []);
  }

  
  return iter(diffWithUniteProps, '').join('\n');
};
