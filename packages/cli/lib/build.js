const webpack = require('webpack');
const webpackBuildConfig = require('./config/webpack.build.config');
const format = require('./format');

module.exports = function (opts) {
    const compiler = webpack(webpackBuildConfig(opts));
    format(compiler);
    compiler.run((err, stats) => {
        if (err) {
            console.error(err)
        }
    });
}