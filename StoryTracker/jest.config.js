module.exports = {
  preset: 'react-native',
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|@react-native-community|@react-navigation|@react-native-firebase|@react-native-firebase/app)',
  ],
  setupFiles: [ "./node_modules/react-native-gesture-handler/jestSetup.js", "./__mocks__/setup.js" ]
};

