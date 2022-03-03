console.log("onload")




// chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
//   console.log('收到来自background的消息：');
//   console.log(request, sender, sendResponse);
//   sendResponse('我是content-script，我已收到你的消息：' + JSON.stringify(request));
// });



window.addEventListener("message", function (e) {

    chrome.runtime.sendMessage(
        { ...e.data, width: window.outerWidth, height: window.outerHeight },
        function (response) {
            console.log('收到来自后台的回复：' + response);
        });
}, false);