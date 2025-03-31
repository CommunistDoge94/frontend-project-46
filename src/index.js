import { parseFile } from './parsing.js';
import buildDiff from './gendiff.js';
import formatChoice from './formatters/formatChoice.js';

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const data1 = parseFile(filepath1);
  const data2 = parseFile(filepath2);
  const diff = buildDiff(data1, data2);
  
  const formatter = formatChoice(format);
  return formatter(diff);
};

export default genDiff;