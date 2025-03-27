import path from 'path';
import { fileURLToPath } from 'url';
import { genDiff } from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

describe('JSON comparison', () => {
  let file1Path;
  let file2Path;
  let expectedDiff;

  beforeAll(() => {
    file1Path = getFixturePath('file1.json');
    file2Path = getFixturePath('file2.json');
    expectedDiff = `{
  - follow: false
  - proxy: 123.234.53.22
    host: hexlet.io
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;
  });

  test('Test: compare flat JSON files', () => {
    const diff = genDiff(file1Path, file2Path);
    expect(diff).toBe(expectedDiff);
  });

  test('Test: unchanged properties', () => {
    const diff = genDiff(file1Path, file2Path);
    expect(diff).toContain('host: hexlet.io');
  });

  test('Test: removed properties', () => {
    const diff = genDiff(file1Path, file2Path);
    expect(diff).toContain('- follow: false');
    expect(diff).toContain('- proxy: 123.234.53.22');
  });

  test('Test: added properties', () => {
    const diff = genDiff(file1Path, file2Path);
    expect(diff).toContain('+ verbose: true');
  });

  test('Test: changed properties', () => {
    const diff = genDiff(file1Path, file2Path);
    expect(diff).toContain('- timeout: 50');
    expect(diff).toContain('+ timeout: 20');
  });
});
