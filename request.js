document.getElementById('registerForm')?.addEventListener('submit', function (e) {
  e.preventDefault();
  alert('User registered successfully!');
});

// Login form handler
document.getElementById('loginForm')?.addEventListener('submit', function (e) {
  e.preventDefault();
  alert('Logged in successfully!');
});

// Leave form handler
let selectedDates = [];
function addDate() {
  const dateInput = document.getElementById('datePicker');
  const value = dateInput.value;
  if (value && !selectedDates.includes(value)) {
    selectedDates.push(value);
    const list = document.getElementById('datesList');
    const div = document.createElement('div');
    div.textContent = value;
    list.appendChild(div);
    dateInput.value = '';
  }
}

document.getElementById('leaveForm')?.addEventListener('submit', function (e) {
  e.preventDefault();
  const reason = document.getElementById('reason').value;
  localStorage.setItem('leaveRequest', JSON.stringify({ reason, selectedDates, user: 'Elite' }));
  alert('Leave application submitted!');
});

// Display leave requests
window.onload = function () {
  const container = document.getElementById('requestsContainer');
  if (container) {
    const data = JSON.parse(localStorage.getItem('leaveRequest'));
    if (data) {
      const div = document.createElement('div');
      div.innerHTML = `
        <strong>${data.user}</strong> requested leave for:<br>
        <ul>${data.selectedDates.map(d => `<li>${d}</li>`).join('')}</ul>
        <p>Reason: ${data.reason}</p>
        <p>Status: Pending</p>
        <button onclick="alert('Approved')">Approve</button>
        <button onclick="alert('Declined')">Decline</button>
        <hr>
      `;
      container.appendChild(div);
    }
  }
}
