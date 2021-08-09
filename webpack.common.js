const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const ASSET_PATH = process.env.ASSET_PATH || "/";

module.exports = {
  entry: {
    app: "./src/app.js",
  },
  output: {
    path: path.resolve(__dirname, "dist", ASSET_PATH === "/" ? "" : ASSET_PATH),
    filename: "static/chunks/[name].[contenthash].js",
    chunkFilename: "static/chunks/[id].[contenthash].js",
    publicPath: ASSET_PATH,
    assetModuleFilename: "images/[hash][ext][query]",
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg|jpeg|gif)]/i,
        type: "asset/resource",
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192,
            },
          },
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          "css-loader",
          "sass-loader",
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "static/css/[name].[contenthash].css",
      chunkFilename: "static/css/[id].[contenthash].css",
    }),
    new HtmlWebpackPlugin({
      template: "./src/views/index.html",
      favicon: "./public/favicon.png",
      chunks: ["app"],
      filename: "index.html",
    }),
    new CopyPlugin({
      patterns: [
        {
          from: "./public",
          to: "./",
        },
      ],
    }),
  ],
};
