const path = require('path');
const chalk = require('chalk');

module.exports = function(configPath) {
    let config = {};
    try {
        configPath = path.resolve(process.cwd(), configPath);
        config = require(configPath);
    } catch (e) {
        console.warn(chalk.yellow(`没有找到自定义config: ${configPath},使用默认配置`));
    }
    return config;
};
