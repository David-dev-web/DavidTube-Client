document.addEventListener('DOMContentLoaded', () => {

    // --- TYPEWRITER-EFFEKT LOGIK ---
    const typewriterElement = document.getElementById('typewriter-subtitle');
    if (typewriterElement) {
        const textToType = "Schnell, modern und ohne Ablenkungen. Konzentriere dich auf das, was zählt: die Videos.";
        let charIndex = 0;

        function type() {
            if (charIndex < textToType.length) {
                typewriterElement.textContent += textToType.charAt(charIndex);
                charIndex++;
                setTimeout(type, Math.random() * 80 + 20); // Realistischere Tipp-Geschwindigkeit
            } else {
                // Wenn der Text fertig ist, warte 2 Sekunden und entferne dann die Cursor-Klasse
                setTimeout(() => {
                    typewriterElement.classList.remove('typing');
                }, 2000); // 2 Sekunden
            }
        }

        // Fügt eine Klasse hinzu, um den Cursor anzuzeigen und startet den Effekt
        typewriterElement.classList.add('typing');
        setTimeout(type, 800); // Startet nach einer kurzen Verzögerung
    }

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
    
    // Wichtig: .hero-subtitle wird nicht mehr vom Observer gesteuert
    document.querySelectorAll('.hero-title, .cta-button, .feature-item, .gallery-item, .faq-item').forEach(el => {
        observer.observe(el);
    });

    // --- GSAP TEXT-ANIMATION BEIM SCROLLEN (Verbesserte Version) ---
    gsap.registerPlugin(ScrollTrigger);

    document.querySelectorAll('.animate-title').forEach(title => {
        const text = title.textContent;
        title.innerHTML = ''; 

        text.split('').forEach(char => {
            const span = document.createElement('span');
            span.className = 'char';
            span.textContent = char;
            if (char.trim() === '') {
                span.style.display = 'inline'; 
            }
            title.appendChild(span);
        });

        gsap.fromTo(title.querySelectorAll('.char'), 
            { 
                opacity: 0,
                y: 50,
                scale: 0.5
            },
            { 
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.5,
                stagger: 0.05,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: title,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    });

});
