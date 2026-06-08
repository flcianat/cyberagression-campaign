**Project Overview**

Ringkasan singkat: proyek ini adalah aplikasi frontend berbasis React + Vite dengan TypeScript. Struktur utama ada di folder src/ dan aset statis di public/assets/.

**Framework Frontend**

- **Pilihan:** React + Vite + TypeScript.
- **Detil implementasi:** kode sumber utama berupa file .tsx di src/ (mis. App.tsx, main.tsx, komponen di src/components/). Vite dipakai sebagai bundler/dev-server (konfigurasi di vite.config.ts) untuk build cepat dan HMR.

**Styling System**

- **Pilihan saat ini:** CSS global + komponen React.
- **Detil implementasi:** ada file src/index.css untuk gaya global; komponen menggunakan styling berbasis kelas CSS yang disimpan di folder src/components/. Tidak ada dependency utility (mis. Tailwind) terdeteksi — styling dikelola secara tradisional melalui CSS yang di-import di entry main.tsx.

**Hosting & Domain**

- **Static hosting:** hasil build (dist/) dapat di-deploy ke Vercel, Netlify, GitHub Pages, atau static hosting lain yang mendukung SPA.
- **Server-side / Node:** ada server.ts di repo — jika aplikasi membutuhkan server Node (routing custom, API atau SSR ringan), gunakan platform seperti Render, Fly, Heroku, atau Azure App Service. Untuk domain kustom, atur DNS (A/CNAME) dan konfigurasi SSL di penyedia hosting.

**Performa**

- **Build & optimasi:** gunakan npm run build (Vite) untuk menghasilkan bundle teroptimasi. Vite melakukan code-splitting, tree-shaking, dan minifikasi.
- **Best practices yang disarankan:**
  - Kompresi aset (gzip / brotli) pada server hosting.
  - Cache static assets dengan header long-lived dan fingerprinting (file hashing).
  - Gunakan image yang dioptimasi di public/assets/ dan lazy-load gambar besar.
  - Analisa bundle dengan plugin Vite (rollup-plugin-visualizer) saat perlu.

**Analytics**

- **Integrasi rekomendasi:** tambahkan snippet Google Analytics / GA4 atau alternatif privacy-first seperti Plausible / Fathom.
- **Detil implementasi:** sisipkan script analytics di index.html atau gunakan hook React khusus untuk memicu pageview pada perubahan route (untuk SPA). Simpan kunci tracking sebagai env var saat build (mis. VITE_GA_ID).

**Aksesibilitas (Accessibility)**

- **Status & rekomendasi:** kode komponen React (Navbar, Hero, Quiz, dll.) harus menggunakan elemen HTML semantik, atribut ARIA bila perlu, dan memastikan fokus keyboard dapat diakses.
- **Langkah praktis:**
  - Gunakan semantic tags (nav, main, header, footer, button, form).
  - Pastikan semua interaktif dapat dioperasikan via keyboard (tab order, visible focus states).
  - Tambahkan alt text pada gambar di public/assets/.
  - Periksa kontras warna dengan alat seperti Lighthouse atau axe.
  - Jalankan audit accessibility (Lighthouse, axe-core) dan perbaiki temuan penting (mis. label input, ARIA roles, landmark regions).

**Menjalankan proyek (lokal)**
Jalankan perintah ini untuk mengembangkan dan membangun proyek:

```bash
npm install
npm run dev
npm run build
npm run preview
```

**File penting**

- Vite config: vite.config.ts
- Entry app: src/main.tsx, src/App.tsx
- Global styles: src/index.css
- Server (opsional): server.ts
- Aset statis: public/assets/

Jika Anda ingin, saya bisa:

- Menambahkan contoh snippet integrasi Google Analytics.
- Menyusun checklist aksesibilitas dan menjalankan audit otomatis.
