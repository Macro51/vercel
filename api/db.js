// JSONBin.io veritabanı yardımcısı
const JSONBIN_URL = 'https://api.jsonbin.io/v3/b/' + process.env.JSONBIN_BIN_ID;
const JSONBIN_KEY = process.env.JSONBIN_API_KEY;

async function loadDB() {
    const res = await fetch(JSONBIN_URL + '/latest', {
        headers: { 'X-Master-Key': JSONBIN_KEY }
    });
    const data = await res.json();
    return data.record || {};
}

async function saveDB(data) {
    await fetch(JSONBIN_URL, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'X-Master-Key': JSONBIN_KEY
        },
        body: JSON.stringify(data)
    });
}

function generateKey() {
    const part = () => Math.random().toString(36).substring(2, 6).toUpperCase() +
                       Math.random().toString(36).substring(2, 6).toUpperCase();
    return `${part()}-${part()}-${part()}-${part()}`;
}

function calcExpiry(sure) {
    if (sure === 'sinirsiz') return null;
    const now = Date.now();
    const map = {
        '1hafta': 7 * 24 * 3600 * 1000,
        '1ay':    30 * 24 * 3600 * 1000,
        '3ay':    90 * 24 * 3600 * 1000,
        '6ay':    180 * 24 * 3600 * 1000,
        '1yil':   365 * 24 * 3600 * 1000
    };
    return now + (map[sure] || 0);
}

function adminAuth(req) {
    return req.headers['x-admin-key'] === process.env.ADMIN_KEY;
}

module.exports = { loadDB, saveDB, generateKey, calcExpiry, adminAuth };
