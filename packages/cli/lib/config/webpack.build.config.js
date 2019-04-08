/**
 * Created by ximing on 2018/8/3.
 */
'use strict';
const path = require ('path');
const ManifestPlugin = require ('webpack-manifest-plugin');
const HtmlWebpackPlugin = require ('html-webpack-plugin');
const webpackMmerge = require ('webpack-merge');
const common = require ('./webpack.common.config');

module.exports = ({
  entry,
  library,
  externals,
  publicPath,
  output,
  themer,
  devtool,
}) => {
  let outputObj = {};
  if (typeof output === 'string') {
    outputObj = {
      path: output,
      library: library,
      libraryTarget: 'amd',
      filename: `${library}.[hash].js`,
      publicPath,
    };
  } else {
    outputObj = output;
  }
  return webpackMmerge (
    common ({
      externals,
      devMode: false,
      themer,
      output: outputObj,
      devtool,
    }),
    {
      mode: 'production',
      entry: entry,
      output: outputObj,
      module: {
        rules: [],
      },
      context: __dirname,
      target: 'web',
      stats: 'errors-only',
      plugins: [],
    }
  );
};
