console.log(1)


// chrome.runtime.sendMessage({ greeting: '你好，我是content-script呀，我主动发消息给后台！' }, function (response) {
//     console.log('收到来自后台的回复：' + response);
// });


chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log('收到来自background的消息：');
  console.log(request, sender, sendResponse);
  sendResponse('我是content-script，我已收到你的消息：' + JSON.stringify(request));
});