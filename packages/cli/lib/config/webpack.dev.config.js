/**
 * Created by ximing on 2018/8/3.
 */
'use strict';
const path = require('path');
const webpackMmerge = require('webpack-merge');
const common = require('./webpack.common.config');

module.exports = ({port,entry,library,externals,outputPath,themer})=> webpackMmerge(common({externals,devMode:true,themer}), {
    mode: 'development', // "production" | "development" | "none"
    entry,
    output: {
        path: outputPath,
        library: library,
        libraryTarget: 'amd',
        filename: `${library}.js`,
        publicPath: `http://127.0.0.1:${port}/`
    },
    module: {
        rules: [

        ]
    },
    devtool: 'cheap-module-eval-source-map',
    context: __dirname,
    target: 'web',
    devServer: {
        proxy: {},
        contentBase: path.join(__dirname, 'public'), // boolean | string | array, static file location
        compress: false, // enable gzip compression
        historyApiFallback: true, // true for index.html upon 404, object for multiple paths
        hot: true, // hot module replacement. Depends on HotModuleReplacementPlugin
        https: false, // true for self-signed, object for cert authority
        noInfo: false, // only errors & warns on hot reload
        port,
        host: '0.0.0.0',
        disableHostCheck: true,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
            'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
        }
    },
    plugins: []
});