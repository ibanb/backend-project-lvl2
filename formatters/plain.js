import _ from 'lodash';

function plain(obj) {
  const stack = [];
  const paths = [];
  /* eslint-disable-next-line */
  function travelerse(obj) {
    const keys = Object.keys(obj);

    for (let i = 0; i < keys.length; i += 1) {
      const sign = keys[i][0];
      if (sign === ' ') {
        stack.push(keys[i].slice(2));
        travelerse(obj[keys[i]]);
      }

      if (sign === '+' && _.has(obj, `-${keys[i].slice(1)}`)) {
        stack.push(keys[i].slice(2));
        paths.push(`Property '${stack.join('.')}' was updated. From '${obj[`-${keys[i].slice(1)}`]}' to '${obj[`+${keys[i].slice(1)}`]}'`);
        stack.pop();
      }
      if (sign === '-' && _.has(obj, `+${keys[i].slice(1)}`)) {
        /* eslint-disable-next-line */
        continue;
      }
      if (sign === '-' && !_.has(obj, `+${keys[i].slice(1)}`)) {
        stack.push(keys[i].slice(2));
        paths.push(`Property '${stack.join('.')}' was removed`);
        stack.pop();
      }
      if (sign === '+' && !_.has(obj, `-${keys[i].slice(1)}`)) {
        stack.push(keys[i].slice(2));
        let value = obj[`+${keys[i].slice(1)}`];
        if (_.isObject(obj[`+${keys[i].slice(1)}`])) {
          value = '[complex value]';
        }
        paths.push(`Property '${stack.join('.')}' was added with value: ${value}`);
        stack.pop();
      }
    }
    stack.pop();
  }
  travelerse(obj);
  return paths.join('\n');
}

export default plain;
