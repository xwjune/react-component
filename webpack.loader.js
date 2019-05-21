const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');

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
      {
        loader: 'postcss-loader',
        options: {
          plugins: [
            autoprefixer({
              browsers: [
                'last 5 versions',
                'last 5 Chrome versions',
                'Firefox >= 17',
                'ie >= 8',
                'iOS >= 8',
                'Android >= 4',
              ],
            }),
          ]
        },
      },
      'sass-loader',
    ],
  },
];

module.exports = loaders;
