// store.js
const fs = require('fs');
const path = require('path');

class Store {
    constructor(opts) {
        const userDataPath = process.env.APPDATA || (process.platform == 'darwin' ? process.env.HOME + '/Library/Preferences' : process.env.HOME + "/.local/share");
        this.path = path.join(userDataPath, opts.configName + '.json');
        this.data = parseDataFile(this.path, opts.defaults);
    }

    get(key) {
        return this.data[key];
    }

    set(key, val) {
        this.data[key] = val;
        fs.writeFileSync(this.path, JSON.stringify(this.data));
    }
}

function parseDataFile(filePath, defaults) {
    try {
        return JSON.parse(fs.readFileSync(filePath));
    } catch (error) {
        return defaults;
    }
}

module.exports = Store;
