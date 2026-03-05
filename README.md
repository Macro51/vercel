# LisansPanel - Kurulum Rehberi

## 1. JSONBin.io Kurulumu (Veritabanı)

1. https://jsonbin.io adresine git ve ücretsiz hesap oluştur
2. "New Bin" butonuna tıkla
3. İçine `{}` yaz ve kaydet
4. Bin ID'ni kopyala (URL'de görünüyor: `/v3/b/BURASI`)
5. "API Keys" bölümünden Master Key'ini kopyala

## 2. Vercel Kurulumu

1. https://vercel.com adresine git ve GitHub ile giriş yap
2. Bu klasörü GitHub'a yükle
3. Vercel'de "New Project" → GitHub reposunu seç
4. "Environment Variables" bölümüne şunları ekle:
   - `ADMIN_KEY` = kendi belirlediğin şifre (örn: Ahmet2025!)
   - `JSONBIN_BIN_ID` = JSONBin'den aldığın Bin ID
   - `JSONBIN_API_KEY` = JSONBin'den aldığın Master Key
5. Deploy et!

## 3. ChatPlugin Kurulumu

config.yml'e şunu ekle:
```yaml
lisans-key: "BURAYA-LISANS-KEY-YAZ"
lisans-api: "https://PROJE-ADIN.vercel.app"
```

## Panel Kullanımı

- Panel adresi: https://PROJE-ADIN.vercel.app
- Giriş şifresi: ADMIN_KEY olarak belirlediğin şifre
- "Lisans Oluştur" sekmesinden yeni lisans oluştur
- Oluşan key'i müşteriye gönder
