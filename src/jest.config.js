/** @type {import('jest').Config} */
const config = {
  preset: "ts-jest",
  testEnvironment: "node",
  transformIgnorePatterns: ["<rootDir>/dist/", "<rootDir>/node_modules/"],
};

module.exports = config;
