module.exports = {
  clearMocks: true,
  coverageDirectory: 'coverage',
  testEnvironment: 'jsdom',
  globals: {
    window: true,
  },
  coveragePathIgnorePatterns: ['/node_modules/'],

  testPathIgnorePatterns: ['/node_modules/'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/node_modules/babel-jest',
  },

  moduleNameMapper: {
    // ----------- Order of declaration matters -------------
    //"^.+\\.(css|less|scss)$": "babel-jest",
    // "^.+\\.(css|less|scss)$": "identity-obj-proxy",
    '.+\\.(css|styl|less|sass|scss|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      'jest-transform-stub',
    // "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/fileMocks.js",
    //"^common/(.*)$": "<rootDir>/src/common/$1",
    "^semantic-ui-react(.*)$": "<rootDir>/node_modules/semantic-ui-react$1",
    //"^@/(.*)$": "<rootDir>/src/$1",
  },
  moduleDirectories: ['src', 'node_modules'],
};
