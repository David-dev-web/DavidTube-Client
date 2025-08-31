document.addEventListener('DOMContentLoaded', () => {

    // --- CURSOR-FOLLOWER LOGIK ---
    const cursorDot = document.querySelector('.cursor-dot');
    const hoverables = document.querySelectorAll('a, button, .gallery-item img');
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

    // --- SCROLL-REVEAL-ANIMATIONEN (für die normalen Elemente) ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                entry.target.style.transitionDelay = `${index * 50}ms`;
                entry.target.classList.add('is-visible');
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.hero-title, .hero-subtitle, .cta-button, .feature-item, .gallery-item, .faq-item').forEach(el => {
        observer.observe(el);
    });

    // --- NEU: GSAP TEXT-ANIMATION BEIM SCROLLEN ---
    gsap.registerPlugin(ScrollTrigger);

    const titlesToAnimate = document.querySelectorAll('.animate-title');

    titlesToAnimate.forEach(title => {
        // 1. Text in Buchstaben aufteilen und mit <span> umschließen
        const text = title.textContent;
        title.innerHTML = ''; // Leert die Überschrift
        text.split('').forEach(char => {
            // Wenn es ein Leerzeichen ist, füge es normal hinzu
            if (char === ' ') {
                title.innerHTML += ' ';
            } else {
                const span = document.createElement('span');
                span.className = 'char';
                span.textContent = char;
                title.appendChild(span);
            }
        });

        // 2. GSAP-Animation für diese Buchstaben erstellen
        gsap.to(title.querySelectorAll('.char'), {
            opacity: 1,
            transform: 'translateY(0) scale(1)',
            duration: 0.5,
            stagger: 0.05, // Verzögerung zwischen den Buchstaben
            ease: 'power2.out',
            scrollTrigger: {
                trigger: title,
                start: 'top 80%', // Startet, wenn 80% der Überschrift von unten sichtbar sind
                toggleActions: 'play none none none' // Spielt die Animation einmal ab und das war's
            }
        });
    });

});
