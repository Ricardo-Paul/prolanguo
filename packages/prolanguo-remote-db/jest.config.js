module.exports = {
  roots: [
    '<rootDir>'
  ],
  testEnvironment: 'node',
  preset: 'ts-jest',
  transform: {
    '^.+\\.ts$': 'ts-jest'
  },
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