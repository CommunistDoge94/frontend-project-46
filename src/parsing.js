import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

export const parseFile = (filepath) => {
  const absolutePath = path.resolve(process.cwd(), filepath);
  
  if (!fs.existsSync(absolutePath)) {
    throw new Error(`File ${absolutePath} not found`);
  }

  const content = fs.readFileSync(absolutePath, 'utf-8');
  const extension = path.extname(filepath).slice(1).toLowerCase();

  try {
    switch (extension) {
      case 'json':
        return JSON.parse(content);
      case 'yaml':
      case 'yml':
        return yaml.load(content);
      default:
        throw new Error(`Unsupported format: ${extension}`);
    }
  } catch (e) {
    throw new Error(`Error parsing ${filepath}: ${e.message}`);
  }
};
