const { loadDB, adminAuth } = require('./db');

module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'x-admin-key, content-type');

    if (req.method === 'OPTIONS') return res.status(200).end();
    if (!adminAuth(req)) return res.status(401).json({ error: 'Yetkisiz' });

    const db = await loadDB();
    res.json(Object.values(db));
};
