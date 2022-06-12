import _ from 'lodash';
import compare from '../bin/logics.js';
import plain from '../formatters/plain.js';

const testing = {
  deep: {
    id: {
      number: 45,
    },
  },
  fee: 100500,
};

const objOnePath = '__fixtures__/file1.json';
const objTwoPath = '__fixtures__/file2.json';

test('compare json', () => {
  const entries = Object.entries(compare(objOnePath, objTwoPath));
  expect(_.last(entries)[1]).toStrictEqual(testing);
});

test('plain test', () => {
  const string = plain(compare(objOnePath, objTwoPath)).split('\n')[0];
  /* eslint-disable-next-line */
  expect(string).toEqual(`Property 'common.follow' was added with value: false`);
});
