// List of code IDs
const codes = ['code1', 'code2', 'code3', 'code4'];

// Initialize click counts from localStorage
codes.forEach(code => {
  if (!localStorage.getItem(code)) localStorage.setItem(code, 0);
  document.getElementById('click' + code.slice(-1)).innerText = 'Clicks: ' + localStorage.getItem(code);
});

// Toast notification function
function showToast(message) {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerText = message;
  container.appendChild(toast);

  // Remove after 3 seconds
  setTimeout(() => {
    container.removeChild(toast);
  }, 3000);
}

// Copy code function
function copyCode(id) {
  const codeText = document.getElementById(id).innerText;
  navigator.clipboard.writeText(codeText)
    .then(() => {
      // Show toast instead of alert
      showToast(`Code ${codeText} copied!`);

      // Update click count
      let count = parseInt(localStorage.getItem(id)) || 0;
      count++;
      localStorage.setItem(id, count);
      document.getElementById('click' + id.slice(-1)).innerText = 'Clicks: ' + count;

      // Add pulse animation to button
      const btn = document.getElementById('btn' + id.slice(-1));
      btn.classList.remove('pulse');
      void btn.offsetWidth; // Trigger reflow
      btn.classList.add('pulse');
    })
    .catch(() => showToast('Failed to copy code'));
}

// Reset all click counts
document.getElementById('resetBtn').addEventListener('click', () => {
  if(confirm("Are you sure you want to reset all clicks?")) {
    codes.forEach(code => {
      localStorage.setItem(code, 0);
      document.getElementById('click' + code.slice(-1)).innerText = 'Clicks: 0';
    });
    showToast("All click counts reset!");
  }
});
