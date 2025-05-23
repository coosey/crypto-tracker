// jest.config.js
const nextJest = require('next/jest');

const jestConfig = nextJest({
  dir: './',
});

// Add any custom config to be passed to Jest
const customJestConfig = {
  // Add more setup options before each test is run
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleDirectories: ['node_modules', '<rootDir>/'],
  testEnvironment: 'jest-environment-jsdom',
  // Test files should end with `.test.js`, `.test.jsx`, `.test.ts`, or `.test.tsx`
  testMatch: ['**/?(*.)+(test).(js|jsx|ts|tsx)'],
};

module.exports = jestConfig(customJestConfig);