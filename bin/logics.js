import fs from 'fs';
import { cwd } from 'process';
import path from 'path';
import _ from 'lodash';
import parse from './parsers.js';
import index from '../formatters/index.js';
import bruteValues from './bruteValues.js';


/* eslint-disable-next-line */
const genDiff = (filePath1, filePath2, formatName = 'stylish') => {
  const fullPathOne = path.resolve(cwd(), filePath1);
  const fullPathSecond = path.resolve(cwd(), filePath2);
  const firstFile = fs.readFileSync(fullPathOne, 'utf8');
  const secondFile = fs.readFileSync(fullPathSecond, 'utf8');
  const parseOne = parse(firstFile, path.extname(fullPathOne));
  const parseTwo = parse(secondFile, path.extname(fullPathSecond));
  const format = index(formatName);
  const diff = bruteValues(parseOne, parseTwo);
  return format(diff);
};

export default genDiff;
