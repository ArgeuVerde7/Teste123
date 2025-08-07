// jest.config.js
module.exports = {
  collectCoverage: true,
  coverageReporters: ["lcov", "text"],
  collectCoverageFrom: [
    "**/*.js",
    "!**/node_modules/**"
  ]
  reporters: ["default", "jest-junit"],
  // Outras configurações do Jest
};