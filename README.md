# 🚀 DavidTube Desktop Client v5.0

Ein moderner und performanter Desktop-Client für YouTube, gebaut mit Electron, HTML, CSS und reinem JavaScript. **Version 5.0** bringt revolutionäre neue Features: **Playlist-System**, **Theme-Toggle**, **Download-Funktionalität** und **erweiterte Suchfilter**!

## 🌟 Neue Features in Version 5.0

### 🌐 Live-Demo

Erlebe eine interaktive Vorschau des Projekts hier:

**[david-dev-web.github.io/DavidTube-Client](https://david-dev-web.github.io/DavidTube-Client/)**

*(Hinweis: Dies ist eine Landing-Page, die die Features der Desktop-Anwendung demonstriert.)*


## ✨ Features

### 🎵 **Playlist-System**
- **Wiedergabelisten erstellen:** Sammle deine Lieblingsvideos in Playlists
- **Playlists speichern:** Sichere deine Playlists dauerhaft
- **Playlists verwalten:** Organisiere und bearbeite deine Sammlungen
- **Schnellzugriff:** Ein Klick fügt Videos zur aktuellen Playlist hinzu

### 🌓 **Theme-System**
- **Dark/Light Mode:** Wechsle zwischen dunklem und hellem Design
- **Automatische Speicherung:** Deine Theme-Präferenz wird gespeichert
- **Smooth Transitions:** Sanfte Übergänge zwischen den Themes
- **Konsistentes Design:** Alle UI-Elemente passen sich dem Theme an

### 📥 **Download-Funktionalität**
- **Download-Button:** Direkter Zugriff auf YouTube-Videos
- **Intelligente Anzeige:** Button erscheint nur bei aktiven Videos
- **Benutzerfreundlich:** Ein Klick öffnet das Video auf YouTube

### 🔍 **Erweiterte Suchfilter**
- **Sortierung:** Nach Relevanz, Datum, Bewertung oder Aufrufen
- **Zeitraum:** Letzte Stunde, heute, diese Woche, etc.
- **Videoqualität:** 4K, 1080p, 720p Filter
- **Videolänge:** Kurz, mittel oder lang
- **Doppelklick aktiviert:** Doppelklick auf Suchfeld zeigt Filter

### 🔔 **Benachrichtigungssystem**
- **Toast-Notifications:** Elegante Benachrichtigungen für alle Aktionen
- **Verschiedene Typen:** Erfolg, Fehler und Info-Benachrichtigungen
- **Auto-Hide:** Verschwinden automatisch nach 3 Sekunden
- **Responsive Design:** Passen sich an alle Bildschirmgrößen an

### 🎨 **Verbesserte UI/UX**
- **Smooth Animations:** Sanfte Übergänge und Hover-Effekte
- **Responsive Layout:** Optimiert für alle Bildschirmgrößen
- **Intuitive Navigation:** Klare Struktur und einfache Bedienung
- **Moderne Icons:** FontAwesome Icons für bessere Benutzerfreundlichkeit

## 🌟 Alle Features

*   **Live-Suche:** Ergebnisse erscheinen während des Tippens
*   **Angesagte Videos:** Zeigt die aktuellen Trends aus einer ausgewählten Region
*   **Kategorien entdecken:** Stöbere in Top-Kategorien wie Musik, Gaming oder Sport
*   **Favoriten-System:** Speichere deine Lieblingsvideos lokal auf deinem Computer
*   **Elegantes UI:** Ein modernes, an Spotify angelehntes Design mit sanften Animationen
*   **Player-Steuerung:** Eine "Now Playing"-Leiste zeigt das aktuell laufende Video an
*   **API-Key-Management:** Sichere Verwaltung deines YouTube API-Schlüssels
*   **Einstellungsseite:** Professionelle Konfiguration der App
*   **Playlist-System:** Erstelle und verwalte deine eigenen Wiedergabelisten
*   **Theme-Toggle:** Wechsle zwischen Dark und Light Mode
*   **Download-Funktionalität:** Direkter Zugriff auf YouTube-Videos
*   **Erweiterte Suchfilter:** Professionelle Suchoptionen
*   **Benachrichtigungssystem:** Elegante Toast-Notifications

## 🛠️ Setup & Installation

### **Erste Einrichtung:**

1.  **Klone das Repository:**
    ```bash
    git clone https://github.com/David-dev-web/DavidTube-Client.git
    ```
2.  **Navigiere in den Projektordner:**
    ```bash
    cd DavidTube-Client
    ```
3.  **Installiere die Abhängigkeiten:**
    ```bash
    npm install
    ```
4.  **Starte die App:**
    ```bash
    npm start
    ```

### **API-Key einrichten:**

1. **Beim ersten Start** öffnet sich automatisch der Einrichtungsbildschirm
2. **Gehe zu [Google Cloud Console](https://console.developers.google.com/)**
3. **Erstelle ein neues Projekt** oder wähle ein bestehendes
4. **Aktiviere die YouTube Data API v3**
5. **Erstelle einen API-Schlüssel** unter "Anmeldedaten"
6. **Füge den Schlüssel in die App ein** - er wird automatisch getestet und gespeichert

### **Build der App:**

# App packen
npm run pack

# Installer erstellen
npm run dist
```

## 💡 Gelernte Technologien

*   **Electron:** Zum Erstellen der Cross-Platform-Desktop-Anwendung
*   **Node.js:** Für das Backend und die Paketverwaltung
*   **YouTube Data API v3:** Für das Abrufen von Video-Daten
*   **Reines JavaScript (ES6+):** Für die gesamte Anwendungslogik
*   **CSS3:** Für das Styling und die Animationen (Flexbox, Grid, Keyframes)
*   **Git & GitHub:** Für die Versionskontrolle
*   **Sichere Konfigurationsverwaltung:** Für API-Keys und App-Einstellungen
*   **Playlist-Management:** Für die Verwaltung von Wiedergabelisten
*   **Theme-System:** Für dynamische UI-Anpassungen
*   **Benachrichtigungssystem:** Für moderne UX-Patterns

## 🔧 Technische Verbesserungen

### **Architektur:**
- **Modulare Struktur:** Bessere Trennung von Concerns
- **IPC-Kommunikation:** Sichere Kommunikation zwischen Haupt- und Renderer-Prozess
- **Fehlerbehandlung:** Robuste Behandlung von API-Fehlern
- **Konfigurationsverwaltung:** Zentrale Einstellungsverwaltung
- **Playlist-System:** Vollständige Wiedergabelisten-Verwaltung
- **Theme-Engine:** Dynamisches Theme-Switching

### **Benutzerfreundlichkeit:**
- **Intuitive Einrichtung:** Schritt-für-Schritt-Anleitung für API-Key
- **Visuelles Feedback:** Status-Indikatoren und Erfolgsmeldungen
- **Responsive Design:** Moderne UI mit sanften Animationen
- **Barrierefreiheit:** Klare Beschriftungen und Hilfetexte
- **Playlist-Integration:** Nahtlose Integration in die Video-Erfahrung
- **Theme-Personalisation:** Individuelle Anpassung der App

## 🚀 Nächste Schritte

Geplante Features für zukünftige Versionen:
- **Offline-Modus** für gespeicherte Videos
- **Erweiterte Playlist-Features** (Kollaboration, Sharing)
- **Video-Download** in verschiedenen Qualitäten
- **Keyboard-Shortcuts** für Power-User
- **Multi-Language Support** (Deutsch, Englisch, etc.)
- **Cloud-Sync** für Playlists und Favoriten

## 📝 Changelog

### **Version 5.0.0** 🎉
- 🎵 **NEU:** Vollständiges Playlist-System
- 🌓 **NEU:** Dark/Light Theme Toggle
- 📥 **NEU:** Download-Funktionalität
- 🔍 **NEU:** Erweiterte Suchfilter
- 🔔 **NEU:** Toast-Benachrichtigungssystem
- 🎨 **VERBESSERT:** UI/UX mit Animationen
- 🚀 **VERBESSERT:** Performance und Stabilität

### **Version 4.0.0**
- ✨ Neue API-Key-Management-Funktionalität
- 🎛️ Einstellungsseite hinzugefügt
- 🔒 Verbesserte Sicherheit (keine hartcodierten API-Keys)
- 🎨 Verbesserte Welcome-Seite mit Anleitungen
- 🚀 App-Neustart-Funktionalität
- 📱 Responsive Design-Verbesserungen

### **Version 3.x**
- 🎯 Live-Suche mit Debouncing
- 💖 Favoriten-System
- 🎮 Kategorien-Entdeckung
- 🎨 Spotify-inspiriertes Design

## 🤝 Beitragen

Verbesserungen und Bug-Reports sind willkommen! Bitte erstelle ein Issue oder einen Pull Request.

## 📄 Lizenz

ISC License - siehe LICENSE-Datei für Details.

---

**Entwickelt mit ❤️ von David**
=======
*   **Electron:** Zum Erstellen der Cross-Platform-Desktop-Anwendung.
*   **Node.js:** Für das Backend und die Paketverwaltung.
*   **YouTube Data API v3:** Für das Abrufen von Video-Daten.
*   **Reines JavaScript (ES6+ ):** Für die gesamte Anwendungslogik (DOM-Manipulation, asynchrone Anfragen).
*   **CSS3:** Für das Styling und die Animationen (Flexbox, Grid, Keyframes).
*   **Git & GitHub:** Für die Versionskontrolle.
>>>>>>> e2a11d7764b716f6d6d0782bfbb1f6c1917321dc

