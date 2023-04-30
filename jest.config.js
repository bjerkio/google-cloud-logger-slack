module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testPathIgnorePatterns: [
    '.*.utils.ts',
    '.*/fixtures.ts',
    '.*/*.fixtures.ts',
    '.*/dist/.*',
    '.*dist.*',
  ],
  collectCoverageFrom: ['src/**/{!(fixtures),}.ts'],
  transform: {
    '\\.[jt]sx?$': ['ts-jest', { tsconfig: 'tsconfig.jest.json' }],
  },
};
