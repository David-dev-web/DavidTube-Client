document.addEventListener('DOMContentLoaded', () => {

    // --- CURSOR-FOLLOWER LOGIK ---
    const cursorDot = document.querySelector('.cursor-dot');
    const hoverables = document.querySelectorAll('a, button, .gallery-item img'); // Hover-Effekt auch für Galeriebilder
    const moveCursor = (e) => {
        cursorDot.style.left = `${e.clientX}px`;
        cursorDot.style.top = `${e.clientY}px`;
    };
    window.addEventListener('mousemove', moveCursor);
    hoverables.forEach(el => {
        el.addEventListener('mouseenter', () => cursorDot.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursorDot.classList.remove('hover'));
    });

    // --- SMART HEADER LOGIK ---
    const nav = document.querySelector('.main-nav');
    let lastScrollY = window.scrollY;
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
            if (lastScrollY < window.scrollY) {
                nav.classList.add('hidden');
            } else {
                nav.classList.remove('hidden');
            }
        } else {
            nav.classList.remove('scrolled');
        }
        lastScrollY = window.scrollY;
    });

    // --- FAQ-AKKORDEON LOGIK ---
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            if (!isActive) {
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            } else {
                item.classList.remove('active');
                answer.style.maxHeight = 0;
            }
        });
    });

    // --- SCROLL-REVEAL-ANIMATIONEN ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Gestaffelte Verzögerung für einen schöneren Effekt
                entry.target.style.transitionDelay = `${index * 50}ms`;
                entry.target.classList.add('is-visible');
            }
        });
    }, { threshold: 0.1 });
    
    // Wir beobachten jetzt auch .gallery-item
    document.querySelectorAll('.hero-title, .hero-subtitle, .cta-button, .feature-item, .gallery-item, .faq-item').forEach(el => {
        observer.observe(el);
    });

});
