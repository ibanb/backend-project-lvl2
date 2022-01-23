#!/usr/bin/env node
import commander from 'commander';
import compare from './logics.js';
import stylish from './stylish.js';

const program = new commander.Command();
program.version('0.0.1');
program.description('Compares two configuration files and shows a difference.');
program.arguments('<filePath1> <filePath2>');
program.option('-f, --format <type>', 'output format', 'stylish');
program.action((filePath1, filePath2, options) => {
  if (options.format === 'stylish') {
    console.log(stylish(compare(filePath1, filePath2)));
  }
  if (options.format !== 'stylish') {
    console.log(stylish(compare(filePath1, filePath2), '|-', 2));
  }
});
program.parse(process.argv);
