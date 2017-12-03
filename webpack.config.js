"use strict";
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        "wwwroot/bundle": "./_src/app/app.tsx",
        "wwwroot/site": "./_site/app/app.tsx",
        "wwwsite/site": "./_site/app/app.tsx",
    },
    output: {
        filename: "[name].js",
        path: __dirname
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'wwwroot/index.html',
            template: '_src/app/index.html',
            chunks: ['wwwroot/bundle'],
            inject: false
          }),
          new HtmlWebpackPlugin({
            filename: 'wwwroot/site.html',
            template: '_site/app/index.html',
            chunks: ['wwwroot/site'],
            inject: false
          }),
            new HtmlWebpackPlugin({
          filename: 'wwwsite/index.html',
          template: '_site/app/index.html',
          chunks: ['wwwsite/site'],
          inject: false
        })
    ],
    devtool: "source-map",
    resolve: {
        extensions: [ 
            '.png',
            '.jpg',
            '.gif',
            '.svg',
            '.css',
            '.scss',
            '.tsx', 
            '.ts', 
            '.js', 
            '.json' 
        ]
    },
    module: {
        rules: [
            { 
                // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
                enforce: "pre", 
                test: /\.js$/, 
                loader: "source-map-loader" 
            },
            {
                // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
                test: /\.tsx?$/, 
                loader: "awesome-typescript-loader" 
            },
            {
                test: /\.scss$/,
                use: [
                    { 
                        loader: "style-loader"
                    },
                    {
                        loader: "typings-for-css-modules-loader",
                        options: {
                            namedExport: true,
                            camelCase: true,
                            modules: true
                        }
                    },
                    { 
                        loader: "sass-loader"
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [
                    { loader: 'style-loader' },
                    {
                        loader: 'typings-for-css-modules-loader',
                        options: {
                            namedExport: true,
                            camelCase: true,
                            modules: true
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpg|gif|svg)(\?\S*)?$/,
                exclude: /node_modules/,
                loader: 'file-loader',
                options: {}  
            }
        ],
    }
};