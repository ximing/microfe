/**
 * Created by ximing on 2018/8/3.
 */
'use strict';
const path = require('path');
const ManifestPlugin = require('webpack-manifest-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpackMmerge = require('webpack-merge');
const common = require('./webpack.common.config');

module.exports = ({entry, library, externals,publicPath,outputPath,themer}) => webpackMmerge(common({externals, devMode: false,themer}), {
    mode: 'production',
    entry: entry,
    output: {
        path: outputPath,
        library: library,
        libraryTarget: 'amd',
        filename: `${library}.[hash].js`,
        publicPath
    },
    module: {
        rules: []
    },
    devtool: 'cheap-module-eval-source-map',
    context: __dirname,
    target: 'web',
    stats: 'errors-only',
    plugins: []
});
