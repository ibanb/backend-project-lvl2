#!/usr/bin/env node
import commander from 'commander';
import genDiff from './logics.js';

const program = new commander.Command();
program.version('0.0.1');
program.description('Compares two configuration files and shows a difference.');
program.arguments('<filePath1> <filePath2>');
// program.option('-f, --format <type>', 'output format', 'stylish');
program.action((filePath1, filePath2
  ) => { // 3-й аргумент options
  console.log(genDiff(filePath1, filePath2)); // 3-й аргумент options.format
});
program.parse(process.argv);
