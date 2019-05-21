const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // 提取css到单独文件的插件
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin'); // 压缩css插件
const pkg = require('./package.json');
const loaders = require('./webpack.loader');
const entry = require('./webpack.entry');

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
  entry: {
    [pkg.name]: [
      ...entry,
      './src/index',
    ],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    library: 'junReact',
    libraryTarget: 'umd',
  },
  resolve: {
    extensions: ['.js', 'jsx'],
  },
  module: {
    rules: loaders,
  },
  externals: {
    react: reactExternal,
    'react-dom': reactDOMExternal,
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new OptimizeCssAssetsPlugin(),
    new webpack.BannerPlugin(`${pkg.name} v${pkg.version}\n\nCopyright ${pkg.author}, Inc.\nAll rights reserved.`),
  ],
};
