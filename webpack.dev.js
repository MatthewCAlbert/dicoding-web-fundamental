const webpack = require("webpack");
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "development",
  devServer: {
    compress: true,
    historyApiFallback: true,
    port: 8080,
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
});
