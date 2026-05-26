const transliteratedTabs = new Set();

chrome.action.onClicked.addListener((tab) => {
  if (transliteratedTabs.has(tab.id)) {
    transliteratedTabs.delete(tab.id);
    chrome.tabs.reload(tab.id);
  } else {
    transliteratedTabs.add(tab.id);
    chrome.tabs.sendMessage(tab.id, { action: 'transliterate' });
  }
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
  if (changeInfo.status === 'loading') {
    transliteratedTabs.delete(tabId);
  }
});

chrome.tabs.onRemoved.addListener((tabId) => {
  transliteratedTabs.delete(tabId);
});
