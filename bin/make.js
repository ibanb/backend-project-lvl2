const make = (obj) => {
  const struct = [];
  const entries = Object.entries(obj);
  /* eslint-disable-next-line */
  for (const [key, value] of entries) {
    if (typeof value !== 'object' || value === null) {
      struct.push({ propName: key, type: 'prime', value });
    } else {
      struct.push({ propName: key, type: 'complex', value: [...make(value)] });
    }
  }
  return struct;
};

const getName = (prop) => prop.propName;

const getType = (prop) => prop.type;

const getValue = (prop) => prop.value;

const hasProp = (data, name) => (!!data.map(getName).includes(name));

const getChild = (data, name) => {
  const [value] = data.filter((item) => getName(item) === name);
  return value;
};

export {
  make, getName, getValue, getType, hasProp, getChild,
};
