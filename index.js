require('dotenv').config();
const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

// 🟢 UPTIMEROBOT İÇİN PING NOKTASI (Sunucuyu 7/24 uyanık tutar)
app.get('/', (req, res) => {
    res.status(200).send("Otomasyon sunucusu 7/24 aktif!");
});
// Kendi SMM panelindeki Servis ID'lerini buraya yazacaksın:
const hizmetEslesmeleri = {
    "⭐[SORUNSUZ] İnstagram 1000 Takipçi⭐": { servisId: 12639, miktar: 1000 },
    "⭐[SORUNSUZ] İnstagram 5000 Takipçi⭐": { servisId: 12639, miktar: 5000 },
    "⭐[SORUNSUZ] İnstagram 2500 Takipçi⭐": { servisId: 12639, miktar: 2500 },
    "⭐[SORUNSUZ] İnstagram 100 Takipçi⭐": { servisId: 12639, miktar: 100 },
    "⭐[SORUNSUZ] İnstagram 500 Takipçi⭐": { servisId: 12639, miktar: 500 },
    "⭐ [SORUNSUZ] İnstagram 500.000 İzlenme⭐": { servisId: 12953, miktar: 500000 },
    "⭐ [SORUNSUZ] İnstagram 250.000 İzlenme⭐": { servisId: 12953, miktar: 250000 },
    "⭐ [SORUNSUZ] İnstagram 200.000 İzlenme⭐": { servisId: 12953, miktar: 200000 },
    "⭐ [SORUNSUZ] İnstagram 100.000 İzlenme⭐": { servisId: 12953, miktar: 100000 },
    "⭐[GARANTİ] İnstagram 1000 Beğeni ⭐": { servisId: 12986, miktar: 1000 },
    "⭐[GARANTİ] İnstagram 2.500 Beğeni ⭐": { servisId: 12986, miktar: 2500 },
    "⭐[GARANTİ] İnstagram 5.000 Beğeni ⭐": { servisId: 12986, miktar: 5000 },
    "⭐[GARANTİ] İnstagram 100 Beğeni ⭐": { servisId: 12986, miktar: 100 },
    "⭐[GARANTİ] İnstagram 10.000 Beğeni ⭐": { servisId: 12986, miktar: 10000 },
    "⭐[GARANTİ] TikTok 1000 Takipçi ⭐": { servisId: 11249, miktar: 1000 },
    "⭐[GARANTİ] TİKTOK 5000 Takipçi ⭐": { servisId: 11249, miktar: 5000 },
    "⭐[GARANTİ] TİKTOK 2500 Takipçi ⭐": { servisId: 11249, miktar: 2500 },
    "⭐[GARANTİ] TİKTOK 2000 Takipçi ⭐": { servisId: 11249, miktar: 2000 },
    "⭐[GARANTİ] TİKTOK 500 Takipçi ⭐": { servisId: 11249, miktar: 500 },
    "⭐[SORUNSUZ] TİKTOK 50 TÜRK YORUM⭐": { servisId: 11234, miktar: 50 },
    "⭐[SORUNSUZ] TİKTOK 500 TÜRK YORUM⭐": { servisId: 11234, miktar: 500 },
    "⭐[SORUNSUZ] TİKTOK 250 TÜRK YORUM⭐": { servisId: 11234, miktar: 250 },
    "⭐[SORUNSUZ] TİKTOK 1000 TÜRK YORUM⭐": { servisId: 11234, miktar: 1000 },
    "⭐[SORUNSUZ] TİKTOK 100 TÜRK YORUM⭐": { servisId: 11234, miktar: 100 },
    "⭐[GARANTİ] TikTok 1000 Beğeni ⭐": { servisId: 10479, miktar: 1000 },
    "⭐[GARANTİ] TikTok 2500 Beğeni ⭐": { servisId: 10479, miktar: 2500 },
    "⭐[GARANTİ] TikTok 5000 Beğeni ⭐": { servisId: 10479, miktar: 5000 },
    "⭐[GARANTİ] TikTok 7500 Beğeni ⭐": { servisId: 10479, miktar: 7500 },
    "⭐[GARANTİ] TikTok 10000 Beğeni ⭐": { servisId: 10479, miktar: 10000 },
    "⭐[GARANTİ] TikTok 12500 Kaydetme⭐": { servisId: 3685, miktar: 12500 },
    "⭐ 4X [ANINDA] Keşfet Mini Paket TikTok ⭐": [
        { servisId: 11175, miktar: 50000 }, 
        { servisId: 10479, miktar: 2500  }, 
        { servisId: 3685, miktar: 250 },
        { servisId: 11234, miktar: 50 },
    ],
    "⭐ 4X [ANINDA] Keşfet Mega Paket TikTok ⭐": [
        { servisId: 11175, miktar: 100000 }, 
        { servisId: 10479, miktar: 5000  }, 
        { servisId: 3685, miktar: 500 },
        { servisId: 11234, miktar: 100 },
    ],
    "⭐ 4X [ANINDA] Keşfet Prime Paket TikTok ⭐": [
        { servisId: 11175, miktar: 250000 }, 
        { servisId: 10479, miktar: 12500  }, 
        { servisId: 3685, miktar: 1250 },
        { servisId: 11234, miktar: 250 },
    ],
    "⭐ 4X [ANINDA] Keşfet Premium Paket TikTok ⭐": [
        { servisId: 11175, miktar: 500000 }, 
        { servisId: 10479, miktar: 25000  }, 
        { servisId: 3685, miktar: 2500 },
        { servisId: 11234, miktar: 500 },
    ],
    "⭐ 4X [ANINDA] Keşfet Mega Paket Instagram ⭐": [
        { servisId: 12953, miktar: 100000 }, 
        { servisId: 12986, miktar: 5000  }, 
        { servisId: 9508, miktar: 500 },
        { servisId: 8538, miktar: 100 },
    ],
    "⭐ 4X [ANINDA] Keşfet Prime Paket Instagram ⭐": [
        { servisId: 12953, miktar: 250000 }, 
        { servisId: 12986, miktar: 15000  }, 
        { servisId: 9508, miktar: 1250 },
        { servisId: 8538, miktar: 250 },
    ],
    "Test İlan": { servisId: 13025, miktar: 50 } // Testleri gerçekte de denemek için
};

app.post('/webhook', async (req, res) => {
    console.log("🔔 İtemsatış'tan yeni bir bildirim yakalandı!");
console.log("Gelen Veri Detayı:", req.body);
    const detaylar = req.body.details;

    if (!detaylar || detaylar.event !== 'advert_sold') {
        return res.status(200).send("İlgilenilmeyen bildirim türü.");
    }

    // İtemsatış test butonuna basıldıysa bunu loglayıp geçelim
    if (detaylar.test === true) {
        console.log(`🛠️ Test Bildirimi Doğrulandı -> İlan: ${detaylar.advert.title}`);
        return res.status(200).send("Test başarıyla alındı.");
    }

const eventType = req.body.details.event; // 'order' dönmesi lazım
const ilanAdi = req.body.details.advert.title; // 'Test İlan' yazan kısım
const siparisVeren = req.body.details.customer.name;

// Linki çekmek için post_datas'ın ilk elemanının içindeki anahtarı tam yazmalıyız:
const link = req.body.details.post_datas[0]["Gönderi (Post) Linki"];

    const hizmet = hizmetEslesmeleri[ilanAdi];

    if (!hizmet) {
        console.log(`⚠️ Uyarı: '${ilanAdi}' adında bir ilan satıldı ama kodda Servis ID eşleşmesi bulunamadı!`);
        return res.status(200).send("Servis eşleşmesi yok.");
    }

    console.log(`🚀 SMM Paneline Sipariş Gönderiliyor... İlan: ${ilanAdi} | Link: ${link}`);

    try {
        // Eğer tekli servis girildiyse bile bunu dizi (array) içine alıyoruz ki for döngüsü patlamasın
        const gonderilecekServisler = Array.isArray(hizmet) ? hizmet : [hizmet];

        // Paketteki tüm servisler için SMM paneline sırayla istek atıyoruz
        for (const servis of gonderilecekServisler) {
            console.log(`⏳ Servis işleniyor... ID: ${servis.servisId} | Miktar: ${servis.miktar}`);

            const smmYanit = await axios.post(process.env.SMM_API_URL, {
                key: process.env.SMM_API_KEY,
                action: 'add',
                service: servis.servisId,
                link: link,
                quantity: servis.miktar
            });

            console.log(`✅ SMM Panel Başarılı Yanıtı (Servis ${servis.servisId}):`, smmYanit.data);
        }

        return res.status(200).send("Sipariş(ler) başarıyla SMM paneline iletildi.");

    } catch (error) {
        console.error("❌ SMM API İstek Hatası:", error.response?.data || error.message);
        return res.status(500).send("SMM bağlantı hatası.");
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Otomasyon sunucusu aktif. Port: ${PORT}`);
});