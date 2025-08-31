// === PARTIKEL-HINTERGRUND INITIALISIEREN ===
particlesJS("particles-js", {
    "particles": {
        "number": { "value": 80, "density": { "enable": true, "value_area": 800 } },
        "color": { "value": "#1DB954" },
        "shape": { "type": "circle" },
        "opacity": { "value": 0.5, "random": true, "anim": { "enable": true, "speed": 1, "opacity_min": 0.1, "sync": false } },
        "size": { "value": 3, "random": true, "anim": { "enable": false } },
        "line_linked": { "enable": true, "distance": 150, "color": "#1DB954", "opacity": 0.2, "width": 1 },
        "move": { "enable": true, "speed": 2, "direction": "none", "random": false, "straight": false, "out_mode": "out", "bounce": false, "attract": { "enable": false } }
    },
    "interactivity": {
        "detect_on": "canvas",
        "events": { "onhover": { "enable": true, "mode": "grab" }, "onclick": { "enable": true, "mode": "push" }, "resize": true },
        "modes": { "grab": { "distance": 140, "line_linked": { "opacity": 0.5 } }, "push": { "particles_nb": 4 } }
    },
    "retina_detect": true
});


// === PARALLAX & 3D-EFFEKTE ===
document.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const hero = document.querySelector('.hero');
    // Bewegt den Hero-Bereich langsamer als der Rest der Seite für Tiefenwirkung
    hero.style.transform = `translateY(${scrollY * 0.5}px)`;
});

const featureItems = document.querySelectorAll('.feature-item');
featureItems.forEach(item => {
    item.addEventListener('mousemove', e => {
        const rect = item.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -10; // Max 10 Grad Drehung
        const rotateY = ((x - centerX) / centerX) * 10;  // Max 10 Grad Drehung

        item.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
    });

    item.addEventListener('mouseleave', () => {
        item.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    });
});


// NEUE VERSION - SCROLL-REVEAL-ANIMATION MIT GESTEUERTER VERZÖGERUNG
const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Füge eine Verzögerung basierend auf der Reihenfolge des Elements hinzu
            const delay = entry.target.classList.contains('feature-item') ? index * 100 : 0; // 100ms Verzögerung nur für Feature-Items

            setTimeout(() => {
                entry.target.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
                entry.target.classList.add('is-visible');
            }, delay);

            // Stoppe die Beobachtung, nachdem die Animation einmal ausgelöst wurde
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1
});

document.querySelectorAll('.hero-title, .hero-subtitle, .cta-button, .feature-item').forEach(el => {
    observer.observe(el);
});

