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

    // --- GSAP TEXT-ANIMATION BEIM SCROLLEN (Verbesserte Version) ---
    gsap.registerPlugin(ScrollTrigger);

    document.querySelectorAll('.animate-title').forEach(title => {
        // 1. Text in Buchstaben aufteilen
        const text = title.textContent;
        title.innerHTML = ''; // Leert die Überschrift

        // Wir erstellen für jeden Buchstaben ein <span>
        text.split('').forEach(char => {
            const span = document.createElement('span');
            span.className = 'char';
            span.textContent = char;
            // Wichtig: Ein Leerzeichen muss als solches erhalten bleiben, damit der Zeilenumbruch funktioniert
            if (char.trim() === '') {
                span.style.display = 'inline'; 
            }
            title.appendChild(span);
        });

        // 2. GSAP-Animation für diese Buchstaben erstellen
        gsap.fromTo(title.querySelectorAll('.char'), 
            { // Start-Zustand (aus dem CSS)
                opacity: 0,
                y: 50, // y ist eine Kurzform für translateY
                scale: 0.5
            },
            { // End-Zustand (wohin animiert wird)
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.5,
                stagger: 0.05, // Verzögerung zwischen den Buchstaben
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: title,
                    start: 'top 85%', // Startet, wenn 85% der Überschrift von unten sichtbar sind
                    toggleActions: 'play none none reverse' // Spielt ab, wenn man reinscrollt, und rückwärts, wenn man wieder rausscrollt
                }
            }
        );
    });

});
