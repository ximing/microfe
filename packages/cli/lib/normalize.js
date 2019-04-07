let defaultConfig = {
  dev: {
    port: 9001,
    output: path.join (process.cwd (), 'lib'),
  },
  build: {
    publicPath: '/public/',
    output: path.join (process.cwd (), 'lib'),
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
    /^rxjs\/?.*$/,
  ],
  themer: {},
};

module.exports = function (config) {
  let customConfig = Object.assign (
    {},
    defaultConfig,
    config,
    {
      dev: Object.assign ({}, defaultConfig.dev, config.dev),
    },
    {
      build: Object.assign ({}, defaultConfig.build, config.build),
    }
  );
  customConfig.entry = path.resolve (process.cwd (), customConfig.entry);
  if (typeof customConfig.entry === 'string') {
    customConfig.entry = {
      [customConfig.library]: customConfig.entry,
    };
  }
  return customConfig;
};
