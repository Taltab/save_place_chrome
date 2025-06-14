// popup.js

// save
document.getElementById('saveBtn').addEventListener('click', async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.tabs.sendMessage(tab.id, { action: 'save-position' });
  document.getElementById('saveBtn').textContent = 'Saved!';
  setTimeout(() => {
    document.getElementById('saveBtn').textContent = 'Save Position';
  }, 1000);
});

// clean all
document.getElementById('clearBtn').addEventListener('click', () => {
  chrome.storage.local.clear(() => {
    // feedback
    document.getElementById('clearBtn').textContent = 'Cleared!';
    setTimeout(() => {
      document.getElementById('clearBtn').textContent = 'Clear All Positions';
    }, 1000);
  });
});
