/**
 * Created by yeanzhi on 17/1/13.
 */
'use strict';
module.exports ={
    // parser: require('postcss-scss'),
    plugins: [
        require('postcss-clearfix')(),
        require('cssnano')({
            preset: ['default', {}]
        }),
        require('autoprefixer')({
            browsers: ['last 5 versions', 'Android >= 4.0', 'iOS >= 7']
        })
    ]
}
