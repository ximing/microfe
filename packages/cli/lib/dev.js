const webpack = require('webpack');
const webpackDevConfig = require('./config/webpack.dev.config');
const format = require('./format');

module.exports = function (opts) {

    const compiler = webpack(webpackDevConfig(opts));
    format(compiler);
    const watching = compiler.watch({
        // Example watchOptions
        aggregateTimeout: 300
    }, (err, stats) => {
        if (err) {
            console.error(err)
        }
    });
}