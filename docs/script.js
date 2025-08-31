document.addEventListener('DOMContentLoaded', () => {

    // Partikel-Hintergrund initialisieren
    // Wichtig: Du brauchst die Dateien 'particles.min.js' und 'particles.json' im selben Ordner!
    particlesJS.load('particles-js', 'particles.json', function() {
        console.log('callback - particles.js config loaded');
    });

    // Scroll-Reveal-Animationen
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Fügt eine gestaffelte Verzögerung für einen schöneren Effekt hinzu
                entry.target.style.transitionDelay = `${index * 100}ms`;
                entry.target.classList.add('is-visible');
            }
        });
    }, {
        threshold: 0.1 // Element wird animiert, wenn 10% sichtbar sind
    });

    // Alle Elemente beobachten, die animiert werden sollen
    document.querySelectorAll('.hero-title, .hero-subtitle, .cta-button, .feature-item').forEach(el => {
        observer.observe(el);
    });

});
