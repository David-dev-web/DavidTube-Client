// main.js (Version 4.0 - API Key Management)

const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const Store = require('./store.js');

// Initialisiere den Speicher für die App-Einstellungen
const store = new Store({
    configName: 'app-settings',
    defaults: {
        welcomeShown: false,
        apiKey: null,
        apiKeyValidated: false
    }
});

let mainWindow;
let welcomeWindow;

function createMainWindow() {
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        show: false, // Zuerst versteckt erstellen
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true,
            contextIsolation: false
        },
        icon: path.join(__dirname, 'youtube.ico')
    });

    mainWindow.loadFile('index.html');
    
    // Wenn das Fenster bereit ist, zeige es elegant an
    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
    });

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

function createWelcomeWindow() {
    welcomeWindow = new BrowserWindow({
        width: 600,
        height: 700,
        frame: false, // Rahmenloses Fenster
        resizable: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        },
        icon: path.join(__dirname, 'youtube.ico')
    });

    welcomeWindow.loadFile('welcome.html');

    welcomeWindow.on('closed', () => {
        welcomeWindow = null;
    });
}

// Prüfe, ob die App bereits konfiguriert ist
function isAppConfigured() {
    const apiKey = store.get('apiKey');
    const apiKeyValidated = store.get('apiKeyValidated');
    return apiKey && apiKeyValidated;
}

app.whenReady().then(() => {
    // Prüfe, ob die App bereits konfiguriert ist
    if (isAppConfigured()) {
        createMainWindow();
    } else {
        createWelcomeWindow();
    }

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            if (isAppConfigured()) {
                createMainWindow();
            } else {
                createWelcomeWindow();
            }
        }
    });
});

// Lausche auf die Nachricht vom Willkommens-Fenster
ipcMain.on('setup-complete', (event, data) => {
    try {
        // API-Key sicher speichern
        store.set('apiKey', data.apiKey);
        store.set('apiKeyValidated', true);
        store.set('welcomeShown', true);
        
        // Willkommens-Fenster schließen und Hauptfenster öffnen
        if (welcomeWindow) {
            welcomeWindow.close();
        }
        createMainWindow();
        
    } catch (error) {
        console.error('Fehler beim Speichern des API-Schlüssels:', error);
        // Fehlermeldung an den Benutzer anzeigen
        dialog.showErrorBox('Fehler', 'Der API-Schlüssel konnte nicht gespeichert werden. Bitte versuche es erneut.');
    }
});

// IPC-Handler für API-Key-Verwaltung
ipcMain.handle('get-api-key', () => {
    return store.get('apiKey');
});

ipcMain.handle('is-api-key-valid', () => {
    return store.get('apiKeyValidated');
});

// IPC-Handler für API-Key-Änderung
ipcMain.handle('update-api-key', async (event, newApiKey) => {
    try {
        store.set('apiKey', newApiKey);
        store.set('apiKeyValidated', true);
        return { success: true };
    } catch (error) {
        console.error('Fehler beim Aktualisieren des API-Schlüssels:', error);
        return { success: false, error: error.message };
    }
});

// IPC-Handler für App-Neustart
ipcMain.handle('restart-app', () => {
    app.relaunch();
    app.exit();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
