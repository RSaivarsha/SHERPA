// service_worker.js

let lastTabId = null;

// 1. Suggest in the Omnibox after 3+ chars
chrome.omnibox.onInputChanged.addListener((text, suggest) => {
  if (text.length >= 3) {
    suggest([{
      content: "https://www.brightspace.com",
      description: "▶ Log into Brightspace"
    }]);
  }
});

// 2. When the user hits Enter, navigate the tab to the typed site
chrome.omnibox.onInputEntered.addListener((text) => {
    const host = "brightspace.nyu.edu/d2l/home";
    chrome.tabs.update(lastTabId, { url: `https://${host}` });
  });

// 3. After that tab finishes loading, inject our side‑prompt
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status !== 'complete') return;
  
  // If on login page, add username
  if (tab.url.includes("shibboleth")) {
    chrome.tabs.sendMessage(tabId, {
      type: 'ADD_USERNAME'
    });
  }
  
  // If on home page, show the prompt
  if (tab.url.includes("brightspace.nyu.edu/d2l/home")) {
    chrome.tabs.sendMessage(tabId, {
      type: 'SHOW_PROMPT'
    });
  }
});
