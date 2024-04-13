module.exports = {
  rootDir: "..",
  testRegex: ".*\\.test\\.ts$",
  transform: {
    "^.+\\.(ts)$": "ts-jest"
  },
  testEnvironment: "node",
  moduleFileExtensions: ["ts", "js", "json", "node"],
  moduleDirectories: ["node_modules"],
  setupFilesAfterEnv: ["./jest/unit.setup.ts"],
  collectCoverage: true,
  collectCoverageFrom: [
    "src/modules/**/*.ts",
    "!src/**/*.{module,schema,error,d}.ts",
    "!src/**/{index,const}.ts",
    "!src/**/mock/**"
  ]
  // coverageThreshold: {
  //   global: {
  //     branches: 95,
  //     functions: 95,
  //     lines: 95,
  //     statements: 95
  //   }
  // }
}
