const base = {
    presets: [
        [
            require('@babel/preset-env').default,
            {
                targets: {
                    browsers: ['last 4 versions', 'ie >= 10']
                },
                modules: false,
                debug: false,
                spec: false,
                loose: false,
                useBuiltIns: false,
                include: [],
                exclude: [],
                forceAllTransforms: false
            }
        ],
        require('@babel/preset-react').default,
        require('@babel/preset-typescript').default
    ],
    // ignore: ['node_modules/**'],
    plugins: [
        [
            require('@babel/plugin-proposal-decorators').default,
            {
                legacy: true
            }
        ],
        require('@babel/plugin-syntax-optional-chaining').default,
        require('@babel/plugin-proposal-object-rest-spread').default,
        require('@babel/plugin-transform-runtime').default,
        require('@babel/plugin-syntax-dynamic-import').default,
        require('@babel/plugin-syntax-import-meta').default,
        [require('@babel/plugin-proposal-class-properties').default, { loose: true }],
        require('@babel/plugin-proposal-json-strings').default,
        require('@babel/plugin-proposal-function-sent').default,
        require('@babel/plugin-proposal-export-namespace-from').default,
        require('@babel/plugin-proposal-numeric-separator').default,
        require('@babel/plugin-proposal-throw-expressions').default,
        require('@babel/plugin-proposal-export-default-from').default,
        require('@babel/plugin-proposal-logical-assignment-operators').default,
        require('@babel/plugin-proposal-optional-chaining').default,
        [
            require('@babel/plugin-proposal-pipeline-operator').default,
            {
                proposal: 'minimal'
            }
        ],
        require('@babel/plugin-proposal-nullish-coalescing-operator').default,
        require('@babel/plugin-proposal-do-expressions').default,
        require('@babel/plugin-proposal-function-bind').default
    ]
}
module.exports = (reactHotLoader=false,babelSetting={})=>{
    if(reactHotLoader){
        base.plugins.push(require("react-hot-loader/babel"))
    }
    if(babelSetting && babelSetting.plugins){
        base.plugins = base.plugins.concat(babelSetting.plugins)
    }
    if(babelSetting && babelSetting.presets){
        base.presets = base.presets.concat(babelSetting.presets)
    }
    return base;
};
