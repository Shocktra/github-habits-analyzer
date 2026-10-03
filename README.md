# GitHub Habits Analyzer

Bir GitHub kullanıcı adı girin; profil kartını ve en çok kullanılan 5 programlama dilini (fork'lar hariç) halka grafik olarak görün. GitHub'ın herkese açık REST API'sini kullanır, giriş gerekmez.

> Not: kimlik doğrulamasız API istekleri saatte 60 ile sınırlıdır. Limite ulaşılırsa uygulama bunu belirten bir uyarı gösterir.

## Geliştirme

```bash
npm install
npm run dev     # geliştirme sunucusu
npm test        # birim testleri (vitest)
npm run lint    # oxlint
npm run build   # üretim derlemesi
```

Teknolojiler: React, Vite, Chart.js.
