/** @type {import('jest').Config} */
const config = {
  clearMocks: true,
  coverageProvider: 'v8',
  testEnvironment: 'node',
  transform: {},
  moduleFileExtensions: ['js', 'json', 'mjs'],
}

export default config
