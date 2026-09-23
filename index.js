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
    "⭐[SORUNSUZ] İnstagram 1000 Takipçi⭐": { servisId: 13066, miktar: 1000 },
    "⭐[SORUNSUZ] İnstagram 5000 Takipçi⭐": { servisId: 13066, miktar: 5000 },
    "⭐[SORUNSUZ] İnstagram 2500 Takipçi⭐": { servisId: 13066, miktar: 2500 },
    "⭐[SORUNSUZ] İnstagram 100 Takipçi⭐": { servisId: 13066, miktar: 100 },
    "⭐[SORUNSUZ] İnstagram 500 Takipçi⭐": { servisId: 13066, miktar: 500 },
    "⭐ [SORUNSUZ] İnstagram 500.000 İzlenme⭐": { servisId: 12997, miktar: 500000 },
    "⭐ [SORUNSUZ] İnstagram 250.000 İzlenme⭐": { servisId: 12997, miktar: 250000 },
    "⭐ [SORUNSUZ] İnstagram 200.000 İzlenme⭐": { servisId: 12997, miktar: 200000 },
    "⭐ [SORUNSUZ] İnstagram 100.000 İzlenme⭐": { servisId: 12997, miktar: 100000 },
    "⭐[GARANTİ] İnstagram 1000 Beğeni ⭐": { servisId: 13026, miktar: 1000 },
    "⭐[GARANTİ] İnstagram 2.500 Beğeni ⭐": { servisId: 13026, miktar: 2500 },
    "⭐[GARANTİ] İnstagram 5.000 Beğeni ⭐": { servisId: 13026, miktar: 5000 },
    "⭐[GARANTİ] İnstagram 100 Beğeni ⭐": { servisId: 13026, miktar: 100 },
    "⭐[GARANTİ] İnstagram 10.000 Beğeni ⭐": { servisId: 13026, miktar: 10000 },
    "⭐[GARANTİ] TikTok 1000 Takipçi ⭐": { servisId: 11458, miktar: 1000 },
    "⭐[GARANTİ] TİKTOK 5000 Takipçi ⭐": { servisId: 11458, miktar: 5000 },
    "⭐[GARANTİ] TİKTOK 2500 Takipçi ⭐": { servisId: 11458, miktar: 2500 },
    "⭐[GARANTİ] TİKTOK 500 Takipçi ⭐": { servisId: 11458, miktar: 500 },
    "⭐[SORUNSUZ] TİKTOK 50 TÜRK YORUM⭐": { servisId: 11234, miktar: 50 },
    "⭐[SORUNSUZ] TİKTOK 500 TÜRK YORUM⭐": { servisId: 11234, miktar: 500 },
    "⭐[SORUNSUZ] TİKTOK 250 TÜRK YORUM⭐": { servisId: 11234, miktar: 250 },
    "⭐[SORUNSUZ] TİKTOK 1000 TÜRK YORUM⭐": { servisId: 11234, miktar: 1000 },
    "⭐[SORUNSUZ] TİKTOK 100 TÜRK YORUM⭐": { servisId: 11234, miktar: 100 },
    "⭐[GARANTİ] TikTok 1000 Beğeni ⭐": { servisId: 12809, miktar: 1000 },
    "⭐[GARANTİ] TikTok 2500 Beğeni ⭐": { servisId: 12809, miktar: 2500 },
    "⭐[GARANTİ] TikTok 5000 Beğeni ⭐": { servisId: 12809, miktar: 5000 },
    "⭐[GARANTİ] TikTok 7500 Beğeni ⭐": { servisId: 12809, miktar: 7500 },
    "⭐[ANINDA] Tiktok 3000 PK Puanı⭐": { servisId: 11602, miktar: 3000 },
    "⭐[ANINDA] Tiktok 5000 PK Puanı⭐": { servisId: 11602, miktar: 5000 },
    "⭐[ANINDA] Tiktok 10000 PK Puanı⭐": { servisId: 11602, miktar: 10000 },
    "⭐[GARANTİ] TikTok 10.000 Beğeni ⭐": { servisId: 10479, miktar: 10000 },
    "⭐[GARANTİ] Tiktok 25.000 İzlenme⭐": { servisId: 11175, miktar: 25000 },
    "⭐[GARANTİ] Tiktok 50.000 İzlenme⭐": { servisId: 11175, miktar: 50000 },
    "⭐[GARANTİ] Tiktok 100.000 İzlenme⭐": { servisId: 11175, miktar: 100000 },
    "⭐[GARANTİ] Tiktok 250.000 İzlenme⭐": { servisId: 11175, miktar: 250000 },
    "⭐[GARANTİ] Tiktok 500.000 İzlenme⭐": { servisId: 11175, miktar: 500000 },
    "⭐[GARANTİ] Tiktok 1.000.000 İzlenme⭐": { servisId: 11175, miktar: 1000000 },
    "⭐[GARANTİ] TikTok 12500 Kaydetme⭐": { servisId: 3685, miktar: 12500 },
    "⭐[SORUNSUZ] WhatsAPP 5.000 Kanal Üyesi⭐": { servisId: 12713, miktar: 5000 },
    "⭐[SORUNSUZ] WhatsAPP 2.500 Kanal Üyesi⭐": { servisId: 12713, miktar: 2500 },
    "⭐[SORUNSUZ] WhatsAPP 1.000 Kanal Üyesi⭐": { servisId: 12713, miktar: 1000 },
    "⭐[SORUNSUZ] Telegram 5.000 Üye⭐": { servisId: 12951, miktar: 5000 },
    "⭐[SORUNSUZ] Telegram 2.500 Üye⭐": { servisId: 12951, miktar: 2500 },
    "⭐[SORUNSUZ] Telegram 1.000 Üye⭐": { servisId: 12951, miktar: 1000 },
    "⭐[SORUNSUZ] Telegram 2.500 Tepki⭐": { servisId: 12849, miktar: 2500 },
    "⭐[SORUNSUZ] Telegram 1000 Tepki⭐": { servisId: 12849, miktar: 1000 },
    "⭐[SORUNSUZ] Telegram 5.000 Tepki⭐": { servisId: 12849, miktar: 5000 },
    "⭐[ANINDA] YouTube 1.000 Beğeni⭐": { servisId: 12651, miktar: 1000 },
    "⭐[ANINDA] YouTube 2.500 Beğeni⭐": { servisId: 12651, miktar: 2500 },
    "⭐[ANINDA] YouTube 500 Beğeni⭐": { servisId: 12651, miktar: 500 },
    "⭐️[KALİTELİ] Facebook 5.000 Takipçi⭐️": { servisId: 13061, miktar: 5000 },
    "⭐️[KALİTELİ] Facebook 2.500 Takipçi⭐️": { servisId: 13061, miktar: 2500 },
    "⭐️[KALİTELİ] Facebook 2.000 Takipçi⭐️": { servisId: 13061, miktar: 2000 },
    "⭐️[1 Saat] Facebook 100 Canlı İzleyici⭐️": { servisId: 11862, miktar: 100 },
    "⭐️[1 Saat] Facebook 250 Canlı İzleyici⭐️": { servisId: 11862, miktar: 250 },
    "⭐️[1 Saat] Facebook 500 Canlı İzleyici⭐️": { servisId: 11862, miktar: 500 },
    "⭐️[KALİTELİ] Facebook 1000 Grup Üyesi⭐️": { servisId: 12095, miktar: 1000 },
    "⭐️[KALİTELİ] Facebook 2500 Grup Üyesi⭐️": { servisId: 12095, miktar: 2500 },
    "⭐️[KALİTELİ] Facebook 5000 Grup Üyesi⭐️": { servisId: 12095, miktar: 5000 },
    "⭐️[KALİTELİ] Twitter 50.000 İzlenme⭐️": { servisId: 10949, miktar: 50000 },
    "⭐️[KALİTELİ] Twitter 100.000 İzlenme⭐️": { servisId: 10949, miktar: 100000 },
    "⭐️[KALİTELİ] Twitter 250.000 İzlenme⭐️": { servisId: 10949, miktar: 250000 },
    "⭐️[KALİTELİ] Twitter 2500 Beğeni⭐️": { servisId: 12574, miktar: 2500 },
    "⭐️[KALİTELİ] Twitter 1000 Beğeni⭐️": { servisId: 12574, miktar: 1000 },
    "⭐️[KALİTELİ] Twitter 500 Retweet⭐️": { servisId: 12737, miktar: 500 },
    "⭐️[KALİTELİ] Twitter 1000 Retweet⭐️": { servisId: 12737, miktar: 1000 },
    "⭐️[KALİTELİ] Twitter 2500 Retweet⭐️": { servisId: 12737, miktar: 2500 },
    "⭐️[KALİTELİ] Twitter 1000 Takipçi⭐️": { servisId: 12570, miktar: 1000 },
    "⭐️[KALİTELİ] Twitter 500 Takipçi⭐️": { servisId: 12570, miktar: 500 },
    "⭐️[KALİTELİ] Twitter 2500 Takipçi⭐️": { servisId: 12570, miktar: 2500 },
    "⭐️[KALİTELİ] Linkedin 100 Takipçi⭐️": { servisId: 12769, miktar: 100 },
    "⭐️[KALİTELİ] Linkedin 250 Takipçi⭐️": { servisId: 12769, miktar: 250 },
    "⭐️[KALİTELİ] Linkedin 500 Takipçi⭐️": { servisId: 12769, miktar: 500 },
    "⭐ 4X [ANINDA] Keşfet Mini Paket TikTok ⭐": [
        { servisId: 11175, miktar: 50000 }, 
        { servisId: 12809, miktar: 2500  }, 
        { servisId: 3685, miktar: 250 },
        { servisId: 11234, miktar: 50 },
    ],
    "⭐ 4X [ANINDA] Keşfet Mega Paket TikTok ⭐": [
        { servisId: 11175, miktar: 100000 }, 
        { servisId: 12809, miktar: 5000  }, 
        { servisId: 3685, miktar: 500 },
        { servisId: 11234, miktar: 100 },
    ],
    "⭐ 4X [ANINDA] Keşfet Prime Paket TikTok ⭐": [
        { servisId: 11175, miktar: 250000 }, 
        { servisId: 12809, miktar: 12500  }, 
        { servisId: 3685, miktar: 1250 },
        { servisId: 11234, miktar: 250 },
    ],
    "⭐ 4X [ANINDA] Keşfet Premium Paket TikTok ⭐": [
        { servisId: 11175, miktar: 500000 }, 
        { servisId: 12809, miktar: 25000  }, 
        { servisId: 3685, miktar: 2500 },
        { servisId: 11234, miktar: 500 },
    ],
    "⭐ 4X [ANINDA] Keşfet Mega Paket Instagram ⭐": [
        { servisId: 12997, miktar: 100000 }, 
        { servisId: 13026, miktar: 5000  }, 
        { servisId: 9508, miktar: 500 },
        { servisId: 8538, miktar: 100 },
    ],
    "⭐ 4X [ANINDA] Keşfet Prime Paket Instagram ⭐": [
        { servisId: 12997, miktar: 250000 }, 
        { servisId: 13026, miktar: 15000  }, 
        { servisId: 9508, miktar: 1250 },
        { servisId: 8538, miktar: 250 },
    ],
    "Test İlan": { servisId: 13025, miktar: 50 } // Testleri gerçekte de denemek için
};

app.post('/webhook', async (req, res) => {
    console.log("🔔 İtemsatış'tan yeni bir bildirim yakalandı!");
    console.log("Gelen Veri Detayı:", req.body);

    const detaylar = req.body.details;

    // 'order' veya 'advert_sold' gelirse kabul etmesi için güncelliyoruz
    if (!detaylar || (detaylar.event !== 'order' && detaylar.event !== 'advert_sold')) {
        return res.status(200).send("İlgilenilmeyen bildirim türü.");
    }

    // İtemsatış test butonuna basıldıysa bunu loglayıp geçelim
    if (detaylar.test === true) {
        console.log(`🛠️ Test Bildirimi Doğrulandı -> İlan: ${detaylar.advert.title}`);
        return res.status(200).send("Test başarıyla alındı.");
    }

    const ilanAdi = detaylar.advert.title;
    
    // Linki doğru yerden (post_datas içindeki Türkçe anahtardan) çekiyoruz
let link = "link_bulunamadi";

if (detaylar.post_datas && Object.keys(detaylar.post_datas).length > 0) {
    link = Object.values(detaylar.post_datas)[0];
} else if (detaylar.customer_note) {
    link = detaylar.customer_note;
} else if (detaylar.user_input) {
    link = detaylar.user_input;
}

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