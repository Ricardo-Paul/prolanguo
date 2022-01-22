module.exports = {
  "presets": ["module:metro-react-native-babel-preset"],
  "env": {
    "production": {
      "plugins": ["transform-remove-console"]
    }
  },
  "plugins": [
    // trying to make @observable decorator work
    // ["@babel/plugin-proposal-decorators", { "legacy": true }],
    ["@babel/plugin-proposal-decorators", { "legacy": true }],
    ["@babel/plugin-proposal-class-properties", { "loose": false }]
  ]
}