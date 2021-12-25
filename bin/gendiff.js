#!/usr/bin/env node
import commander from 'commander';
import compare from './logics.js';

// const { Command } = require('commander');
const program = new commander.Command();
program.version('0.0.1');
program.description('Compares two configuration files and shows a difference.');
program.arguments('<filePath1> <filePath2>');
program.option('-f, --format <type>', 'output format');
program.action((filePath1, filePath2) => {
  compare(filePath1, filePath2);
});
program.parse(process.argv);

// const options = program.opts();
// console.log(options.format);
