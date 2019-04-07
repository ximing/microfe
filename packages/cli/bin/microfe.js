#!/usr/bin/env node
var program = require('commander');

program
    .version('1.0.0')
    .usage('<command> [options]')
    .command('build [config]', '构建模式')
    .command('dev [config]', '开发模式')
    .parse(process.argv);
