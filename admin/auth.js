// auth.js
function checkAuth() {
    const authToken = localStorage.getItem('authToken');
    const loginTime = localStorage.getItem('loginTime');
    const currentTime = new Date().getTime();
    const sessionTimeout = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

    // Check if user is authenticated and session hasn't expired
    if (!authToken || !loginTime || (currentTime - loginTime > sessionTimeout)) {
        localStorage.clear();
        window.location.href = 'index.html';
        return false;
    }
    return true;
}

// Run auth check on page load
document.addEventListener('DOMContentLoaded', function() {
    if (!checkAuth()) {
        return;
    }
});

// Prevent back button navigation
window.addEventListener('load', function() {
    if (!checkAuth()) {
        window.history.pushState(null, null, 'index.html');
    }
});

window.addEventListener('popstate', function() {
    if (!checkAuth()) {
        window.location.href = 'index.html';
    }
});