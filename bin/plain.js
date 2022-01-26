import _, { keys, values } from 'lodash';

const testing = {
  name: 'Ivan',
  age: 32,
  gender: male,
  hobby: {
    game: 'chess',
    deed: 'programming',
    key: {
      test: values,
    },
  },
};



function plain(obj) {

  const stack = [];
  const paths = [];

  function travelerse(obj) {

    const entries = Object.entries(obj);

    for (const [key, value] of keys) {
      stack.push(key);
      if (key[0] === ' ' && _.isObject(value)) {
        travelerse(value);
      }

      if ()
    }
  }

}
