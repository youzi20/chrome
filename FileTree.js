const fs = require("fs");

const FileTree = function ({
    entry
}) {
    this._tree = this.getDirTree(entry);
}

FileTree.prototype.getDirTree = function (entry) {
    const _this = this;
    const tree = fs.readdirSync(entry);

    const pathList = [];

    console.log("tree", entry, tree);

    if (tree.length > 0) {
        tree.forEach(item => {
            const path = [entry, item].join("/");

            // console.log("path", path)

            if (item.indexOf(".") >= 0) {
                pathList.push(path);
            }

            if (item.indexOf(".") < 0) {
                const child = _this.getDirTree(path);
                // console.log("child", child)

                child?.forEach(item => {
                    if (item) pathList.push(item);
                })
            }
        });
    } else {
        pathList.push(entry);
    }

    return pathList;
}

FileTree.prototype.getEntry = function (reString) {
    const entry = {};

    const re = new RegExp(reString.replace(/\*/ig, "(.*)"), "i");

    this._tree.forEach(item => {
        const match = item.match(re);

        if (match) {
            entry[match[2]] = item;
        }
    });

    return entry;
}

FileTree.prototype.getPage = function () {

}

// const path = require('path');

// const fileTree = new FileTree({
//     entry: path.resolve(__dirname, "./src")
// });

// fileTree.getEntry(path.resolve(__dirname, "./src/*/*/index.ts"))

module.exports = FileTree;