// content.js

// 0. At document start, decide scrollRestoration mode based on saved data
chrome.storage.local.get(location.href, result => {
  const hasSaved = Boolean(result[location.href]);
  if ('scrollRestoration' in history) {
    // if we have a saved scroll pos → disable browser auto-restore
    // otherwise restore default behavior
    history.scrollRestoration = hasSaved ? 'manual' : 'auto';
  }
});

// 1. On DOMContentLoaded, restore scroll position if one exists
window.addEventListener('DOMContentLoaded', () => {
  chrome.storage.local.get(location.href, result => {
    const pos = result[location.href];
    if (pos) {
      window.scrollTo(pos.x, pos.y);
    }
  });
});

// 2. Listen for “save-position” messages and store the current scroll coords
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.action === 'save-position') {
    const pos = { x: window.scrollX, y: window.scrollY };
    chrome.storage.local.set({ [location.href]: pos }, () => {
      sendResponse({ status: 'saved' });
    });
    return true; // keep message channel open for sendResponse
  }
});
