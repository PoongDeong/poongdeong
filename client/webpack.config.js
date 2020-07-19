const path = require('path');

const HtmlWebPackPlugin = require('html-webpack-plugin');

const webpack = require('webpack');

const dotenv = require('dotenv');

dotenv.config();

module.exports = (env, options) => {
  dotenv.config({
    path: `env/${options.stage || 'server'}.env`,
  });

  return {
    entry: './src/index.jsx',
    output: {
      path: path.resolve(__dirname, 'dist/'),
      filename: 'main.[contenthash].js',
    },
    node: {
      fs: 'empty',
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: 'babel-loader',
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(jpeg|png)$/,
          use: 'file-loader',
        },
      ],
    },
    plugins: [
      new HtmlWebPackPlugin({
        template: './index.html',
        filename: 'index.html',
      }),
      new webpack.DefinePlugin({
        'process.env.API_URL': JSON.stringify(process.env.API_URL),
      }),
      new webpack.EnvironmentPlugin(['API_URL']),
    ],
    resolve: {
      extensions: ['.js', '.jsx'],
    },
    devServer: {
      historyApiFallback: {
        index: 'index.html',
      },
    },
  };
};
