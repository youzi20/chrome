const path = require('path');

const FileTree = require("./FileTree");

const fileTree = new FileTree({
    entry: path.resolve(__dirname, "./src")
});

module.exports = {
    entry: fileTree.getEntry(path.resolve(__dirname, "./src/*/*/index.ts")),
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader'
            }
        ]
    },
};