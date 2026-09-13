require('dotenv').config();
const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

// Kendi SMM panelindeki Servis ID'lerini buraya yazacaksın:
const hizmetEslesmeleri = {
    "⭐[SORUNSUZ] İnstagram 1000 Takipçi⭐": { servisId: 12639, miktar: 1000 },
    "500 TikTok İzlenme": { servisId: 210, miktar: 500 },
    "100 Chat Bot": { servisId: 305, miktar: 100 },
    "Test İlan": { servisId: 999, miktar: 1 } // Testleri gerçekte de denemek için
};

app.post('/webhook', async (req, res) => {
    console.log("🔔 İtemsatış'tan yeni bir bildirim yakalandı!");

    const detaylar = req.body.details;

    if (!detaylar || detaylar.event !== 'advert_sold') {
        return res.status(200).send("İlgilenilmeyen bildirim türü.");
    }

    // İtemsatış test butonuna basıldıysa bunu loglayıp geçelim
    if (detaylar.test === true) {
        console.log(`🛠️ Test Bildirimi Doğrulandı -> İlan: ${detaylar.advert.title}`);
        return res.status(200).send("Test başarıyla alındı.");
    }

    const ilanAdi = detaylar.advert.title;
    
    // Gerçek siparişte müşterinin form alanına yazdığı link / kullanıcı adı
    // (İtemsatış'ın gerçek sipariş JSON yapısına göre burası customer_note veya user_input olabilir)
    const link = detaylar.customer_note || detaylar.user_input || "link_bulunamadi"; 

    const hizmet = hizmetEslesmeleri[ilanAdi];

    if (!hizmet) {
        console.log(`⚠️ Uyarı: '${ilanAdi}' adında bir ilan satıldı ama kodda Servis ID eşleşmesi bulunamadı!`);
        return res.status(200).send("Servis eşleşmesi yok."); 
    }

    console.log(`🚀 SMM Paneline Sipariş Gönderiliyor... İlan: ${ilanAdi} | Link: ${link} | Miktar: ${hizmet.miktar}`);

    try {
        // SMM Paneline API isteği atıyoruz
        const smmYanit = await axios.post(process.env.SMM_API_URL, {
            key: process.env.SMM_API_KEY,
            action: 'add',
            service: hizmet.servisId,
            link: link,
            quantity: hizmet.miktar
        });

        console.log("✅ SMM Panel Başarılı Yanıtı:", smmYanit.data);
        return res.status(200).send("Sipariş başarıyla SMM paneline iletildi.");

    } catch (error) {
        console.error("❌ SMM API İstek Hatası:", error.response?.data || error.message);
        return res.status(500).send("SMM bağlantı hatası.");
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Otomasyon sunucusu aktif. Port: ${PORT}`);
});