const path = require('path');

const HtmlWebpackPlugin = require("html-webpack-plugin")
const WebpackChromeEntriesPlugin = require("./WebpackChromeEntries");

module.exports = {
    entry: WebpackChromeEntriesPlugin.getEntries([
        path.resolve(__dirname, "./src/js/**/*.ts"),
        {
            path: path.resolve(__dirname, "./src/page/**/index.tsx"),
            extra: "HTML"
        },
    ]),
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        new WebpackChromeEntriesPlugin(),

        ...WebpackChromeEntriesPlugin.getHTMLEntries().map(item =>
            new HtmlWebpackPlugin({
                inject: false,
                filename: item + ".html",
                templateContent: ({ htmlWebpackPlugin }) =>
                    `<!doctype html><html lang="cn"><head><meta charset="utf-8"></head><body><div id="root"></div><script src="./index.js"></script></body></html>`
            })
        ),
    ],
    module: {
        rules: [
            {
                test: /\.scss|sass|css$/,
                use: ["style-loader", "css-loader", "sass-loader"],
            },
            {
                test: /\.tsx?$/,
                loader: 'ts-loader'
            }
        ]
    },
    devtool: "source-map"
};