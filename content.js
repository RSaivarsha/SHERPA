// Listen for enter username
chrome.runtime.onMessage.addListener((msg) => {
    if (msg.type === 'ADD_USERNAME') {
      console.log("ADD_USERNAME");
      typeUsername();
    }
  });

function typeUsername() {
    const username = "pg2833";
    const input = document.querySelector('input[id="username"][name="j_username"]');
    input.value = username;
    input.dispatchEvent(new Event('input', { bubbles: true }));
    input.dispatchEvent(new Event('change', { bubbles: true }));
}

// 1. Listen for the SHOW_PROMPT message
chrome.runtime.onMessage.addListener((msg) => {
    if (msg.type === 'SHOW_PROMPT') {
      console.log("SHOW_PROMPT");
      showSidePrompt();
    }
  });
  
  // 2. Render the side‑panel prompt
  function showSidePrompt() {
    const pane = document.createElement('div');
    Object.assign(pane.style, {
      position: 'fixed',
      right: '12px',
      top: '50%',
      transform: 'translateY(-50%)',
      background: '#fff',
      padding: '12px',
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      zIndex: 9999,
      fontFamily: 'sans-serif',
      width: '400px',
      lineHeight: '1.4'
    });
    pane.innerHTML = `
      <strong>Sherpa </strong>🚀<br>
      Open DevOps Zoom Session<br><br>
      <button id="autopal-run">Run</button>
      <button id="autopal-dismiss">Dismiss</button>
    `;
    document.body.appendChild(pane);
  
    pane.querySelector('#autopal-run').onclick = () => {
      pane.remove();
      openDevOpsZoom();
    };
    pane.querySelector('#autopal-dismiss').onclick = () => pane.remove();
  }

  // Function to open DevOps course and then Zoom
  function openDevOpsZoom() {
    console.log("Opening DevOps course page first");
    
    // First navigate to the DevOps course page
    const brightspaceUrl = "https://brightspace.nyu.edu/d2l/common/dialogs/quickLink/quickLink.d2l?ou=445773&type=lti&rcode=438126FB-CB7E-4012-84DC-B926D628DF2A-1844200&srcou=6606&launchFramed=1&framedName=Zoom";
    window.location.href = brightspaceUrl;
    
    // Then open the Zoom meeting in a new tab after a delay
    setTimeout(() => {
      const zoomMeetingUrl = "https://nyu.zoom.us/j/92486533438";
      console.log("Now opening Zoom meeting:", zoomMeetingUrl);
      window.open(zoomMeetingUrl, '_blank');
    }, 1000); // Wait 1 second
  }

  // 4. Helpers
  
  // Wait until document.querySelector returns an element
  function waitForElement(selector) {
    return new Promise((resolve) => {
      const check = () => {
        const el = document.querySelector(selector);
        if (el) resolve(el);
        else requestAnimationFrame(check);
      };
      check();
    });
  }
  

  

  