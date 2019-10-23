/**
 * Created by ximing on 2018/8/3.
 */
'use strict';
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpackMmerge = require('webpack-merge');
const common = require('./webpack.common.config');

module.exports = ({
    entry,
    library,
    externals,
    publicPath,
    output,
    themer,
    devtool,
    resolve,
    plugins,
    babelSetting
}) => {
    let outputObj = {};
    if (typeof output === 'string') {
        outputObj = {
            path: output,
            library: library,
            libraryTarget: 'amd',
            filename: `[name].[chunkhash].js`,
            publicPath
        };
    } else {
        outputObj = output;
    }
    return webpackMmerge(
        common({
            externals,
            devMode: false,
            themer,
            output: outputObj,
            devtool,
            resolve,
            plugins,
            babelSetting
        }),
        {
            mode: 'production',
            entry: entry,
            output: outputObj,
            module: {
                rules: []
            },
            context: __dirname,
            target: 'web',
            stats: 'errors-only',
            plugins: [new webpack.HashedModuleIdsPlugin(), new webpack.NamedChunksPlugin()]
        }
    );
};
