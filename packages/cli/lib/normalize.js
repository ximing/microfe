const path = require('path');

let defaultConfig = {
    dev: {
        port: 9001,
        host: '127.0.0.1',
        output: path.join(process.cwd(), 'lib')
    },
    build: {
        publicPath: '/public/',
        output: path.join(process.cwd(), 'lib')
    },
    devtool: 'cheap-module-eval-source-map',
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
    themer: {}
};

module.exports = function(config, env) {
    let customConfig = Object.assign(
        {},
        defaultConfig,
        config,
        {
            dev: Object.assign({}, defaultConfig.dev, config.dev)
        },
        {
            build: Object.assign({}, defaultConfig.build, config.build)
        }
    );
    customConfig.entry = path.resolve(process.cwd(), customConfig.entry);
    if (typeof customConfig.entry === 'string') {
        customConfig.entry = {
            [customConfig.library]: customConfig.entry
        };
    }
    const finailConfig = Object.assign({}, customConfig, customConfig[env]);
    console.log(finailConfig);
    return finailConfig;
};
