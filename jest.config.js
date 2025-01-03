module.exports = {
  preset: "@vue/cli-plugin-unit-jest/presets/typescript-and-babel",
  transform: {
    "^.+\\.tsx?$": "ts-jest",
    "^.+\\.vue$": "@vue/vue3-jest",
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "\\.(css|scss|sass)$": "identity-obj-proxy",
  },
  transformIgnorePatterns: ["node_modules/(?!axios)"],
  testEnvironment: "jsdom",
  moduleFileExtensions: ["js", "jsx", "json", "ts", "tsx", "vue"],
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json'
    }
  }
};
