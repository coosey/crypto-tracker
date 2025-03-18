// jest.config.js
const nextJest = require('next/jest');

const jestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});

// Add any custom config to be passed to Jest
const customJestConfig = {
  // Add more setup options before each test is run
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  // If using TypeScript with a baseUrl set to the root directory, you need this to avoid module resolution errors
  moduleDirectories: ['node_modules', '<rootDir>/'],
  testEnvironment: 'jest-environment-jsdom',
  // Test files should end with `.test.js`, `.test.jsx`, `.test.ts`, or `.test.tsx`
  testMatch: ['**/?(*.)+(test).(js|jsx|ts|tsx)'],
};

// jestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = jestConfig(customJestConfig);