import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename);

const expectedStylish = readFileSync(getFixturePath('result-stylish.txt'), 'utf-8').trim();

describe('Stylish format', () => {
  test('flat JSON files', () => {
    const file1 = getFixturePath('file1.json');
    const file2 = getFixturePath('file2.json');
    expect(genDiff(file1, file2, 'stylish')).toEqual(expectedStylish);
  });

  test('YAML files', () => {
    const file1 = getFixturePath('file1.yml');
    const file2 = getFixturePath('file2.yml');
    expect(genDiff(file1, file2, 'stylish')).toEqual(expectedStylish);
  });
});