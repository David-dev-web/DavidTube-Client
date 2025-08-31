document.addEventListener('DOMContentLoaded', () => {

    // --- GLOBALE ELEMENTE ---
    const cursorDot = document.querySelector('.cursor-dot');
    const preloader = document.querySelector('.preloader');
    const enterButton = document.getElementById('enter-button');
    const pageWrapper = document.querySelector('.page-wrapper');

    // --- CURSOR SOFORT INITIALISIEREN ---
    function initCursor() {
        if (!cursorDot) return;

        // Macht den Cursor sichtbar, sobald JS läuft
        cursorDot.classList.add('visible');

        const hoverables = document.querySelectorAll('a, button, .gallery-item img, .preloader-button');
        
        window.addEventListener('mousemove', (e) => {
            cursorDot.style.left = `${e.clientX}px`;
            cursorDot.style.top = `${e.clientY}px`;
        });

        hoverables.forEach(el => {
            el.addEventListener('mouseenter', () => cursorDot.classList.add('hover'));
            el.addEventListener('mouseleave', () => cursorDot.classList.remove('hover'));
        });
    }

    // --- PRELOADER LOGIK ---
    function initPreloader() {
        if (!enterButton) return;

        enterButton.addEventListener('click', () => {
            preloader.classList.add('hidden');
            
            // Macht die Hauptseite sichtbar
            pageWrapper.style.display = 'block';
            
            // Startet die Animationen der Hauptseite
            startMainPageScripts();
        });
    }

    // --- HAUPTSEITEN-SKRIPTE (werden bei Bedarf aufgerufen) ---
    function startMainPageScripts() {
        // Hier kommt der gesamte Code für die Hauptseite rein
        
        function startTypewriter(element, speed, onComplete) {
            if (!element) { if (onComplete) onComplete(); return; }
            const textToType = element.dataset.text || element.textContent;
            let charIndex = 0;
            if (element.hasAttribute('data-typed')) { element.textContent = textToType; if (onComplete) onComplete(); return; }
            element.textContent = '';
            element.setAttribute('data-typed', 'true');
            function type() {
                if (charIndex < textToType.length) {
                    element.textContent += textToType.charAt(charIndex);
                    charIndex++;
                    setTimeout(type, speed);
                } else {
                    setTimeout(() => element.classList.remove('typing'), 1000);
                    if (onComplete) onComplete();
                }
            }
            element.classList.add('typing');
            setTimeout(type, 100);
        }

        const typewriterSubtitle = document.getElementById('typewriter-subtitle');
        if (typewriterSubtitle) {
            typewriterSubtitle.dataset.text = "Schnell, modern und ohne Ablenkungen. Konzentriere dich auf das, was zählt: die Videos.";
            setTimeout(() => startTypewriter(typewriterSubtitle, 80), 500); // Startet nach 0.5s
        }

        const nav = document.querySelector('.main-nav');
        let lastScrollY = window.scrollY;
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                nav.classList.add('scrolled');
                if (lastScrollY < window.scrollY) nav.classList.add('hidden');
                else nav.classList.remove('hidden');
            } else {
                nav.classList.remove('scrolled');
            }
            lastScrollY = window.scrollY;
        });

        const faqItems = document.querySelectorAll('.faq-item');
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            const answerWrapper = item.querySelector('.faq-answer');
            const answerP = answerWrapper.querySelector('.typewriter-answer');
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                if (!isActive) {
                    const wasAlreadyTyped = answerP.hasAttribute('data-typed');
                    if (!wasAlreadyTyped) answerP.textContent = answerP.dataset.text;
                    const fullHeight = answerP.scrollHeight;
                    if (!wasAlreadyTyped) answerP.textContent = '';
                    item.classList.add('active');
                    answerWrapper.style.maxHeight = fullHeight + 'px';
                    startTypewriter(answerP, 50);
                } else {
                    item.classList.remove('active');
                    answerWrapper.style.maxHeight = 0;
                }
            });
        });

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    entry.target.style.transitionDelay = `${index * 50}ms`;
                    entry.target.classList.add('is-visible');
                }
            });
        }, { threshold: 0.1 });
        document.querySelectorAll('.hero-title, .cta-button, .feature-item, .gallery-item, .faq-item').forEach(el => {
            observer.observe(el);
        });

        gsap.registerPlugin(ScrollTrigger);
        document.querySelectorAll('.animate-title').forEach(title => {
            const text = title.textContent;
            title.innerHTML = '';
            text.split('').forEach(char => {
                const span = document.createElement('span');
                span.className = 'char';
                span.textContent = char;
                if (char.trim() === '') span.style.display = 'inline';
                title.appendChild(span);
            });
            gsap.fromTo(title.querySelectorAll('.char'), 
                { opacity: 0, y: 50, scale: 0.5 },
                { 
                    opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.05, ease: 'power2.out',
                    scrollTrigger: {
                        trigger: title,
                        start: 'top 85%',
                        toggleActions: 'play none none reverse'
                    }
                }
            );
        });
    }

    // --- ALLES STARTEN ---
    initCursor();
    initPreloader();

});
