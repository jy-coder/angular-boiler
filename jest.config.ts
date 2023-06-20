import type { Config } from '@jest/types';

const jestConfig: Config.InitialOptions = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['./setup-jest.ts'],
  globalSetup: 'jest-preset-angular/global-setup',
  testMatch: ['**/test/**/*.spec.ts'],
  moduleNameMapper: {
    '^src/environments/environment.prod$': '<rootDir>/src/environments/environment.prod.ts',
  },
};

export default jestConfig;
