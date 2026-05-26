const transliteratedTabs = new Set();
const pendingTabs = new Set();

chrome.action.onClicked.addListener((tab) => {
  if (transliteratedTabs.has(tab.id)) {
    transliteratedTabs.delete(tab.id);
    chrome.tabs.reload(tab.id);
  } else {
    chrome.tabs.sendMessage(tab.id, { action: 'applyTransliteration' }).then(() => {
      transliteratedTabs.add(tab.id);
    }).catch(() => {
      pendingTabs.add(tab.id);
      chrome.tabs.reload(tab.id);
    });
  }
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
  if (changeInfo.status === 'complete' && pendingTabs.has(tabId)) {
    pendingTabs.delete(tabId);
    chrome.tabs.sendMessage(tabId, { action: 'applyTransliteration' }).then(() => {
      transliteratedTabs.add(tabId);
    });
  }
  if (changeInfo.status === 'loading') {
    transliteratedTabs.delete(tabId);
  }
});

chrome.tabs.onRemoved.addListener((tabId) => {
  transliteratedTabs.delete(tabId);
  pendingTabs.delete(tabId);
});
