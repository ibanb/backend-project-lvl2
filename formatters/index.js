import stylish from './stylish.js';
import plain from './plain.js';

const index = (formatName) => {
  if (formatName === 'stylish') {
    return stylish;
  }
  if (formatName === 'plain') {
    return plain;
  }
  return 0;
};

export default index;
