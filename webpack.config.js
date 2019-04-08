const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // 提取css到单独文件的插件
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin'); // 压缩css插件
const loaders = require('./webpack.loader');

const reactExternal = {
  root: 'React',
  commonjs2: 'react',
  commonjs: 'react',
  amd: 'react',
};
const reactDOMExternal = {
  root: 'ReactDOM',
  commonjs2: 'react-dom',
  commonjs: 'react-dom',
  amd: 'react-dom',
};

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'components-react.js',
    library: 'ComponentsReact',
    libraryTarget: 'umd',
  },
  resolve: {
    extensions: ['.js', 'jsx'],
  },
  module: {
    rules: loaders,
  },
  externals: {
    'react': reactExternal,
    'react-dom': reactDOMExternal,
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'components-react.css',
    }),
    new OptimizeCssAssetsPlugin(),
  ],
};
