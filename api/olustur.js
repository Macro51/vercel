const { loadDB, saveDB, generateKey, calcExpiry, adminAuth } = require('./db');

module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'x-admin-key, content-type');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');

    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'POST') return res.status(405).end();
    if (!adminAuth(req)) return res.status(401).json({ error: 'Yetkisiz' });

    const { isim, sure, plugin } = req.body;
    if (!isim || !sure || !plugin) return res.status(400).json({ error: 'Eksik alan' });

    const db = await loadDB();
    const key = generateKey();
    const expiry = calcExpiry(sure);

    db[key] = {
        key, isim, plugin, sure,
        expiry,
        olusturulma: Date.now(),
        aktif: true
    };

    await saveDB(db);
    res.json({ success: true, key, isim, sure, plugin, expiry });
};
