const path = require('path');
const glob = require('glob');
const globParent = require('glob-parent');

const directories = [];
const HTMLList = [];

class WebpackChromeEntries {
    static getEntries(globs) {
        if (typeof globs !== 'string' && !Array.isArray(globs)) {
            throw new TypeError('globOptions must be a string or an array of strings');
        }

        if (!Array.isArray(globs)) globs = [globs];

        const files = {};

        globs.forEach(function (globInfo) {
            let globString, globExtra;

            if (typeof globInfo === "string") {
                globString = globInfo;
            } else {
                globString = globInfo.path;
                globExtra = globInfo.extra;
            }

            const base = globParent(globString);

            if (!directories.includes(base)) {
                directories.push(base);
            }

            glob.sync(globString).forEach(function (file) {
                let entryName = path
                    .relative(base, file)
                    .replace(path.extname(file), '')
                    .split(path.sep)
                    .join('/');

                files[entryName] = file;
                
                if (globExtra === "HTML") {
                    HTMLList.push(entryName);
                }
            });
        });

        console.log(HTMLList);
        console.log(files);
        return files;
    }

    static getHTMLEntries() {
        return HTMLList;
    }

    apply(compiler) {
        if (compiler.hooks) {
            // Support Webpack >= 4
            compiler.hooks.afterCompile.tapAsync(this.constructor.name, this.afterCompile.bind(this));
        } else {
            // Support Webpack < 4
            compiler.plugin('after-compile', this.afterCompile);
        }
    }

    afterCompile(compilation, callback) {
        if (Array.isArray(compilation.contextDependencies)) {
            // Support Webpack < 4
            compilation.contextDependencies = compilation.contextDependencies.concat(directories);
        } else {
            // Support Webpack >= 4
            for (const directory of directories) {
                compilation.contextDependencies.add(path.normalize(directory));
            }
        }
        callback();
    }
}

module.exports = WebpackChromeEntries;