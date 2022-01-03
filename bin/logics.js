import fs from 'fs';
import { cwd } from 'process';
import path from 'path';
import parse from './parsers.js';

const bruteValues = (objOne, objTwo) => {
  const keysObj1 = Object.keys(objOne);
  const keysObj2 = Object.keys(objTwo);
  const result = {};

  /*
    Ниже, в цикле в переборе, проверка, если VALUE это объект то запускаем рекурсию и передаем туда текущие объекты
    ВСЁ СВОДИТЬ К ТОМУ ЧТОБЫ ОБЕРНУТЬ ВСЁ внутри цикла В ЕЩЁ ОДИН (iF) )))))))))))))) 

    А во второй на отсутствие свойства всё сводиться к тому чтобы если отсутствующее свойсто имеет в значении тоже 
    объект то тупо пройти его рекурсивно и отсортировать))))
    
    Иван, у тебя получиться.
  */


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
  const fullPathOne = path.resolve(cwd(), filePath1);
  const fullPathSecond = path.resolve(cwd(), filePath2);
  const firstFile = fs.readFileSync(fullPathOne, 'utf8');
  const secondFile = fs.readFileSync(fullPathSecond, 'utf8');
  const parseOne = parse(firstFile, path.extname(fullPathOne));
  const parseTwo = parse(secondFile, path.extname(fullPathSecond));

  return bruteValues(parseOne, parseTwo);
};

export default compare;

// test
