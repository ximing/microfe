/**
 * Created by yeanzhi on 16/7/19.
 */
'use strict';
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
let env = process.env.NODE_ENV || 'development';
const babel = require('./babel');
const postcss = require('./postcss');

module.exports = ({
    externals = [
        /^lodash$/,
        /^jquery$/,
        /^single-spa$/,
        /^react$/,
        /^react\/lib.*/,
        /^react-dom$/,
        /.*react-dom.*/,
        /^rxjs\/?.*$/
    ],
    devMode = false,
    themer = {},
    output,
    devtool,
                      resolve
} = {}) => {
    let cleanDist = output;
    if (typeof output !== 'string') {
        cleanDist = output.path;
    }
    console.log('cleanDist', cleanDist);
    return {
        devtool,
        module: {
            rules: [
                {
                    test: /\.(js|ts)x?$/,
                    exclude: /(node_modules)/,
                    use: {
                        loader: 'babel-loader',
                        options: Object.assign(
                            {},
                            {
                                babelrc: false,
                                configFile: false,
                                compact: false
                            },
                            babel
                        )
                    }
                },
                // {
                //   test: /\.(ts)x?$/,
                //   exclude: /(node_modules)/,
                //   use: [
                //     {
                //       loader: 'babel-loader',
                //       options: Object.assign (
                //         {},
                //         {
                //           babelrc: false,
                //           configFile: false,
                //           compact: false,
                //         },
                //         babel
                //       ),
                //     },
                //     {
                //       loader: 'ts-loader',
                //     },
                //   ],
                // },
                {
                    test: /\.(png|jpe?g|gif|svg|mp4|webm|ogg|mp3|wav|flac|aac|woff2?|eot|ttf|otf)(\?.*)?$/,
                    use: [
                        {
                            loader: 'url-loader',
                            options: {
                                limit: 8192
                            }
                        }
                    ]
                },
                {
                    test: /\.worker\.js$/,
                    use: {
                        loader: 'worker-loader',
                        options: { inline: true, fallback: false }
                    }
                },
                {
                    test: /\.(css|less)(\?.*)?$/,
                    use: [
                        devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader'
                        },
                        {
                            loader: 'postcss-loader',
                            options: postcss
                        },
                        {
                            loader: 'less-loader',
                            options: {
                                modifyVars: themer,
                                javascriptEnabled: true
                            }
                        }
                    ]
                }
            ]
        },
        resolve,
        node: {
            fs: 'empty'
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: devMode ? '[name].css' : '[name].[hash].css',
                chunkFilename: devMode ? '[id].css' : '[id].[hash].css'
            }),
            new CleanWebpackPlugin([cleanDist], {
                root: process.cwd(),
                dangerouslyAllowCleanPatternsOutsideProject: true
            }),
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: JSON.stringify(env)
                }
            }),
            new webpack.ProvidePlugin({})
        ],
        externals
    };
};
