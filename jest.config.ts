export default {
  clearMocks: true,
  resetMocks: false,
  coverageProvider: "v8",
  moduleFileExtensions: ["js", "jsx", "ts", "tsx", "json", "node"],
  modulePaths:['<rootDir>/node_modules/','<rootDir>/__mocks__/'],
  setupFiles: ["dotenv/config"],
  globals: {
    'ts-jest': {
        isolatedModules: true
    }
  },
  testMatch: ["<rootDir>/src/**/?(*.)+(spec|test).[tj]s?(x)"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
};