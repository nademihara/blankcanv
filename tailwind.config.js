/** @type {import('tailwindcss').Config} */
module.exports = {
  // File yang di-scan buat nyari utility class yang kepakai.
  // Kalau nambah class Tailwind baru di file ini, pastiin masuk daftar sini.
  content: [
    "./*.html",
    "./layout/*.html",
    "./src/**/*.{js,html}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Dipakai sama class `font-segoe` di index.html
        segoe: ['"Segoe UI"', "system-ui", "-apple-system", "sans-serif"],
      },
    },
  },
  plugins: [],
};
