import {
  getName, getValue, getType, hasProp, getChild,
} from './make.js';
import deep from './deep.js';

function travelerse(first, second) {
  const struct = [];
  /* eslint-disable-next-line */
  for (const item of first) {
    if (hasProp(second, getName(item))) {
      const valueOne = getValue(item);
      const valueTwo = getValue(getChild(second, getName(item)));
      const typeOne = getType(item);
      const typeTwo = getType(getChild(second, getName(item)));

      if (typeOne === typeTwo && typeOne === 'prime') {
        if (valueOne === valueTwo) {
          struct.push({ propName: `  ${getName(item)}`, type: 'prime', value: valueOne });
        } else {
          struct.push({ propName: `- ${getName(item)}`, type: 'prime', value: valueOne });
          struct.push({ propName: `+ ${getName(item)}`, type: 'prime', value: valueTwo });
        }
      }

      // если типы одинаковые и сложные запускаем РЕКУСИЮ
      if (typeOne === typeTwo && typeOne === 'complex') {
        struct.push({ propName: `  ${getName(item)}`, type: 'complex', value: [...travelerse(valueOne, valueTwo)] });
      }

      // нужна функция обхода в глубину которая изменить свуойства и добавить в их названия пробелы

      if (typeOne !== typeTwo) {
        if (typeOne === 'complex') {
          struct.push({ propName: `- ${getName(item)}`, type: typeOne, value: deep(valueOne) });
          struct.push({ propName: `+ ${getName(item)}`, type: typeTwo, value: valueTwo });
        } else {
          struct.push({ propName: `- ${getName(item)}`, type: typeOne, value: valueOne });
          struct.push({ propName: `+ ${getName(item)}`, type: typeTwo, value: deep(valueTwo) });
        }
      }
    }

    if (!hasProp(second, getName(item))) {
      // тоже самое если тип комплексный то пробежать в глубину
      if (getType(item) === 'complex') {
        struct.push({ propName: `- ${getName(item)}`, type: getType(item), value: deep(getValue(item)) });
      } else {
        struct.push({ propName: `- ${getName(item)}`, type: getType(item), value: getValue(item) });
      }
    }
  }
  // если имя есть только во втором объекте
  /* eslint-disable-next-line */
  for (const item of second) {
    if (!hasProp(first, getName(item))) {
      // тоже самое если тип комплексный пробежать в глубину и поменять названия свойст
      if (getType(item) === 'complex') {
        struct.push({ propName: `+ ${getName(item)}`, type: getType(item), value: deep(getValue(item)) });
      } else {
        struct.push({ propName: `+ ${getName(item)}`, type: getType(item), value: getValue(item) });
      }
    }
  }
  /* eslint-disable-next-line */
  return struct.sort((a, b) => {
    if (a.propName.slice(2) > b.propName.slice(2)) {
      return 1;
    }
    if (a.propName.slice(2) < b.propName.slice(2)) {
      return -1;
    }
    if (a.propName.slice(2) === b.propName.slice(2)) {
      return 0;
    }
  });
}

export default travelerse;
