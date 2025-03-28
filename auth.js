document.addEventListener('DOMContentLoaded', () => {
    // Check if already logged in
    if (localStorage.getItem('isLoggedIn')) {
        window.location.href = 'index.html';
    }

    const loginForm = document.getElementById('loginForm');
    loginForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Demo credentials - replace with actual authentication
        if (email === 'demo@jobster.com' && password === 'demo123') {
            localStorage.setItem('isLoggedIn', 'true');
            window.location.href = 'index.html';
        } else {
            alert('Invalid credentials! Try demo@jobster.com / demo123');
        }
    });
});
