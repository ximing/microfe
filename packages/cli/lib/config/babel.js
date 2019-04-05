module.exports = {
    "presets": [
        "@babel/react",
        [
            "@babel/preset-env",
            {
                "targets": {
                    "browsers": [
                        "last 4 versions",
                        "ie >= 10"
                    ]
                },
                "modules": false,
                "debug": true,
                "spec": false,
                "loose": false,
                "useBuiltIns": false,
                "include": [],
                "exclude": [],
                "forceAllTransforms": false
            }
        ],
        ["@babel/preset-typescript",{
            isTSX:true
        }]
    ],
    "ignore": [
        "node_modules/**",
        "dist"
    ],
    "plugins": [
        ["import", {
            "libraryName": "antd",
            "style": true
        }],
        "@babel/plugin-syntax-optional-chaining",
        "@babel/plugin-proposal-object-rest-spread",
        "@babel/plugin-transform-runtime",
        "@babel/plugin-syntax-dynamic-import",
        "@babel/plugin-syntax-import-meta",
        "@babel/plugin-proposal-class-properties",
        "@babel/plugin-proposal-json-strings",
        [
            "@babel/plugin-proposal-decorators",
            {
                "legacy": true
            }
        ],
        "@babel/plugin-proposal-function-sent",
        "@babel/plugin-proposal-export-namespace-from",
        "@babel/plugin-proposal-numeric-separator",
        "@babel/plugin-proposal-throw-expressions",
        "@babel/plugin-proposal-export-default-from",
        "@babel/plugin-proposal-logical-assignment-operators",
        "@babel/plugin-proposal-optional-chaining",
        [
            "@babel/plugin-proposal-pipeline-operator",
            {
                "proposal": "minimal"
            }
        ],
        "@babel/plugin-proposal-nullish-coalescing-operator",
        "@babel/plugin-proposal-do-expressions",
        "@babel/plugin-proposal-function-bind"
    ]
}
