// Log every meaningful click the user makes
document.addEventListener("click", (e) => {
    const el = e.target.closest("a, button");
    if (!el) return;
  
    const action = {
      type: "click",
      url: location.href,
      label:
        el.innerText?.trim().slice(0, 60) ||
        el.getAttribute("aria-label") ||
        el.id ||
        el.className ||
        "unknown",
      timestamp: Date.now()
    };
  
    chrome.runtime.sendMessage({ type: "LOG", payload: action });
  });
  
  // Log each page load as a view
  chrome.runtime.sendMessage({
    type: "LOG",
    payload: {
      type: "visit",
      url: location.href,
      label: document.title.slice(0, 60),
      timestamp: Date.now()
    }
  });
  