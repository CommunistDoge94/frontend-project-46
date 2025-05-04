import fs from 'fs';
import path from 'path';
import parse from './parsers.js';

export const parseFile = (filepath) => {
  const absolutePath = path.resolve(process.cwd(), filepath);
  
  if (!fs.existsSync(absolutePath)) {
    throw new Error(`File ${absolutePath} not found`);
  }

  const content = fs.readFileSync(absolutePath, 'utf-8');
  const extension = path.extname(filepath).slice(1).toLowerCase();

  return parse(content, extension);
};
