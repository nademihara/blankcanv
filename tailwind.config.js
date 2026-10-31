/** @type {import('tailwindcss').Config} */
export default {
  // File yang di-scan buat nyari utility class yang kepakai.
  // Kalau nambah class Tailwind baru, pastiin file-nya masuk daftar sini.
  content: [
    "./*.html",
    "./layout/*.html",
    "./src/**/*.{js,vue}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Dipakai sama class `font-segoe`
        segoe: ['"Segoe UI"', "system-ui", "-apple-system", "sans-serif"],
      },
    },
  },
  plugins: [],
}
