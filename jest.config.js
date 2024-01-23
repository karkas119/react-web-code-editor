const config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(ts|tsx)$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.json',
        isolatedModules: true
      }
    ]
  },
  moduleNameMapper: {
    '\\.(css|less)$': 'identity-obj-proxy'
  }
};

module.exports = config;
