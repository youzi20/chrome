// @ts-nocheck

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
            title: "测试右键菜单",
        },
        () => { console.log('测试右键菜单'); }
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
        const { width, height } = request;
        chrome.windows.create({
            type: "popup",
            url: "./document/index.html",
            width: 375,
            height: 500,
            top: Math.floor((height - 500) / 2),
            left: Math.floor((width - 375) / 2),
        });
    }
}


// 首次安装
chrome.runtime.onInstalled.addListener(({ reason }) => {
    createContextMenus();
});


// 监听信息传输
chrome.runtime.onMessage.addListener(listenerOnMessage);


// chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
//     console.log(request, sender);
//     chrome.windows.create({ url: "./document/index.html", type: "popup", width: 1024, height: 768 });

//     sendResponse("以获取");
// });



// const sendMessage = async () => {
//     const tab = await getCurrentTab();

//     chrome.tabs.sendMessage(
//         tab.id,
//         { greeting: '你好，我是background呀，我主动发消息给content-script！' },
//         function (response) {
//             console.log('收到来自content-script的回复：' + response);
//         }
//     );
// }

// chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
//     console.log('script');
//     console.log(request, sender, sendResponse);
//     sendResponse('backg:' + JSON.stringify(request));
// });


// chrome.contextMenus.onClicked.addListener(
//     function (clickData, tab) {
//         console.log('onClicked', clickData, "tab", tab)
//         // sendMessage();
//         injectedScript();
//     }
// );




