const webpack = require('webpack');
const chalk = require('chalk');
const WebpackDevServer = require('webpack-dev-server');

const webpackDevConfig = require('./config/webpack.dev.config');
const format = require('./format');

module.exports = function(opts) {
    const devConfig = webpackDevConfig(opts);
    const compiler = webpack(devConfig);
    const devServer = new WebpackDevServer(compiler, devConfig.devServer);
    format(compiler);
    devServer.listen(opts.port, opts.host, (err) => {
        if (err) {
            return console.log(err);
        }
        console.log(
            chalk.cyan('Starting the development server...'),
            chalk.blue(`http://${opts.host}:${opts.port}`)
        );
    });

    ['SIGINT', 'SIGTERM'].forEach(function(sig) {
        process.on(sig, function() {
            console.log(chalk.red('close dev server'));
            devServer.close();
            process.exit();
        });
    });
};
