chrome.storage.local.get("activePattern").then(({ activePattern }) => {
    if (!activePattern) return;
  
    const card = document.createElement("div");
    card.textContent = `SHERPA: Ready to do “${activePattern.label}”?`;
    card.style = `
      position:fixed;bottom:20px;right:20px;z-index:999999;
      background:#4b6fff;color:#fff;padding:12px 18px;
      border-radius:10px;font-size:15px;font-family:sans-serif;
      cursor:pointer;box-shadow:0 2px 6px rgba(0,0,0,.3);
    `;
    card.onclick = () => {
      alert("👉  This is where you’d launch the automation script!");
      card.remove();
    };
    document.body.appendChild(card);
  
    setTimeout(() => card.remove(), 30000); // auto‑dismiss
  });
  