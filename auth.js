document.addEventListener('DOMContentLoaded', () => {
    // Check if already logged in
    if (localStorage.getItem('isLoggedIn')) {
        window.location.href = 'index.html';
    }

    // Animate form elements
    anime({
        targets: '#loginForm > div',
        translateY: [20, 0],
        opacity: [0, 1],
        delay: anime.stagger(100, {start: 300}),
        easing: 'easeOutCubic'
    });

    // Animate accent circle
    anime({
        targets: '.accent-circle',
        strokeDashoffset: [anime.setDashoffset, 0],
        easing: 'easeInOutSine',
        duration: 1500,
        delay: 300,
        direction: 'alternate',
        loop: true
    });

    // Create particle effect
    const particlesContainer = document.querySelector('.particles');
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'absolute w-1 h-1 bg-white rounded-full';
        particlesContainer.appendChild(particle);
        
        anime({
            targets: particle,
            translateX: () => anime.random(-500, 500),
            translateY: () => anime.random(-500, 500),
            scale: () => anime.random(0, 1),
            opacity: [0.5, 0],
            duration: () => anime.random(1000, 3000),
            delay: () => anime.random(0, 2000),
            loop: true,
            easing: 'easeOutExpo'
        });
    }

    // Add hover effect to login button
    const loginBtn = document.querySelector('.login-btn');
    loginBtn.addEventListener('mouseenter', () => {
        anime({
            targets: loginBtn,
            scale: 1.05,
            duration: 300,
            easing: 'easeOutElastic(1, .8)'
        });
    });

    loginBtn.addEventListener('mouseleave', () => {
        anime({
            targets: loginBtn,
            scale: 1,
            duration: 300,
            easing: 'easeOutElastic(1, .8)'
        });
    });

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
