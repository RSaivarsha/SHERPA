document.getElementById("clear").onclick = () =>
    chrome.storage.local.clear(() => alert("Logs cleared!"));
  