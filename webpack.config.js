const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OfflinePlugin = require('offline-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');

module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: { minimize: true },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './src/index.html',
      filename: './index.html',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    new WebpackPwaManifest({
      name: 'Doodle',
      short_name: 'Doodle',
      description: 'For doodling',
      inject: true,
      ios: {
        'apple-mobile-web-app-status-bar-style': 'black-translucent',
      },
      background_color: '#ffffff',
      icons: [
        {
          src: path.resolve('src/icon.png'),
          sizes: [120, 152, 167, 180, 1024],
          destination: path.join('icon'),
          ios: true,
        },
        {
          src: path.resolve('src/icon.png'),
          size: 1024,
          destination: path.join('icon'),
          ios: 'startup',
        },
        {
          src: path.resolve('src/icon.png'),
          sizes: [36, 48, 72, 96, 144, 192, 512],
          destination: path.join('icon'),
        },
      ],
    }),
    new OfflinePlugin(),
  ],
  devtool: 'source-map',
};
