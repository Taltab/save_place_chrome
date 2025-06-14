// content.js

//0. cancel auto save
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

// 1. when a page loads, we use what we saved
window.addEventListener('DOMContentLoaded', () => {
  chrome.storage.local.get(location.href, result => {
    const pos = result[location.href];
    if (pos) window.scrollTo(pos.x, pos.y);
  });
});

// 2. listens to "save position" from popup and saves place
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.action === 'save-position') {
    const pos = { x: window.scrollX, y: window.scrollY };
    const data = {};
    data[location.href] = pos;
    chrome.storage.local.set(data, () => sendResponse({ status: 'ok' }));
    return true; // מסמן תגובה אסינכרונית
  }
});
