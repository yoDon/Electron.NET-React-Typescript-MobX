"use strict";
var path = require('path');

module.exports = {
    entry: "./_src/app.tsx",
    output: {
        filename: "bundle.js",
        path: path.join(__dirname, "wwwroot"),
        publicPath: "/"
    },
    devtool: "source-map",
    resolve: {
        extensions: [ 
            '.png',
            '.jpg',
            '.gif',
            '.html', 
            '.tsx', 
            '.ts', 
            '.js', 
            '.json' 
        ]
    },
    module: {
        rules: [
            { 
                // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
                test: /\.tsx?$/, 
                loader: "awesome-typescript-loader" 
            },
            { 
                // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
                enforce: "pre", 
                test: /\.js$/, 
                loader: "source-map-loader" 
            },
            {
                test: /\.(html)$/,
                exclude: /node_modules/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]'
                }  
            },
            {
                test: /\.(png|jpg|gif)$/,
                exclude: /node_modules/,
                loader: 'file-loader',
                options: {}  
            }
        ],
    }
};