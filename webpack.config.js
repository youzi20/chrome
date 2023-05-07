const path = require('path');
const uglify = require('uglifyjs-webpack-plugin');

const HtmlWebpackPlugin = require("html-webpack-plugin")
const WebpackChromeEntriesPlugin = require("./WebpackChromeEntries");

module.exports = {
    mode: "production",
    entry: WebpackChromeEntriesPlugin.getEntries([
        path.resolve(__dirname, "./src/js/**/*.ts"),
        {
            path: path.resolve(__dirname, "./src/page/**/index.tsx"),
            extra: "HTML"
        },
    ]),
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'public'),
    },
    plugins: [
        new uglify(),
        new WebpackChromeEntriesPlugin(),
        ...WebpackChromeEntriesPlugin.getHTMLEntries().map(item =>
            new HtmlWebpackPlugin({
                inject: false,
                filename: item + ".html",
                templateContent: ({ htmlWebpackPlugin }) =>
                    `<!doctype html><html lang="cn"><head><meta charset="utf-8"><link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Montserrat:300,400,500,700"></head><body><div id="root"></div><script src="./index.js"></script></body></html>`
            })
        ),
    ],
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },
    module: {
        rules: [
            {
                test: /\.scss|sass|css$/,
                use: ["style-loader", "css-loader", "sass-loader"],
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ]
    },
    devtool: "source-map"
};