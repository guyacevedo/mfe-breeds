const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react-ts");

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "mfe-breeds",
    projectName: "mfe-react",
    webpackConfigEnv,
    argv,
    outputSystemJS: false,
  });

  return merge(defaultConfig, {
    // modify the webpack config however you'd like to by adding to this object
    devServer: {
      port: 8080,
      headers: {
        "Access-Control-Allow-Origin": "*", // Permite que el puerto 9000 lea este JS
      },
    },
    output: {
      libraryTarget: "module", // Ya deberías tenerlo
    },
    experiments: {
      outputModule: true, // Ya deberías tenerlo
    },
    externals: [
      "react",
      "react-dom",
      "react-dom/client", // <--- Añade esto aquí
      "single-spa",
      "rxjs",
      "@mfe-breeds/mfe-shared",
      "@babel/runtime",
    ],
  });
};
