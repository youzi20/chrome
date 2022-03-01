




chrome.runtime.onInstalled.addListener(async ({ reason }) => {

  chrome.contextMenus.create(
    {
      id: "main",
      title: "测试右键菜单",
    },
    () => { console.log('测试右键菜单'); }
  );

  // chrome.contextMenus.create(
  //   {
  //     parentId: "main",
  //     id: "tab1",
  //     title: "测试tab1",
  //   },
  //   () => { console.log('测试tab1'); }
  // );
  // console.log(reason, chrome.runtime.OnInstalledReason.INSTALL);

  // if (reason === chrome.runtime.OnInstalledReason.INSTALL) {
  //   chrome.tabs.create({
  //     url: 'onboarding.html'
  //   });
  // }





});

// chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
//   console.log('收到来自content-script的消息：');
//   console.log(request, sender, sendResponse);
//   sendResponse('我是后台，我已收到你的消息：' + JSON.stringify(request));
// });

const getCurrentTab = async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  return tab;
}

const sendMessage = async () => {
  const tab = await getCurrentTab();

  chrome.tabs.sendMessage(
    tab.id,
    { greeting: '你好，我是background呀，我主动发消息给content-script！' },
    function (response) {
      console.log('收到来自content-script的回复：' + response);
    }
  );
}

chrome.contextMenus.onClicked.addListener(
  function (clickData, tab) {
    console.log('onClicked', clickData, "tab", tab)
    // sendMessage();
    injectedScript();
  }
);

const injectedScript = async () => {
  const tab = await getCurrentTab();
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ['document/index.js']
  });
}


