// @ts-nocheck
chrome.storage.sync.clear()

const getCurrentTab = async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    return tab;
}

const createContextMenus = () => {
    const injectedScript = async () => {
        const tab = await getCurrentTab();
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            files: ['./dist/document/injected-script.js']
        });
    }

    chrome.contextMenus.create(
        {
            id: "main",
            title: "采集网页内容",
        },
        () => { console.log('采集网页内容'); }
    );

    chrome.contextMenus.onClicked.addListener(
        function (clickData, tab) {
            console.log('onClicked', clickData, "tab", tab)
            injectedScript();
        }
    );
}

const listenerOnMessage = (request, sender, sendResponse) => {
    console.log(request);
    sendResponse(true);

    const { ticker } = request;

    if (ticker === "document-injected-script") {
        const { storageKey, width, height } = request;
        chrome.windows.create({
            type: "popup",
            url: "./dist/document/index.html?storageKey=" + storageKey,
            width: 375,
            height: 500,
            top: Math.floor((height - 500) / 2),
            left: Math.floor((width - 375) / 2),
        }, () => {
            console.log("创建成功");
        });
    }
}


// 首次安装
chrome.runtime.onInstalled.addListener(({ reason }) => {
    createContextMenus();
});


// 监听信息传输
chrome.runtime.onMessage.addListener(listenerOnMessage);