import fs from 'fs';
import { cwd } from 'process';
import path from 'path';

const bruteValues = (objOne, objTwo) => {
  const keysObj1 = Object.keys(objOne);
  const keysObj2 = Object.keys(objTwo);
  const result = {};
  /* eslint-disable-next-line */
  for (const key of keysObj1) {
    if (objTwo[key] && objOne[key] === objTwo[key]) {
      result[`  ${key}`] = objOne[key];
    }
    if (objTwo[key] && objOne[key] !== objTwo[key]) {
      result[`- ${key}`] = objOne[key];
      result[`+ ${key}`] = objTwo[key];
    }
    if (!objTwo[key]) {
      result[`- ${key}`] = objOne[key];
    }
  }
  /* eslint-disable-next-line */
  for (const key of keysObj2) {
    if (!objOne[key]) {
      result[`+ ${key}`] = objTwo[key];
    }
  }

  const unorderedKeys = Object.keys(result);
  const sorted = (arr) => {
    const finalResult = arr.slice();
    const resultFin = {};
    finalResult.sort((a, b) => {
      if (a[2] > b[2]) {
        return 1;
      }
      if (a[2] < b[2]) {
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
};

const compare = (filePath1, filePath2) => {
  const firstFile = fs.readFileSync(path.resolve(cwd(), filePath1), 'utf8');
  const secondFile = fs.readFileSync(path.resolve(cwd(), filePath2), 'utf8');
  return bruteValues(JSON.parse(firstFile), JSON.parse(secondFile));
};

export default compare;
