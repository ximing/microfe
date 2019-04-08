/**
 * Created by ximing on 2018/8/3.
 */
'use strict';
const path = require ('path');
const webpackMmerge = require ('webpack-merge');
const common = require ('./webpack.common.config');

module.exports = ({
  port,
  host,
  entry,
  library,
  externals,
  output,
  themer,
  devtool,
}) => {
  let outputObj = {};
  if (typeof output === 'string') {
    outputObj = {
      path: output,
      library,
      libraryTarget: 'amd',
      filename: `${library}.js`,
      publicPath: `http://${host}:${port}/`,
    };
  } else {
    outputObj = output;
  }
  return webpackMmerge (
    common ({
      externals,
      devMode: true,
      themer,
      output: outputObj,
      devtool,
    }),
    {
      mode: 'development',
      entry,
      output: outputObj,
      module: {
        rules: [],
      },
      context: __dirname,
      target: 'web',
      devServer: {
        proxy: {},
        publicPath: '/',
        contentBase: path.join (process.cwd (), 'public'),
        compress: false, // enable gzip compression
        historyApiFallback: true,
        hot: true,
        https: false, // true for self-signed, object for cert authority
        noInfo: false, // only errors & warns on hot reload
        port,
        host,
        disableHostCheck: true,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
          'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
        },
      },
      plugins: [],
    }
  );
};
