/**
 * Created by yeanzhi on 16/7/19.
 */
'use strict';
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpackMerge = require('webpack-merge');

// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
let env = process.env.NODE_ENV || 'development';
const babel = require('./babel');
const postcss = require('./postcss');

const varToSass = function(themes) {
    return Object.keys(themes).reduce(function(pre, key) {
        pre += `$${key}:${themes[key]};`;
        return pre;
    }, '');
};

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
    resolve,
    plugins = [],
    reactHotLoader = false,
    babelSetting = {}
} = {}) => {
    let cleanDist = output;
    if (typeof output !== 'string') {
        cleanDist = output.path;
    }
    console.log('cleanDist', cleanDist);
    return webpackMerge(
        {
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
                                babel(reactHotLoader, babelSetting)
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
                    //         babel(reactHotLoader)
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
                            {
                                loader: 'style-loader'
                            },
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
                    },
                    {
                        test: /\.(scss)(\?.*)?$/,
                        use: [
                            {
                                loader: 'style-loader'
                            },
                            {
                                loader: 'css-loader'
                            },
                            {
                                loader: 'postcss-loader',
                                options: postcss
                            },
                            {
                                loader: 'sass-loader',
                                options: {
                                    data: varToSass(themer)
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
            optimization: {
                // runtimeChunk: {
                //     name: (entrypoint) => `runtime~${entrypoint.name}`
                // },
            },
            plugins: [
                // new MiniCssExtractPlugin({
                //     filename: devMode ? '[name].css' : '[name].[hash].css',
                //     chunkFilename: devMode ? '[id].css' : '[id].[hash].css'
                // }),
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
        },
        {
            plugins
        }
    );
};
