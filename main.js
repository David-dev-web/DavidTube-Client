// main.js (Version 3.0 - Welcome Screen)

const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const Store = require('./store.js');

// Initialisiere den Speicher für die App-Einstellungen
const store = new Store({
    configName: 'app-settings',
    defaults: {
        welcomeShown: false
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
        width: 500,
        height: 400,
        frame: false, // Rahmenloses Fenster
        resizable: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    welcomeWindow.loadFile('welcome.html');

    welcomeWindow.on('closed', () => {
        welcomeWindow = null;
    });
}

app.whenReady().then(() => {
    // Prüfe, ob der Willkommensbildschirm schon gezeigt wurde
    if (store.get('welcomeShown')) {
        createMainWindow();
    } else {
        createWelcomeWindow();
    }

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            if (store.get('welcomeShown')) {
                createMainWindow();
            } else {
                createWelcomeWindow();
            }
        }
    });
});

// Lausche auf die Nachricht vom Willkommens-Fenster
ipcMain.on('close-welcome-and-show-main', () => {
    store.set('welcomeShown', true); // Merken, dass der Screen gezeigt wurde
    if (welcomeWindow) {
        welcomeWindow.close();
    }
    createMainWindow();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
