# blankcanv — WIP on utility!

Versi Vue 3 + Vite. Ada di branch `vue-m`
(branch `testing` & `main` masih versi HTML/CSS/JS murni).

## Cara jalanin

```bash
bun install
bun run dev      # dev server -> http://localhost:5173
bun run build    # build production -> dist/
bun run preview  # preview hasil build -> http://localhost:4173
```

Lewat Docker:

```bash
docker compose up --build   # -> http://localhost:8080
```

## Struktur

| File | Isi |
| --- | --- |
| `index.html` | entry point Vite |
| `src/main.js` | mount Vue + urutan import CSS |
| `src/input.css` | directive Tailwind (`@tailwind base/components/utilities`) |
| `src/style.css` | style custom, di-port 1:1 dari branch `testing` |
| `src/App.vue` | rangka halaman: header + `<RouterView/>` + footer |
| `src/components/AppHeader.vue` | navbar + efek header "island" pas scroll |
| `src/views/HomeView.vue` | halaman utama: folder album + photo viewer |
| `src/router.js` | daftar route |

## Catatan

- UI/UX dipindahin dari branch `testing` (HTML/CSS/JS murni) dan dijaga sama
  persis: layout portfolio, folder album interaktif, photo viewer (`<dialog>`),
  animasi ikon melayang, sama header yang ngambek jadi pill pas scroll.
- Urutan import CSS di `src/main.js` penting: Tailwind dulu, `style.css`
  sesudahnya, biar style custom tetap menang kalau ada bentrok.
- Nambah file yang pakai class Tailwind baru? Masukin ke `content` di
  `tailwind.config.js` biar class-nya ikut ke-generate.
- `about.html` & `contact.html` di `testing` masih kosong (0 byte), jadi route
  `/bidang` dan `/project` masih placeholder.
