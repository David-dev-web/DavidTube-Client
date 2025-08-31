document.addEventListener('DOMContentLoaded', () => {

    // Scroll-Reveal-Animationen
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                entry.target.style.transitionDelay = `${index * 100}ms`;
                entry.target.classList.add('is-visible');
            }
        });
    }, {
        threshold: 0.1
    });

    // Alle Elemente beobachten, die animiert werden sollen
    document.querySelectorAll('.hero-title, .hero-subtitle, .cta-button, .feature-item').forEach(el => {
        observer.observe(el);
    });

});
