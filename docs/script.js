document.addEventListener('DOMContentLoaded', () => {

    // --- CURSOR-FOLLOWER LOGIK (unverändert) ---
    const cursorDot = document.querySelector('.cursor-dot');
    const hoverables = document.querySelectorAll('a, button, .thumbnail'); // NEU: .thumbnail hinzugefügt
    const moveCursor = (e) => {
        cursorDot.style.left = `${e.clientX}px`;
        cursorDot.style.top = `${e.clientY}px`;
    };
    window.addEventListener('mousemove', moveCursor);
    hoverables.forEach(el => {
        el.addEventListener('mouseenter', () => cursorDot.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursorDot.classList.remove('hover'));
    });

    // --- NEU: SMART HEADER LOGIK ---
    const header = document.querySelector('.hero');
    let lastScrollY = window.scrollY;
    window.addEventListener('scroll', () => {
        if (window.scrollY > 200) { // Aktiviert erst nach 200px scrollen
            if (lastScrollY < window.scrollY) {
                // Nach unten gescrollt
                header.classList.add('hidden');
            } else {
                // Nach oben gescrollt
                header.classList.remove('hidden');
            }
        }
        lastScrollY = window.scrollY;
    });

    // --- NEU: SCREENSHOT-GALERIE LOGIK ---
    const mainImage = document.getElementById('main-gallery-image');
    const thumbnails = document.querySelectorAll('.thumbnail');
    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', () => {
            // Setze das Hauptbild
            mainImage.style.opacity = 0; // Ausblenden
            setTimeout(() => {
                mainImage.src = thumb.src;
                mainImage.alt = thumb.alt.replace(' Thumbnail', '');
                mainImage.style.opacity = 1; // Einblenden
            }, 300);

            // Setze den aktiven Zustand
            thumbnails.forEach(t => t.classList.remove('active'));
            thumb.classList.add('active');
        });
    });

    // --- FAQ-AKKORDEON LOGIK (unverändert) ---
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

    // --- SCROLL-REVEAL-ANIMATIONEN (angepasst) ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                entry.target.style.transitionDelay = `${index * 100}ms`;
                entry.target.classList.add('is-visible');
            }
        });
    }, { threshold: 0.1 });
    // Wir beobachten jetzt auch die .gallery
    document.querySelectorAll('.hero-title, .hero-subtitle, .cta-button, .feature-item, .gallery, .faq-item').forEach(el => {
        observer.observe(el);
    });

});
