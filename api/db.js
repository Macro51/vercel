const KV_URL = process.env.KV_REST_API_URL;
const KV_TOKEN = process.env.KV_REST_API_TOKEN;

async function kvGet(key) {
    const res = await fetch(`${KV_URL}/get/${encodeURIComponent(key)}`, {
        headers: { Authorization: `Bearer ${KV_TOKEN}` }
    });
    const data = await res.json();
    if (!data.result) return {};
    // Upstash bazen string, bazen obje döner
    if (typeof data.result === 'string') return JSON.parse(data.result);
    return data.result;
}

async function kvSet(key, value) {
    const res = await fetch(`${KV_URL}/set/${encodeURIComponent(key)}`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${KV_TOKEN}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(JSON.stringify(value))
    });
    return res.ok;
}

async function loadDB() {
    return await kvGet('lisanslar');
}

async function saveDB(data) {
    return await kvSet('lisanslar', data);
}

function generateKey() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const part = () => Array.from({length: 8}, () => chars[Math.floor(Math.random() * chars.length)]).join('');
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
