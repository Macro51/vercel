// Upstash Redis veritabanı yardımcısı
const KV_URL = process.env.KV_REST_API_URL;
const KV_TOKEN = process.env.KV_REST_API_TOKEN;

async function kvGet(key) {
    const res = await fetch(`${KV_URL}/get/${key}`, {
        headers: { Authorization: `Bearer ${KV_TOKEN}` }
    });
    const data = await res.json();
    return data.result ? JSON.parse(data.result) : {};
}

async function kvSet(key, value) {
    await fetch(`${KV_URL}/set/${key}`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${KV_TOKEN}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(JSON.stringify(value))
    });
}

async function loadDB() {
    return await kvGet('lisanslar');
}

async function saveDB(data) {
    await kvSet('lisanslar', data);
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
