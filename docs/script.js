document.addEventListener('DOMContentLoaded', () => {

    // --- NEU: CURSOR-FOLLOWER LOGIK ---
    const cursorDot = document.querySelector('.cursor-dot');
    const hoverables = document.querySelectorAll('a, button');

    // Funktion, um den Punkt zu bewegen
    const moveCursor = (e) => {
        cursorDot.style.left = `${e.clientX}px`;
        cursorDot.style.top = `${e.clientY}px`;
    };
    window.addEventListener('mousemove', moveCursor);

    // Fügt die 'hover'-Klasse hinzu, wenn man über Links/Buttons fährt
    hoverables.forEach(el => {
        el.addEventListener('mouseenter', () => cursorDot.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursorDot.classList.remove('hover'));
    });


    // --- NEU: FAQ-AKKORDEON LOGIK ---
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');

        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Optional: Alle anderen schließen, wenn eins geöffnet wird
            // faqItems.forEach(otherItem => {
            //     otherItem.classList.remove('active');
            //     otherItem.querySelector('.faq-answer').style.maxHeight = 0;
            // });

            if (!isActive) {
                item.classList.add('active');
                // Wir setzen max-height auf die tatsächliche Höhe des Inhalts
                answer.style.maxHeight = answer.scrollHeight + 'px';
            } else {
                item.classList.remove('active');
                answer.style.maxHeight = 0;
            }
        });
    });


    // --- SCROLL-REVEAL-ANIMATIONEN (leicht angepasst) ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Wir fügen die Verzögerung direkt hier hinzu
                entry.target.style.transitionDelay = `${index * 100}ms`;
                entry.target.classList.add('is-visible');
            }
        });
    }, {
        threshold: 0.1
    });

    // Wir beobachten jetzt auch die .faq-item Elemente
    document.querySelectorAll('.hero-title, .hero-subtitle, .cta-button, .feature-item, .faq-item').forEach(el => {
        observer.observe(el);
    });

});
