const CopyWebpackPlugin = require("copy-webpack-plugin");
const WasmPackPlugin = require("@wasm-tool/wasm-pack-plugin");
const path = require('path');
// https://stackoverflow.com/questions/66734558/is-it-possible-to-use-wasm-bindgen-with-webpack-5
module.exports = {
  mode: 'development',
  entry: "./bootstrap.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bootstrap.js",
    clean: true
  },
  plugins: [
    new CopyWebpackPlugin({patterns: ['index.html', '*.jpg']}),
  //   new WasmPackPlugin({
  //     crateDirectory: path.resolve(__dirname, "..")
  // })
  ],
  experiments: {
    asyncWebAssembly: true
  },
  devServer: {
    static: './dist',
    historyApiFallback: true,
    open: true,
    compress: true,
    hot: true,
  },
};
