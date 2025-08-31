document.addEventListener('DOMContentLoaded', () => {

    // --- CURSOR-FOLLOWER LOGIK ---
    const cursorDot = document.querySelector('.cursor-dot');
    const hoverables = document.querySelectorAll('a, button');
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
    const header = document.querySelector('.hero');
    let lastScrollY = window.scrollY;
    window.addEventListener('scroll', () => {
        if (window.scrollY > 200) {
            if (lastScrollY < window.scrollY) {
                header.classList.add('hidden');
            } else {
                header.classList.remove('hidden');
            }
        }
        lastScrollY = window.scrollY;
    });

    // --- GSAP SCROLL-HIJACKING GALERIE ---
    gsap.registerPlugin(ScrollTrigger);

    const slidesContainer = document.querySelector('.gallery-slides');

    // Nur auf Desktops ausführen (wichtige mobile Optimierung!)
    ScrollTrigger.matchMedia({
        "(min-width: 769px)": function() {
            gsap.to(slidesContainer, {
                x: () => -(slidesContainer.scrollWidth - window.innerWidth),
                ease: "none",
                scrollTrigger: {
                    trigger: ".gallery-container",
                    start: "top top",
                    end: () => "+=" + (slidesContainer.scrollWidth - window.innerWidth),
                    scrub: 1,
                    pin: true,
                    anticipatePin: 1,
                    invalidateOnRefresh: true,
                }
            });
        }
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
                entry.target.style.transitionDelay = `${index * 100}ms`;
                entry.target.classList.add('is-visible');
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.hero-title, .hero-subtitle, .cta-button, .feature-item, .faq-item').forEach(el => {
        observer.observe(el);
    });

});
