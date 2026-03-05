const { loadDB, saveDB, adminAuth } = require('./db');

module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'x-admin-key, content-type');
    res.setHeader('Access-Control-Allow-Methods', 'DELETE, PATCH, OPTIONS');

    if (req.method === 'OPTIONS') return res.status(200).end();
    if (!adminAuth(req)) return res.status(401).json({ error: 'Yetkisiz' });

    const { key } = req.query;
    const db = await loadDB();

    if (!db[key]) return res.status(404).json({ error: 'Bulunamadı' });

    if (req.method === 'DELETE') {
        delete db[key];
        await saveDB(db);
        return res.json({ success: true });
    }

    if (req.method === 'PATCH') {
        db[key].aktif = !db[key].aktif;
        await saveDB(db);
        return res.json({ success: true, aktif: db[key].aktif });
    }

    res.status(405).end();
};
