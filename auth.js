document.addEventListener('DOMContentLoaded', () => {
    // Check if already logged in
    if (localStorage.getItem('isLoggedIn')) {
        window.location.href = 'index.html';
    }

    // Simple fade-in animation for form
    anime({
        targets: '#loginForm > div',
        opacity: [0, 1],
        translateY: [10, 0],
        duration: 800,
        delay: anime.stagger(100),
        easing: 'easeOutQuad'
    });

    const loginForm = document.getElementById('loginForm');
    loginForm?.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const formContainer = document.querySelector('.bg-white');
        const loginButton = document.querySelector('.login-btn');

        // Disable button during animation
        loginButton.disabled = true;

        // Demo credentials - replace with actual authentication
        if (email === 'demo@jobster.com' && password === 'demo123') {
            try {
                // Simple fade out
                await anime({
                    targets: formContainer,
                    opacity: [1, 0],
                    duration: 1000,
                    easing: 'linear'
                }).finished;

                localStorage.setItem('isLoggedIn', 'true');
                window.location.href = 'index.html';
            } catch (error) {
                console.error('Animation error:', error);
                // Fallback direct redirect
                localStorage.setItem('isLoggedIn', 'true');
                window.location.href = 'index.html';
            }
        } else {
            // Error animation
            const shakeDuration = 100;
            
            anime({
                targets: formContainer,
                translateX: [
                    { value: -10, duration: shakeDuration },
                    { value: 10, duration: shakeDuration },
                    { value: -10, duration: shakeDuration },
                    { value: 10, duration: shakeDuration },
                    { value: 0, duration: shakeDuration }
                ],
                duration: shakeDuration * 5,
                easing: 'easeInOutQuad'
            });

            // Show error message
            const errorMsg = document.getElementById('errorMsg') || createErrorMessage();
            errorMsg.textContent = 'Invalid credentials! Try demo@jobster.com / demo123';
            anime({
                targets: errorMsg,
                opacity: [0, 1],
                translateY: [-10, 0],
                duration: 300,
                easing: 'easeOutQuad'
            });

            // Re-enable button
            loginButton.disabled = false;
        }
    });

    // Add error message container on page load
    createErrorMessage();

    function createErrorMessage() {
        if (!document.getElementById('errorMsg')) {
            const errorMsg = document.createElement('div');
            errorMsg.id = 'errorMsg';
            errorMsg.className = 'text-red-500 text-sm mt-4 text-center opacity-0';
            document.getElementById('loginForm').appendChild(errorMsg);
            return errorMsg;
        }
        return document.getElementById('errorMsg');
    }
});
