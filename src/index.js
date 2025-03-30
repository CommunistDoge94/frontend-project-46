import { parseFile } from './parsing.js';
import buildDiff from './gendiff.js';
import stylish from './formatters/stylish.js';

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const data1 = parseFile(filepath1);
  const data2 = parseFile(filepath2);
  const diff = buildDiff(data1, data2);

  if (format === 'stylish') {
    return stylish(diff);
  }
  throw new Error(`Unknown format: ${format}`);
};

export default genDiff;