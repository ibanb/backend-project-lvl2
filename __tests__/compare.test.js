import compare from '../bin/logics.js';
import result from '../__fixtures__/result.js';

test('compare json', () => {
  const testObj = result;
  const objOnePath = '__fixtures__/file1.json';
  const objTwoPath = '__fixtures__/file2.json';
  expect(compare(objOnePath, objTwoPath)).toEqual(testObj);
});

test('compare yaml', () => {
  const testObj = result;
  const objOnePath = '__fixtures__/file1.yml';
  const objTwoPath = '__fixtures__/file2.yml';
  expect(compare(objOnePath, objTwoPath)).toEqual(testObj);
});
