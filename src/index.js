import { parseFile } from './parsing.js';

export const compareFiles = (filepath1, filepath2, options) => {
  try {
    const data1 = parseFile(filepath1);
    const data2 = parseFile(filepath2);
    
    console.log('File 1:', data1);
    console.log('File 2:', data2);
    console.log('Format:', options?.format || 'stylish');
    
    return { data1, data2, format: options?.format };
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};