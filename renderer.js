// renderer.js (Version 5.0 - Advanced Features)

// =================================================================
// MODULE & SPEICHER INITIALISIEREN
// =================================================================
const Store = require('./store.js');
const { ipcRenderer } = require('electron');

const store = new Store({
    configName: 'user-favorites',
    defaults: { 
        favorites: [],
        playlists: [],
        currentPlaylist: [],
        theme: 'dark',
        searchFilters: {
            sort: 'relevance',
            time: '',
            quality: '',
            duration: ''
        }
    }
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
const navPlaylists = document.getElementById('nav-playlists');
const navSettings = document.getElementById('nav-settings');
const nowPlayingThumb = document.getElementById('now-playing-thumb');
const nowPlayingTitle = document.getElementById('now-playing-title');
const nowPlayingAuthor = document.getElementById('now-playing-author');

// Neue Elemente
const themeToggleBtn = document.getElementById('theme-toggle-btn');
const searchFilters = document.getElementById('search-filters');
const downloadBtn = document.getElementById('download-btn');
const playlistSection = document.getElementById('playlist-section');
const playlistItems = document.getElementById('playlist-items');
const playlistClearBtn = document.getElementById('playlist-clear-btn');
const playlistSaveBtn = document.getElementById('playlist-save-btn');
const notification = document.getElementById('notification');

// =================================================================
// API-SCHLÜSSEL & KONSTANTEN
// =================================================================
<<<<<<< HEAD
let apiKey = null;
=======
<<<<<<< HEAD
let apiKey = null;
=======
const apiKey = 'DEIN_API_SCHLÜSSEL_HIER_EINFÜGEN';
>>>>>>> e2a11d7764b716f6d6d0782bfbb1f6c1917321dc
>>>>>>> a2b7d5d98c967e8caec35a1abb49e4f941b079bb
const CATEGORIES = {
    'Musik': '10',
    'Gaming': '20',
    'Sport': '17',
    'Filme & Animation': '1'
};
const MIN_LOADING_TIME = 1000; // Mindestladezeit in ms (1 Sekunde)

// =================================================================
// THEME SYSTEM
// =================================================================
function initializeTheme() {
    const currentTheme = store.get('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', currentTheme);
    if (themeToggleBtn) {
        updateThemeToggleIcon(currentTheme);
    }
}

function toggleTheme() {
    const currentTheme = store.get('theme') || 'dark';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    store.set('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    if (themeToggleBtn) {
        updateThemeToggleIcon(newTheme);
    }
    
    showNotification(`Theme auf ${newTheme === 'dark' ? 'Dunkel' : 'Hell'} geändert`, 'success');
}

function updateThemeToggleIcon(theme) {
    if (themeToggleBtn) {
        const icon = themeToggleBtn.querySelector('i');
        if (icon) {
            icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        }
    }
}

// =================================================================
// NOTIFICATION SYSTEM
// =================================================================
function showNotification(message, type = 'success') {
    if (notification) {
        notification.textContent = message;
        notification.className = `notification ${type}`;
        notification.classList.add('show');
        
        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    } else {
        // Fallback: Alert verwenden
        alert(message);
    }
}

// =================================================================
// PLAYLIST SYSTEM
// =================================================================
let currentPlaylist = store.get('currentPlaylist') || [];

function addToPlaylist(videoItem) {
    const videoId = typeof videoItem.id === 'string' ? videoItem.id : videoItem.id.videoId;
    
    // Prüfen, ob Video bereits in der Playlist ist
    if (currentPlaylist.find(item => item.id === videoId)) {
        showNotification('Video ist bereits in der Playlist', 'error');
        return;
    }
    
    const playlistItem = {
        id: videoId,
        title: videoItem.snippet.title,
        author: videoItem.snippet.channelTitle,
        thumbnail: videoItem.snippet.thumbnails.default.url,
        snippet: videoItem.snippet
    };
    
    currentPlaylist.push(playlistItem);
    store.set('currentPlaylist', currentPlaylist);
    
    showNotification('Video zur Playlist hinzugefügt', 'success');
    updatePlaylistDisplay();
}

function removeFromPlaylist(videoId) {
    currentPlaylist = currentPlaylist.filter(item => item.id !== videoId);
    store.set('currentPlaylist', currentPlaylist);
    updatePlaylistDisplay();
    showNotification('Video aus Playlist entfernt', 'success');
}

function clearPlaylist() {
    currentPlaylist = [];
    store.set('currentPlaylist', currentPlaylist);
    updatePlaylistDisplay();
    showNotification('Playlist geleert', 'success');
}

function savePlaylist() {
    const playlists = store.get('playlists') || [];
    const playlistName = prompt('Name für die Playlist:');
    
    if (playlistName && currentPlaylist.length > 0) {
        const newPlaylist = {
            id: Date.now().toString(),
            name: playlistName,
            videos: [...currentPlaylist],
            createdAt: new Date().toISOString()
        };
        
        playlists.push(newPlaylist);
        store.set('playlists', playlists);
        showNotification(`Playlist "${playlistName}" gespeichert`, 'success');
    }
}

function updatePlaylistDisplay() {
    if (!playlistSection || !playlistItems) return;
    
    if (currentPlaylist.length === 0) {
        playlistSection.style.display = 'none';
        return;
    }
    
    playlistSection.style.display = 'block';
    playlistItems.innerHTML = '';
    
    currentPlaylist.forEach((item, index) => {
        const playlistItem = document.createElement('div');
        playlistItem.className = 'playlist-item';
        playlistItem.innerHTML = `
            <img src="${item.thumbnail}" alt="${item.title}">
            <div class="playlist-item-info">
                <div class="playlist-item-title">${item.title}</div>
                <div class="playlist-item-author">${item.author}</div>
            </div>
            <div class="playlist-item-remove" data-id="${item.id}">
                <i class="fas fa-times"></i>
            </div>
        `;
        
        playlistItem.addEventListener('click', (e) => {
            if (!e.target.closest('.playlist-item-remove')) {
                playVideo({ id: item.id, snippet: item.snippet });
            }
        });
        
        playlistItems.appendChild(playlistItem);
    });
    
    // Event-Listener für Remove-Buttons
    playlistItems.querySelectorAll('.playlist-item-remove').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const videoId = btn.dataset.id;
            removeFromPlaylist(videoId);
        });
    });
}

function showPlaylistsPage() {
    hideVideoPlayer();
    hideResultsContainer();
    hidePlaylistSection();
    
    const playlists = store.get('playlists') || [];
    
    if (playlists.length === 0) {
        resultsGrid.innerHTML = '<p style="text-align: center; color: var(--text-secondary);">Du hast noch keine Playlists erstellt.</p>';
    } else {
        resultsGrid.innerHTML = '';
        playlists.forEach(playlist => {
            const playlistCard = document.createElement('div');
            playlistCard.className = 'result-item';
            playlistCard.innerHTML = `
                <div class="thumbnail-container">
                    <img src="${playlist.videos[0]?.thumbnail || 'youtube.ico'}" class="thumbnail">
                </div>
                <p class="result-title">${playlist.name}</p>
                <p class="result-author">${playlist.videos.length} Videos • ${new Date(playlist.createdAt).toLocaleDateString()}</p>
            `;
            
            playlistCard.addEventListener('click', () => {
                loadPlaylist(playlist);
            });
            
            resultsGrid.appendChild(playlistCard);
        });
    }
    
    resultsHeadline.textContent = 'Deine Playlists';
}

function loadPlaylist(playlist) {
    currentPlaylist = [...playlist.videos];
    store.set('currentPlaylist', currentPlaylist);
    updatePlaylistDisplay();
    showNotification(`Playlist "${playlist.name}" geladen`, 'success');
}

// =================================================================
// DOWNLOAD SYSTEM
// =================================================================
function showDownloadButton() {
    if (downloadBtn) {
        downloadBtn.style.display = 'block';
    }
}

function hideDownloadButton() {
    if (downloadBtn) {
        downloadBtn.style.display = 'none';
    }
}

function handleDownload() {
    const videoId = videoPlayer.src.split('/').pop().split('?')[0];
    const videoTitle = document.getElementById('video-title').textContent;
    
    // Hier könnte eine echte Download-Funktionalität implementiert werden
    showNotification(`Download für "${videoTitle}" gestartet...`, 'success');
    
    // Beispiel: Link zum Video öffnen
    const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
    window.open(videoUrl, '_blank');
}

// =================================================================
// ADVANCED SEARCH FILTERS
// =================================================================
function toggleSearchFilters() {
    if (searchFilters) {
        const isVisible = searchFilters.style.display !== 'none';
        searchFilters.style.display = isVisible ? 'none' : 'flex';
    }
}

function getSearchFilters() {
    if (!searchFilters) return {};
    
    return {
        sort: document.getElementById('sort-filter')?.value || 'relevance',
        time: document.getElementById('time-filter')?.value || '',
        quality: document.getElementById('quality-filter')?.value || '',
        duration: document.getElementById('duration-filter')?.value || ''
    };
}

function buildSearchUrl(query, filters) {
    let url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&type=video&maxResults=50&key=${apiKey}`;
    
    if (filters.sort && filters.sort !== 'relevance') {
        url += `&order=${filters.sort}`;
    }
    
    if (filters.time) {
        url += `&publishedAfter=${getTimeFilter(filters.time)}`;
    }
    
    return url;
}

function getTimeFilter(timeFilter) {
    const now = new Date();
    switch (timeFilter) {
        case 'hour':
            return new Date(now.getTime() - 60 * 60 * 1000).toISOString();
        case 'today':
            return new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();
        case 'week':
            return new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString();
        case 'month':
            return new Date(now.getFullYear(), now.getMonth() - 1, now.getDate()).toISOString();
        case 'year':
            return new Date(now.getFullYear() - 1, now.getMonth(), now.getDate()).toISOString();
        default:
            return '';
    }
}

// =================================================================
// API-KEY VERWALTUNG
// =================================================================
async function initializeApiKey() {
    try {
        apiKey = await ipcRenderer.invoke('get-api-key');
        if (!apiKey) {
            showApiKeyError();
            return false;
        }
        return true;
    } catch (error) {
        console.error('Fehler beim Laden des API-Schlüssels:', error);
        showApiKeyError();
        return false;
    }
}

function showApiKeyError() {
    if (resultsGrid) {
        resultsGrid.innerHTML = `
            <div class="api-key-error">
                <div class="error-icon">🔑</div>
                <h3>API-Schlüssel nicht gefunden</h3>
                <p>Dein YouTube API-Schlüssel konnte nicht geladen werden.</p>
                <button id="reconfigure-btn" class="btn-primary">Neu konfigurieren</button>
            </div>
        `;
        
        const reconfigureBtn = document.getElementById('reconfigure-btn');
        if (reconfigureBtn) {
            reconfigureBtn.addEventListener('click', async () => {
                try {
                    await ipcRenderer.invoke('restart-app');
                } catch (error) {
                    console.error('Fehler beim Neustart:', error);
                }
            });
        }
    }
}

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

const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// =================================================================
// EVENT LISTENER
// =================================================================
const debouncedSearch = debounce(performSearch, 300);
if (searchInput) {
    searchInput.addEventListener('input', () => {
        if (searchInput.value.trim() === '') {
            setActiveNav(navHome);
            showTrendingVideos();
        } else {
            debouncedSearch();
        }
    });
}

// Navigation Event Listener
if (navHome) {
    navHome.addEventListener('click', (e) => { 
        e.preventDefault(); 
        hideSettingsPage(); // Einstellungsseite verstecken
        setActiveNav(navHome); 
        showTrendingVideos(); 
    });
}
if (navFavorites) {
    navFavorites.addEventListener('click', (e) => { 
        e.preventDefault(); 
        hideSettingsPage(); // Einstellungsseite verstecken
        setActiveNav(navFavorites); 
        showFavorites(); 
    });
}
if (navDiscover) {
    navDiscover.addEventListener('click', (e) => { 
        e.preventDefault(); 
        hideSettingsPage(); // Einstellungsseite verstecken
        setActiveNav(navDiscover); 
        showDiscoverPage(); 
    });
}
if (navPlaylists) {
    navPlaylists.addEventListener('click', (e) => { 
        e.preventDefault(); 
        hideSettingsPage(); // Einstellungsseite verstecken
        setActiveNav(navPlaylists); 
        showPlaylistsPage(); 
    });
}
if (navSettings) {
    navSettings.addEventListener('click', (e) => { 
        e.preventDefault(); 
        setActiveNav(navSettings); 
        showSettingsPage(); 
    });
}

// Neue Event Listener
if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', toggleTheme);
}

if (downloadBtn) {
    downloadBtn.addEventListener('click', handleDownload);
}

if (playlistClearBtn) {
    playlistClearBtn.addEventListener('click', clearPlaylist);
}

if (playlistSaveBtn) {
    playlistSaveBtn.addEventListener('click', savePlaylist);
}

// Doppelklick auf Suchfeld für erweiterte Filter
if (searchInput) {
    searchInput.addEventListener('dblclick', toggleSearchFilters);
}

// =================================================================
// UI-UPDATE FUNKTIONEN
// =================================================================
function setActiveNav(activeItem) {
    navItems.forEach(item => item.classList.remove('active'));
    if (activeItem) activeItem.classList.add('active');
}

function showLoadingSpinner() {
    if (resultsGrid) {
        // Zufällige Auswahl zwischen verschiedenen Ladekreis-Designs
        const loaderTypes = ['default', 'pulse', 'bouncing'];
        const randomType = loaderTypes[Math.floor(Math.random() * loaderTypes.length)];
        
        let loaderHTML = '';
        
        switch (randomType) {
            case 'pulse':
                loaderHTML = `
                    <div class="loader pulse">
                        <div class="inner"></div>
                    </div>
                `;
                break;
            case 'bouncing':
                loaderHTML = `
                    <div class="loader bouncing">
                        <div class="inner one"></div>
                        <div class="inner two"></div>
                        <div class="inner three"></div>
                    </div>
                `;
                break;
            default:
                loaderHTML = `
                    <div class="loader">
                        <div class="inner one"></div>
                        <div class="inner two"></div>
                        <div class="inner three"></div>
                    </div>
                `;
        }
        
        resultsGrid.innerHTML = loaderHTML;
    }
}

function updateNowPlayingBar(videoSnippet) {
    if (nowPlayingThumb && nowPlayingTitle && nowPlayingAuthor) {
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
}

// =================================================================
// API-FUNKTIONEN
// =================================================================
async function performSearch() {
    if (!apiKey) {
        showApiKeyError();
        return;
    }

    const query = searchInput.value.trim();
    if (!query) return;

    showLoadingSpinner();
    setActiveNav(null);

    try {
        const startTime = Date.now();
        const filters = getSearchFilters();
        const url = buildSearchUrl(query, filters);
        
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        
        // Mindestladezeit einhalten
        const elapsed = Date.now() - startTime;
        if (elapsed < MIN_LOADING_TIME) {
            await wait(MIN_LOADING_TIME - elapsed);
        }
        
        if (data.items && data.items.length > 0) {
            displaySearchResults(data.items, query);
        } else {
            showNoResults(query);
        }
        
    } catch (error) {
        console.error('Fehler bei der Suche:', error);
        showError('Fehler bei der Suche: ' + error.message);
    }
}

async function showTrendingVideos() {
    if (!apiKey) {
        showApiKeyError();
        return;
    }

    showLoadingSpinner();
    if (resultsHeadline) {
        resultsHeadline.textContent = 'Angesagte Videos';
    }
    
    try {
        const startTime = Date.now();
        
        const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&chart=mostPopular&regionCode=DE&key=${apiKey}&maxResults=20`);
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        
        // Mindestladezeit einhalten
        const elapsed = Date.now() - startTime;
        if (elapsed < MIN_LOADING_TIME) {
            await wait(MIN_LOADING_TIME - elapsed);
        }
        
        if (data.items && data.items.length > 0) {
            displayVideoResults(data.items);
        } else {
            showError('Keine angesagten Videos gefunden.');
        }
        
    } catch (error) {
        console.error('Fehler beim Laden der angesagten Videos:', error);
        showError('Fehler beim Laden der angesagten Videos: ' + error.message);
    }
}

async function showFavorites() {
    if (!apiKey) {
        showApiKeyError();
        return;
    }

    hideVideoPlayer();
    if (resultsHeadline) {
        resultsHeadline.innerText = 'Deine Favoriten';
    }
    const favoriteIds = store.get('favorites');
    if (!favoriteIds || favoriteIds.length === 0) {
        if (resultsGrid) {
            resultsGrid.innerHTML = '<p style="text-align: center; color: var(--text-secondary);">Du hast noch keine Favoriten gespeichert.</p>';
        }
        return;
    }
    showLoadingSpinner();
    try {
        const fetchPromise = fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${favoriteIds.join(',')}&maxResults=50&key=${apiKey}`);
        const [response] = await Promise.all([fetchPromise, wait(MIN_LOADING_TIME)]);
        const data = await response.json();
        displayResults(data.items);
    } catch (error) { handleError(error); }
}

function showDiscoverPage() {
    if (!apiKey) {
        showApiKeyError();
        return;
    }

    hideVideoPlayer();
    if (resultsHeadline) {
        resultsHeadline.innerText = 'Entdecke neue Kategorien';
    }
    if (resultsGrid) {
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
}

async function showCategoryVideos(categoryId, categoryName) {
    if (!apiKey) {
        showApiKeyError();
        return;
    }

    hideVideoPlayer();
    if (resultsHeadline) {
        resultsHeadline.innerText = `Angesagt in: ${categoryName}`;
    }
    showLoadingSpinner();
    try {
        const fetchPromise = fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&videoCategoryId=${categoryId}&regionCode=DE&maxResults=50&key=${apiKey}`);
        const [response] = await Promise.all([fetchPromise, wait(MIN_LOADING_TIME)]);
        const data = await response.json();
        displayResults(data.items);
    } catch (error) { handleError(error); }
}

function displayResults(items) {
    if (!items || items.length === 0) {
        if (resultsGrid) {
            resultsGrid.innerHTML = '<p>Keine Videos gefunden.</p>';
        }
        return;
    }
    if (resultsGrid) {
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
                    <button class="playlist-add-btn" title="Zur Playlist hinzufügen">
                        <i class="fas fa-plus"></i>
                    </button>
                </div>
                <p class="result-title">${video.title}</p>
                <p class="result-author">${video.channelTitle}</p>
                <i class="favorite-btn ${isFavorite ? 'fas fa-heart is-favorite' : 'far fa-heart'}"></i>
            `;

            const thumbnailContainer = resultItem.querySelector('.thumbnail-container');
            if (thumbnailContainer) {
                thumbnailContainer.addEventListener('click', () => playVideo(item));
            }
            
            const resultTitle = resultItem.querySelector('.result-title');
            if (resultTitle) {
                resultTitle.addEventListener('click', () => playVideo(item));
            }
            
            const favoriteBtn = resultItem.querySelector('.favorite-btn');
            if (favoriteBtn) {
                favoriteBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    toggleFavorite(videoId, favoriteBtn);
                });
            }
            
            // Playlist-Button Event Listener
            const playlistAddBtn = resultItem.querySelector('.playlist-add-btn');
            if (playlistAddBtn) {
                playlistAddBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    addToPlaylist(item);
                });
            }

            resultsGrid.appendChild(resultItem);
        });
    }
}

function displaySearchResults(items, query) {
    if (!items || items.length === 0) {
        showNoResults(query);
        return;
    }
    
    if (resultsHeadline) {
        resultsHeadline.textContent = `Ergebnisse für "${query}"`;
    }
    displayResults(items);
}

function showNoResults(query) {
    if (resultsHeadline) {
        resultsHeadline.textContent = `Keine Ergebnisse für "${query}"`;
    }
    if (resultsGrid) {
        resultsGrid.innerHTML = `
            <div style="text-align: center; padding: 40px; color: var(--text-secondary);">
                <div style="font-size: 3em; margin-bottom: 20px;">🔍</div>
                <h3>Keine Videos gefunden</h3>
                <p>Versuche andere Suchbegriffe oder überprüfe deine Filter-Einstellungen.</p>
            </div>
        `;
    }
}

function displayVideoResults(items) {
    displayResults(items);
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
        showNotification('Video aus Favoriten entfernt', 'success');
    } else {
        favorites.push(videoId);
        btnElement.classList.add('fas', 'is-favorite');
        btnElement.classList.remove('far');
        showNotification('Video zu Favoriten hinzugefügt', 'success');
    }
    store.set('favorites', favorites);
}

function playVideo(videoItem) {
    const videoId = typeof videoItem.id === 'string' ? videoItem.id : videoItem.id.videoId;
    const videoSnippet = videoItem.snippet;

    showVideoPlayer();
    showDownloadButton();
    showPlaylistSection();

    if (videoPlayer) {
        const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
        videoPlayer.src = embedUrl;
    }

    if (videoTitle) {
        videoTitle.innerText = videoSnippet.title;
    }
    if (videoAuthor) {
        videoAuthor.innerText = videoSnippet.channelTitle;
    }
    
    updateNowPlayingBar(videoSnippet);

    const contentWrapper = document.querySelector('.content-wrapper');
    if (contentWrapper) {
        contentWrapper.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

function showVideoPlayer() {
    if (videoPlayerContainer) {
        videoPlayerContainer.classList.add('visible');
    }
    if (videoInfo) {
        videoInfo.classList.add('visible');
    }
}

function handleError(error) {
    console.error('Ein Fehler ist aufgetreten:', error);
    if (resultsGrid) {
        resultsGrid.innerHTML = `
            <div style="text-align: center; padding: 40px; color: var(--heart-color);">
                <div style="font-size: 3em; margin-bottom: 20px;">⚠️</div>
                <h3>Ein Fehler ist aufgetreten</h3>
                <p>${error.message || 'Unbekannter Fehler'}</p>
                <button onclick="location.reload()" class="btn-primary" style="margin-top: 20px;">Seite neu laden</button>
            </div>
        `;
    }
}

function showError(message) {
    handleError(new Error(message));
}

// =================================================================
// EINSTELLUNGSSEITE FUNKTIONEN
// =================================================================
function showSettingsPage() {
    hideVideoPlayer();
    hideResultsContainer();
    hidePlaylistSection();
    
    const settingsPage = document.getElementById('settings-page');
    if (settingsPage) {
        settingsPage.classList.add('visible');
        
        // API-Key-Status aktualisieren
        updateApiKeyStatus();
        
        // Aktuellen API-Key in das Eingabefeld eintragen
        const settingsApiKeyInput = document.getElementById('settings-api-key');
        if (settingsApiKeyInput) {
            settingsApiKeyInput.value = apiKey || '';
        }
    }
}

function updateApiKeyStatus() {
    const statusIndicator = document.getElementById('api-status-indicator');
    const statusText = document.getElementById('api-status-text');
    
    if (statusIndicator && statusText) {
        if (apiKey) {
            statusIndicator.className = 'status-indicator valid';
            statusText.textContent = 'API-Schlüssel ist gültig';
        } else {
            statusIndicator.className = 'status-indicator invalid';
            statusText.textContent = 'Kein API-Schlüssel gefunden';
        }
    }
}

async function testApiKey(testKey) {
    try {
        const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=test&key=${testKey}&maxResults=1`);
        return response.ok;
    } catch (error) {
        return false;
    }
}

// =================================================================
// HILFSFUNKTIONEN
// =================================================================
function hideVideoPlayer() {
    if (videoPlayerContainer) {
        videoPlayerContainer.classList.remove('visible');
    }
    if (videoInfo) {
        videoInfo.classList.remove('visible');
    }
    if (videoPlayer) {
        videoPlayer.src = '';
    }
    hideDownloadButton();
}

function hideResultsContainer() {
    const resultsContainer = document.getElementById('results-container');
    if (resultsContainer) {
        resultsContainer.style.display = 'none';
    }
}

function showResultsContainer() {
    const resultsContainer = document.getElementById('results-container');
    if (resultsContainer) {
        resultsContainer.style.display = 'block';
        // Auch die Playlist-Sektion anzeigen, falls sie Videos enthält
        if (currentPlaylist && currentPlaylist.length > 0) {
            showPlaylistSection();
        }
    }
}

function hideSettingsPage() {
    const settingsPage = document.getElementById('settings-page');
    if (settingsPage) {
        settingsPage.classList.remove('visible');
        showResultsContainer();
    }
}

function hidePlaylistSection() {
    if (playlistSection) {
        playlistSection.style.display = 'none';
    }
}

function showPlaylistSection() {
    if (playlistSection && currentPlaylist.length > 0) {
        playlistSection.style.display = 'block';
    }
}

// =================================================================
// INITIALISIERUNG
// =================================================================
async function initializeApp() {
    // API-Key laden
    const apiKeyLoaded = await initializeApiKey();
    
    if (apiKeyLoaded) {
        // App normal starten
        setActiveNav(navHome);
        showTrendingVideos();
        updateNowPlayingBar(null);
        
        // Event-Listener für Einstellungsseite
        setupSettingsEventListeners();
        
        // Theme initialisieren
        initializeTheme();
        
        // Playlist-Status aktualisieren
        updatePlaylistDisplay();
    }
}

function setupSettingsEventListeners() {
    const updateApiKeyBtn = document.getElementById('update-api-key-btn');
    const testApiKeyBtn = document.getElementById('test-api-key-btn');
    const restartAppBtn = document.getElementById('restart-app-btn');
    const settingsApiKeyInput = document.getElementById('settings-api-key');
    
    if (updateApiKeyBtn) {
        updateApiKeyBtn.addEventListener('click', async () => {
            const newApiKey = settingsApiKeyInput.value.trim();
            
            if (!newApiKey) {
                showNotification('Bitte gib einen API-Schlüssel ein.', 'error');
                return;
            }
            
            // API-Key testen
            const isValid = await testApiKey(newApiKey);
            
            if (isValid) {
                // API-Key aktualisieren
                const result = await ipcRenderer.invoke('update-api-key', newApiKey);
                
                if (result.success) {
                    apiKey = newApiKey;
                    updateApiKeyStatus();
                    showNotification('API-Schlüssel wurde erfolgreich aktualisiert!', 'success');
                } else {
                    showNotification('Fehler beim Aktualisieren des API-Schlüssels: ' + result.error, 'error');
                }
            } else {
                showNotification('Der API-Schlüssel ist ungültig oder hat keine Berechtigungen.', 'error');
            }
        });
    }
    
    if (testApiKeyBtn) {
        testApiKeyBtn.addEventListener('click', async () => {
            const testKey = settingsApiKeyInput.value.trim();
            
            if (!testKey) {
                showNotification('Bitte gib einen API-Schlüssel ein.', 'error');
                return;
            }
            
            const isValid = await testApiKey(testKey);
            
            if (isValid) {
                showNotification('✓ API-Schlüssel ist gültig!', 'success');
            } else {
                showNotification('✗ API-Schlüssel ist ungültig oder hat keine Berechtigungen.', 'error');
            }
        });
    }
    
    if (restartAppBtn) {
        restartAppBtn.addEventListener('click', async () => {
            try {
                await ipcRenderer.invoke('restart-app');
            } catch (error) {
                console.error('Fehler beim Neustart:', error);
            }
        });
    }
}

// App initialisieren
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});
