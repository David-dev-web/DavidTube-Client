// renderer.js (Version 3.4 - Smooth Loading Update)

// =================================================================
// MODULE & SPEICHER INITIALISIEREN
// =================================================================
const Store = require('./store.js');
const store = new Store({
    configName: 'user-favorites',
    defaults: { favorites: [] }
});

// =================================================================
// ELEMENTE AUS DEM HTML GREIFEN
// =================================================================
const searchInput = document.getElementById('search-input');
const resultsGrid = document.querySelector('.results-grid');
const videoPlayerContainer = document.getElementById('video-player-container');
const videoPlayer = document.getElementById('video-player');
const videoInfo = document.getElementById('video-info');
const videoTitle = document.getElementById('video-title');
const videoAuthor = document.getElementById('video-author');
const resultsHeadline = document.querySelector('#results-container h3');
const navItems = document.querySelectorAll('.nav-item');
const navHome = document.getElementById('nav-home');
const navDiscover = document.getElementById('nav-discover');
const navFavorites = document.getElementById('nav-favorites');
const nowPlayingThumb = document.getElementById('now-playing-thumb');
const nowPlayingTitle = document.getElementById('now-playing-title');
const nowPlayingAuthor = document.getElementById('now-playing-author');

// =================================================================
// API-SCHLÜSSEL & KONSTANTEN
// =================================================================
const apiKey = 'AIzaSyCr0Zdj9xegV4EBWHqyFMJAG1yK56IG3TA';
const CATEGORIES = {
    'Musik': '10',
    'Gaming': '20',
    'Sport': '17',
    'Filme & Animation': '1'
};
const MIN_LOADING_TIME = 1000; // Mindestladezeit in ms (1 Sekunde)

// =================================================================
// DEBOUNCE & HELPER FUNKTIONEN
// =================================================================
let debounceTimer;
function debounce(func, delay) {
    return function(...args) {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => { func.apply(this, args); }, delay);
    };
}

// --- NEUE HELFER-FUNKTION FÜR MINDEST-WARTEZEIT ---
const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));
// --- ENDE DER NEUEN FUNKTION ---

// =================================================================
// EVENT LISTENER
// =================================================================
const debouncedSearch = debounce(performSearch, 300);
searchInput.addEventListener('input', () => {
    if (searchInput.value.trim() === '') {
        setActiveNav(navHome);
        showTrendingVideos();
    } else {
        debouncedSearch();
    }
});

navHome.addEventListener('click', (e) => { e.preventDefault(); setActiveNav(navHome); showTrendingVideos(); });
navFavorites.addEventListener('click', (e) => { e.preventDefault(); setActiveNav(navFavorites); showFavorites(); });
navDiscover.addEventListener('click', (e) => { e.preventDefault(); setActiveNav(navDiscover); showDiscoverPage(); });

// =================================================================
// UI-UPDATE FUNKTIONEN
// =================================================================
function setActiveNav(activeItem) {
    navItems.forEach(item => item.classList.remove('active'));
    if (activeItem) activeItem.classList.add('active');
}

function showLoadingSpinner() {
    resultsGrid.innerHTML = `
        <div class="loader">
            <div class="inner one"></div>
            <div class="inner two"></div>
            <div class="inner three"></div>
        </div>
    `;
}

function updateNowPlayingBar(videoSnippet) {
    if (videoSnippet) {
        nowPlayingThumb.src = videoSnippet.thumbnails.default.url;
        nowPlayingTitle.innerText = videoSnippet.title;
        nowPlayingAuthor.innerText = videoSnippet.channelTitle;
    } else {
        nowPlayingThumb.src = 'youtube.ico';
        nowPlayingTitle.innerText = 'Nichts spielt gerade';
        nowPlayingAuthor.innerText = '';
    }
}

function showVideoPlayer() {
    videoPlayerContainer.classList.add('visible');
    videoInfo.classList.add('visible');
}

function hideVideoPlayer() {
    videoPlayerContainer.classList.remove('visible');
    videoInfo.classList.remove('visible');
    videoPlayer.src = '';
    videoTitle.innerText = '';
    videoAuthor.innerText = '';
}

// =================================================================
// DATENANZEIGE-FUNKTIONEN (MIT MINDEST-LADEZEIT)
// =================================================================
async function showTrendingVideos() {
    hideVideoPlayer();
    resultsHeadline.innerText = 'Angesagte Videos';
    showLoadingSpinner();
    try {
        const fetchPromise = fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&chart=mostPopular&regionCode=DE&maxResults=50&key=${apiKey}` );
        const [response] = await Promise.all([fetchPromise, wait(MIN_LOADING_TIME)]);
        const data = await response.json();
        displayResults(data.items);
    } catch (error) { handleError(error); }
}

async function performSearch() {
    hideVideoPlayer();
    const query = searchInput.value;
    if (!query) return;
    setActiveNav(null);
    resultsHeadline.innerText = `Ergebnisse für "${query}"`;
    showLoadingSpinner();
    try {
        const fetchPromise = fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&type=video&maxResults=50&key=${apiKey}` );
        const [response] = await Promise.all([fetchPromise, wait(MIN_LOADING_TIME)]);
        const data = await response.json();
        displayResults(data.items);
    } catch (error) { handleError(error); }
}

async function showFavorites() {
    hideVideoPlayer();
    resultsHeadline.innerText = 'Deine Favoriten';
    const favoriteIds = store.get('favorites');
    if (!favoriteIds || favoriteIds.length === 0) {
        resultsGrid.innerHTML = '<p style="text-align: center; color: var(--text-secondary);">Du hast noch keine Favoriten gespeichert.</p>';
        return;
    }
    showLoadingSpinner();
    try {
        const fetchPromise = fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${favoriteIds.join(',' )}&maxResults=50&key=${apiKey}`);
        const [response] = await Promise.all([fetchPromise, wait(MIN_LOADING_TIME)]);
        const data = await response.json();
        displayResults(data.items);
    } catch (error) { handleError(error); }
}

function showDiscoverPage() {
    hideVideoPlayer();
    resultsHeadline.innerText = 'Entdecke neue Kategorien';
    resultsGrid.innerHTML = '';
    for (const categoryName in CATEGORIES) {
        const categoryItem = document.createElement('div');
        categoryItem.className = 'category-item';
        categoryItem.innerText = categoryName;
        categoryItem.addEventListener('click', () => {
            showCategoryVideos(CATEGORIES[categoryName], categoryName);
        });
        resultsGrid.appendChild(categoryItem);
    }
}

async function showCategoryVideos(categoryId, categoryName) {
    hideVideoPlayer();
    resultsHeadline.innerText = `Angesagt in: ${categoryName}`;
    showLoadingSpinner();
    try {
        const fetchPromise = fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&videoCategoryId=${categoryId}&regionCode=DE&maxResults=50&key=${apiKey}` );
        const [response] = await Promise.all([fetchPromise, wait(MIN_LOADING_TIME)]);
        const data = await response.json();
        displayResults(data.items);
    } catch (error) { handleError(error); }
}

function displayResults(items) {
    if (!items || items.length === 0) {
        resultsGrid.innerHTML = '<p>Keine Videos gefunden.</p>';
        return;
    }
    resultsGrid.innerHTML = '';
    const favoriteIds = store.get('favorites');

    items.forEach(item => {
        const resultItem = document.createElement('div');
        resultItem.className = 'result-item';
        const video = item.snippet;
        const videoId = typeof item.id === 'string' ? item.id : item.id.videoId;
        const isFavorite = favoriteIds.includes(videoId);

        resultItem.innerHTML = `
            <div class="thumbnail-container">
                <img src="${video.thumbnails.high.url}" class="thumbnail">
            </div>
            <p class="result-title">${video.title}</p>
            <p class="result-author">${video.channelTitle}</p>
            <i class="favorite-btn ${isFavorite ? 'fas fa-heart is-favorite' : 'far fa-heart'}"></i>
        `;

        resultItem.querySelector('.thumbnail-container').addEventListener('click', () => playVideo(item));
        resultItem.querySelector('.result-title').addEventListener('click', () => playVideo(item));
        
        const favoriteBtn = resultItem.querySelector('.favorite-btn');
        favoriteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleFavorite(videoId, favoriteBtn);
        });

        resultsGrid.appendChild(resultItem);
    });
}

// =================================================================
// KERNFUNKTIONEN (PLAYER & FAVORITEN)
// =================================================================
function toggleFavorite(videoId, btnElement) {
    let favorites = store.get('favorites');
    if (favorites.includes(videoId)) {
        favorites = favorites.filter(id => id !== videoId);
        btnElement.classList.remove('fas', 'is-favorite');
        btnElement.classList.add('far');
    } else {
        favorites.push(videoId);
        btnElement.classList.add('fas', 'is-favorite');
        btnElement.classList.remove('far');
    }
    store.set('favorites', favorites);
}

function playVideo(videoItem) {
    const videoId = typeof videoItem.id === 'string' ? videoItem.id : videoItem.id.videoId;
    const videoSnippet = videoItem.snippet;

    showVideoPlayer();

    const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    videoPlayer.src = embedUrl;

    videoTitle.innerText = videoSnippet.title;
    videoAuthor.innerText = videoSnippet.channelTitle;
    
    updateNowPlayingBar(videoSnippet );

    document.querySelector('.content-wrapper').scrollTo({ top: 0, behavior: 'smooth' });
}

function handleError(error) {
    console.error('Ein Fehler ist aufgetreten:', error);
    resultsGrid.innerHTML = '<p>Ein Fehler ist aufgetreten. Bitte überprüfe die Konsole.</p>';
}

// =================================================================
// INITIALISIERUNG
// =================================================================
setActiveNav(navHome);
showTrendingVideos();
updateNowPlayingBar(null);
