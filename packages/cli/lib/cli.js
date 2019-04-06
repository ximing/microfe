#!/usr/bin/env node
const program = require('commander');
const path = require('path');
const build = require('./build');
const dev = require('./dev');

program
    .version('0.0.1')
    .option('-d, --dev', '开发模式')
    .option('-b, --build', '构建模式')
    .parse(process.argv);

let defaultConfig = {
    dev: {
        port: 9001,
        outputPath:  path.join(process.cwd(), 'lib')
    },
    build: {
        publicPath: '/public/',
        outputPath: path.join(process.cwd(), 'lib')
    },
    entry: './src/index',
    library: 'demo',
    externals: [
        /^lodash$/,
        /^jquery$/,
        /^single-spa$/,
        /^react$/,
        /^react\/lib.*/,
        /^react-dom$/,
        /.*react-dom.*/,
        /^rxjs\/?.*$/
    ],
    themer:{}
};
let config = {};
let configPath = process.argv[process.argv.length - 1];
configPath = path.resolve(process.cwd(), configPath);
try {
    config = require(configPath);
} catch (e) {
    console.warn(`没有找到自定义config: ${configPath},使用默认配置`)
}

function cli() {
    let customConfig = Object.assign({}, defaultConfig, config,{
        dev:Object.assign({},defaultConfig.dev,config.dev)
    },{
        build:Object.assign({},defaultConfig.build,config.build)
    });
    customConfig.entry = path.resolve(process.cwd(), customConfig.entry);
    if (typeof customConfig.entry === 'string') {
        customConfig.entry = {
            [customConfig.library]: customConfig.entry
        }
    }
    console.log(customConfig)
    if (program.dev) {
        dev(Object.assign({}, customConfig.dev, customConfig));
    } else if (program.build) {
        build(Object.assign({}, customConfig.build, customConfig));
    }
}

cli();