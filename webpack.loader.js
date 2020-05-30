const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const loaders = [
  {
    test: /\.(js|jsx)$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
      options: {
        plugins: [
          [
            '@babel/plugin-transform-runtime',
            {
              corejs: 2,
            },
          ],
        ],
      },
    },
  }, {
    test: /\.scss$/,
    exclude: /node_modules/,
    use: [
      MiniCssExtractPlugin.loader,
      'css-loader',
      'postcss-loader',
      'sass-loader',
    ],
  },
];

module.exports = loaders;
