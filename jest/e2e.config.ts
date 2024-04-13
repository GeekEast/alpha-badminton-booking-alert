module.exports = {
  rootDir: "..",
  testRegex: ".e2e-test.ts$",
  transform: { "^.+\\.(t|j)s$": "ts-jest" },
  testEnvironment: "node",
  moduleFileExtensions: ["ts", "js", "json", "node"],
  moduleDirectories: ["node_modules"],
  collectCoverage: false
}
