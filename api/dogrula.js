const { loadDB } = require('./db');

module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'content-type');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');

    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'POST') return res.status(405).end();

    const { key, plugin } = req.body;
    if (!key || !plugin) return res.json({ gecerli: false, mesaj: 'Eksik bilgi' });

    const db = await loadDB();
    const lisans = db[key.toUpperCase()];

    if (!lisans) return res.json({ gecerli: false, mesaj: 'Lisans bulunamadi' });
    if (!lisans.aktif) return res.json({ gecerli: false, mesaj: 'Lisans devre disi' });
    if (lisans.plugin !== plugin && lisans.plugin !== 'hepsi')
        return res.json({ gecerli: false, mesaj: 'Bu lisans bu plugin icin degil' });
    if (lisans.expiry && Date.now() > lisans.expiry)
        return res.json({ gecerli: false, mesaj: 'Lisans suresi dolmus' });

    res.json({ gecerli: true, mesaj: 'Gecerli', isim: lisans.isim });
};
