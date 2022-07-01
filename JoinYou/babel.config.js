module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      "babel-preset-expo",
      // We add the following code
      "module:metro-react-native-babel-preset",
      "module:react-native-dotenv",
      // End of added code
    ],
  };
};
