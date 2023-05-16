import fs from 'fs';
import { cwd } from 'process';
import path from 'path';
import parse from './parsers.js';
import index from '../formatters/index.js';
import findDiff from './findDiff.js';

export default function gendiff(filePath1, filePath2, formatName = 'stylish') {
  const fullPathOne = path.resolve(cwd(), filePath1);
  const fullPathSecond = path.resolve(cwd(), filePath2);
  const firstFile = fs.readFileSync(fullPathOne, 'utf8');
  const secondFile = fs.readFileSync(fullPathSecond, 'utf8');
  const parseOneData = parse(firstFile, path.extname(fullPathOne));
  const parseTwoData = parse(secondFile, path.extname(fullPathSecond));
  const formater = index(formatName);
  const diff = findDiff(parseOneData, parseTwoData);
  console.log(diff);
  // return formater(diff);
};
