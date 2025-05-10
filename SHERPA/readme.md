### 🔍 Inspecting & Exporting Logs

SHERPA stores every page visit and click in Chrome’s internal **Extension Storage** under the key `logs`. To view or export them:

#### A) View in Service Worker Console

1. In `chrome://extensions` find SHERPA and click **“service worker ▸ inspect”**.  
2. In the **Console** tab, paste the following and press **Enter**:

   ```js
   // Retrieve all log events as JSON:
   chrome.storage.local.get("logs")
     .then(({ logs }) => {
       console.table(logs);                       // Tabular view in console
       console.log(JSON.stringify(logs, null, 2)); // Pretty‑printed JSON
     });
     
### 📂 What Each File Does

| File                 | Purpose                                                                                  |
|----------------------|------------------------------------------------------------------------------------------|
| `manifest.json`      | Defines the extension (name, version, permissions, scripts, host permissions, popup).    |
| `content.js`         | Runs in every webpage; captures and sends “visit” and “click” events to the background. |
| `background.js`      | Service worker that stores logs, groups sessions, mines patterns, and schedules prompts. |
| `suggestion.js`      | Injected into the active tab when a pattern is due; displays the floating prompt card.   |
| `popup/popup.html`   | (Optional) HTML for the extension’s toolbar popup UI.                                    |
| `popup/popup.js`     | (Optional) Logic for popup controls (e.g., Clear Logs, Export Logs).                     |
| `popup/popup.css`    | (Optional) Styles for the popup UI.                                                      |
