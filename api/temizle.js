const { saveDB, adminAuth } = require('./db');

module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'x-admin-key, content-type');

    if (!adminAuth(req)) return res.status(401).json({ error: 'Yetkisiz' });
    await saveDB({});
    res.json({ success: true, mesaj: 'Veritabani temizlendi' });
};
