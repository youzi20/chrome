// @ts-nocheck
console.log("init");

chrome.storage.sync.clear()

const getCurrentTab = async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    return tab;
}

const CONTEXT_MENUS = [
    { id: "collect", title: "采集网页内容" },
    { parentId: "collect", id: "collect_select", title: "手动选择" },
    { parentId: "collect", id: "collect_image", title: "采集所有图片" },
]

const createContextMenus = () => {
    const injectedScript = async (files) => {
        const tab = await getCurrentTab();
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            files
        });
    }

    CONTEXT_MENUS.forEach(menu =>
        chrome.contextMenus.create(menu,
            () => {
                console.log('contextMenus: success')
            }
        )
    );

    chrome.contextMenus.onClicked.addListener(
        function (info, tab) {
            console.log('onClicked', info, "tab", tab)

            const { menuItemId } = info;

            if (menuItemId === "collect_select") injectedScript(['./document/injected-collect.js']);
        }
    );
}

const listenerOnMessage = (request, sender, sendResponse) => {
    sendResponse(true);

    console.log(request);

    const { ticker } = request;

    if (ticker === "document-injected-script") {
        const { storageKey, width, height } = request;
        chrome.windows.create({
            type: "popup",
            url: "./document/index.html?storageKey=" + storageKey,
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

// const root = document.evaluate('//*[@id="main-content"]/div[2]/navigation-tree/div[2]', document).iterateNext();

// const list = root.querySelectorAll(".direction-column > .navigation-tree__link");

// const item = [];

// list.forEach(el => {
//     if (el.nodeName === "BUTTON") {
//         const child = [], next = el.nextElementSibling;

//         next.querySelectorAll(".navigation-tree__link").forEach(child =>
//             child.push({ name: child.querySelector(".article-title").innerText })
//         )

//         item.push({
//             name: el.querySelector(".section-title").innerText,
//             child
//         })
//     } else {
//         item.push({ name: el.querySelector(".article-title").innerText })
//     }
// })

// JSON.stringify(item);