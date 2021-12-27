import yaml from 'js-yaml';

const parse = (file, format) => {
  if (format === '.json') {
    return JSON.parse(file);
  }
  if (format === '.yml' || format === '.yaml') {
    return yaml.load(file, 'utf-8');
  }
};

export default parse;
