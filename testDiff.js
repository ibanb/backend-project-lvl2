import gendiff from "./bin/logics.js";

const diff = gendiff('__fixtures__/file1.json', '__fixtures__/file2.json', 'stylish');
console.log(diff);