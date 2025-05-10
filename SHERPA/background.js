/************ 1. Receive and store raw logs ************/
chrome.runtime.onMessage.addListener((msg) => {
    if (msg.type !== "LOG") return;
    chrome.storage.local.get(["logs"], (res) => {
      const logs = res.logs || [];
      logs.push(msg.payload);
      chrome.storage.local.set({ logs });
    });
  });
  
  /************ 2. Periodic scheduler (“tick”) ************/
  chrome.runtime.onInstalled.addListener(() =>
    chrome.alarms.create("sherpa_tick", { periodInMinutes: 2 })
  );
  
  chrome.alarms.onAlarm.addListener(async (alarm) => {
    if (alarm.name !== "sherpa_tick") return;
  
    const { logs = [] } = await chrome.storage.local.get("logs");
    const sessions = chunkSessions(logs, 2); // need ≤2 min gaps
    const patterns = minePatterns(sessions, 2);        // need ≥2 hits
  
    const now = new Date();
    const due = patterns.find(
      (p) =>
        p.weekdays.includes(now.getDay()) &&
        Math.abs(p.hour - now.getHours()) <= 1
    );
  
    if (!due) return;
  
    // Save for suggestion.js then inject UI
    await chrome.storage.local.set({ activePattern: due });
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ["suggestion.js"]
    });
  });
  
  /************ 3. Helpers ****************************************/
  
  function chunkSessions(logs, maxGapMin = 10) {
    if (!logs.length) return [];
    const out = [];
    let cur = [logs[0]];
  
    for (let i = 1; i < logs.length; i++) {
      const gap = (logs[i].timestamp - logs[i - 1].timestamp) / 60000;
      if (gap <= maxGapMin) {
        cur.push(logs[i]);
      } else {
        out.push(cur);
        cur = [logs[i]];
      }
    }
    out.push(cur);
    return out;
  }
  
  function minePatterns(sessions, minCount) {
    const map = {};
  
    sessions.forEach((sess) => {
      const key = sess.map((a) => a.label).join(" → ").toLowerCase();
      const t0 = new Date(sess[0].timestamp);
      if (!map[key]) {
        map[key] = {
          label: sess.map((a) => a.label).join(" → "),
          count: 0,
          weekdays: [],
          hour: t0.getHours()
        };
      }
      map[key].count++;
      if (!map[key].weekdays.includes(t0.getDay()))
        map[key].weekdays.push(t0.getDay());
    });
  
    return Object.values(map).filter((p) => p.count >= minCount);
  }
  