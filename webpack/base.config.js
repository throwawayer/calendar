const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const { paths } = require('./vars');

const plugins = [
  new HtmlWebpackPlugin({
    template: path.resolve('index.html'),
    favicon: path.resolve('src', 'assets', 'images', 'favicon.ico'),
  }),
];

if (process.env.NODE_ENV === 'development') {
  plugins.push(new CleanWebpackPlugin.CleanWebpackPlugin());
  plugins.push(
    new CircularDependencyPlugin({
      exclude: /node_modules/,
      failOnError: false,
      allowAsyncCycles: false,
      cwd: process.cwd(),
    }),
  );
  plugins.push(new webpack.HotModuleReplacementPlugin());
  plugins.push(new webpack.LoaderOptionsPlugin({ debug: true }));
} else {
  plugins.push(
    new webpack.LoaderOptionsPlugin({ minimize: true, debug: false }),
    new webpack.ids.HashedModuleIdsPlugin(),
  );
}

module.exports = {
  context: paths.root,
  resolve: { extensions: ['.js', '.jsx'] },
  entry: ['babel-polyfill', paths.entry],
  output: {
    path: paths.output,
    filename: 'bundle.js',
    publicPath: '/',
  },
  plugins,
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: { cacheDirectory: true, babelrc: true },
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf||svg|png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ],
  },
};
