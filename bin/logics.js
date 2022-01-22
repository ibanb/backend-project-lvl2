import fs from 'fs';
import { cwd } from 'process';
import path from 'path';
import parse from './parsers.js';
import _ from 'lodash';
import stylish from './stylish.js';

function bruteValues(valueOne, valueTwo) {
  const result = {};

  const keysOne = Object.keys(valueOne);
  const keysTwo = Object.keys(valueTwo);
  const uniq = _.intersection(keysOne, keysTwo);

  for (const key of keysOne) {
    if (!keysTwo.includes(key)) {
      result[`- ${key}`] = valueOne[key];
    }
  }

  for (const key of keysTwo) {
    if (!keysOne.includes(key)) {
      result[`+ ${key}`] = valueTwo[key];
    }
  }

  for (const key of uniq) {
    if (valueOne[key] === valueTwo[key]) {
      result[`  ${key}`] = valueOne[key];
    }

    if (!_.isObject(valueOne[key]) && !_.isObject(valueTwo[key]) && valueOne[key] === valueTwo[key]) {
      result[`  ${key}`] = valueOne[key];
    }

    if (!_.isObject(valueOne[key]) && !_.isObject(valueTwo[key]) && valueOne[key] !== valueTwo[key]) {
      result[`- ${key}`] = valueOne[key];
      result[`+ ${key}`] = valueTwo[key];
    }

    if (_.isObject(valueOne[key]) && !_.isObject(valueTwo[key])) {
      result[`- ${key}`] = valueOne[key];
      result[`+ ${key}`] = valueTwo[key];
    }

    if (!_.isObject(valueOne[key]) && _.isObject(valueTwo[key])) {
      result[`- ${key}`] = valueOne[key];
      result[`+ ${key}`] = valueTwo[key];
    }

    if (_.isObject(valueOne[key]) && _.isObject(valueTwo[key])) {
      result[`  ${key}`] = bruteValues(valueOne[key], valueTwo[key]);
    }
  }

  

  const unorderedKeys = Object.keys(result);
  const sorted = (arr) => {
    const finalResult = arr.slice();
    const resultFin = {};
    finalResult.sort((a, b) => {
      if (a.slice(2) > b.slice(2)) {
        return 1;
      }
      if (a.slice(2) < b.slice(2)) {
        return -1;
      }
      return 0;
    });
    /* eslint-disable-next-line */
    for (const key of finalResult) {
      resultFin[key] = result[key];
    }
    return resultFin;
  };
  return sorted(unorderedKeys);
}

  /* eslint-disable-next-line */
const compare = (filePath1, filePath2) => {
  const fullPathOne = path.resolve(cwd(), filePath1);
  const fullPathSecond = path.resolve(cwd(), filePath2);
  const firstFile = fs.readFileSync(fullPathOne, 'utf8');
  const secondFile = fs.readFileSync(fullPathSecond, 'utf8');
  const parseOne = parse(firstFile, path.extname(fullPathOne));
  const parseTwo = parse(secondFile, path.extname(fullPathSecond));

  console.log(bruteValues(parseOne, parseTwo));
};

export default compare;
