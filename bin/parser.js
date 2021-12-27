import fs from 'fs';
import { cwd } from 'process';
import path from 'path';

const parse = (file, format) => {
  if (format === '.json') {
    return JSON.parse(file);
  }
  if (format === '.yml' || format === '.yaml') {
    return "test!";
  }
};

export default parse;