module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testPathIgnorePatterns: [
    '.*/fixtures.ts',
    '.*/__fixtures__/*',
    '.*/*.fixtures.ts',
    '.*/dist/.*',
    '.*dist.*',
  ],
  collectCoverageFrom: ['src/**/{!(fixtures),}.ts'],
  // TODO: Improve test coverage enough to uncomment these 👇
  // coverageThreshold: {
  //   global: {
  //     branches: 80,
  //     functions: 80,
  //     lines: 80,
  //     statements: -10,
  //   },
  // },
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.jest.json',
    },
  },
};
