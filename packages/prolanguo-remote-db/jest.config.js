module.exports = {
  roots: [
    '<rootDir>'
  ],
  testEnvironment: 'node',
  preset: 'ts-jest',
  transform: {
    '^.+\\.ts$': 'ts-jest'
  },
  "testRegex": "(/__tests__/.*|(\\.|/)(test|spec))\\.ts?$", //run only .ts files
  setupFilesAfterEnv: ['./src/setupTest.ts'],
  reporters: [
    "default", [
      "./node_modules/jest-html-reporter", {
        pageTitle: 'Prolanguo e2e tests',
        includeFailureMsg: true
      }
    ]
  ]
}