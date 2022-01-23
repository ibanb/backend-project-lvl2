import compare from '../bin/logics.js';
import _ from 'lodash';

const testing = {
  "deep": 
  { 
    "id": 
    { 
      "number": 45
    }
  },"fee":100500
};

test('compare json', () => {
  const objOnePath = '__fixtures__/file1.json';
  const objTwoPath = '__fixtures__/file2.json';
  const entries = Object.entries(compare(objOnePath, objTwoPath));
  expect(_.last(entries)[1]).toStrictEqual(testing);
});

