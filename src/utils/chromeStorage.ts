// @ts-nocheck

export const getChromeStorageSync = (key, callback) => {
    chrome.storage.sync.get(key, function (result) {
        callback(result[key]);
    });
}

