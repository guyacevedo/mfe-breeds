const singleSpaAngularWebpack =
  require("single-spa-angular/lib/webpack").default;

module.exports = (config, options) => {
  const singleSpaWebpackConfig = singleSpaAngularWebpack(config, options);
  // Feel free to modify this webpack config however you'd like to
  singleSpaWebpackConfig.output.libraryTarget = "module";
  delete singleSpaWebpackConfig.output.library;
  singleSpaWebpackConfig.experiments = {
    outputModule: true,
  };
  singleSpaWebpackConfig.output.scriptType = "module";
  return singleSpaWebpackConfig;
};
