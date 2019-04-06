const webpack = require('webpack');
const chalk = require('chalk');
const WebpackDevServer  = require('webpack-dev-server');

const webpackDevConfig = require('./config/webpack.dev.config');
const format = require('./format');

module.exports = function (opts) {
    const devConfig = webpackDevConfig(opts)
    const compiler = webpack(devConfig);
    const devServer = new WebpackDevServer (compiler, devConfig.devServer);
    format(compiler);
    devServer.listen(opts.port, devConfig.devServer.host, err => {
        if (err) {
            return console.log(err);
        }
        console.log(chalk.cyan('Starting the development server...\n'));
    });

    ['SIGINT', 'SIGTERM'].forEach(function(sig) {
        process.on(sig, function() {
            devServer.close();
            process.exit();
        });
    });
}