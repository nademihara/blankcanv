README test

## Development

Project ini pakai **Tailwind CSS yang di-build lokal** (bukan CDN).

```bash
bun install        # sekali aja
bun run build      # compile src/input.css -> src/tailwind.css (commit hasilnya!)
bun run watch      # rebuild otomatis pas lagi ngedit HTML/CSS
bun scripts/serve.mjs   # preview lokal di http://localhost:4173
```

### Alur kerja

- `src/input.css` → cuma berisi `@tailwind base/components/utilities`. **Jangan** taruh style custom di sini.
- `src/style.css` → style custom. File ini di-link **setelah** `src/tailwind.css`, jadi tetap menang kalau ada selector yang bentrok. Isinya dibiarkan apa adanya.
- `tailwind.config.js` → `content` nunjuk ke file HTML yang di-scan. Kalau bikin halaman HTML baru, masukin ke daftar itu.

### Penting

Kalau nambah class Tailwind baru di HTML (mis. `mt-4`, `md:grid`), **harus `bun run build` ulang** — kalau nggak, class-nya nggak akan ada di `src/tailwind.css` dan nggak ke-render.

### Gambar

```bash
bun run images     # convert assets PNG/JPEG -> WebP (scripts/convert-images.mjs)
```
