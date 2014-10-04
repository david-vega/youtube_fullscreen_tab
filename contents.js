function injectedMethod (tab, method, callback) {
  chrome.tabs.executeScript(tab.id, { file: 'inject.js' }, function(){
    chrome.tabs.sendMessage(tab.id, { method: method }, callback);
  });
}

function getUrl (tab) {
  injectedMethod(tab, 'getUrl', function (response) {
    var url = "http://www.youtube.com/v/" + response.data;
    chrome.tabs.create({ url: url });
    return true;
  });
}
// When the browser action is clicked, call the
// getUrl function.
chrome.browserAction.onClicked.addListener(getUrl);
