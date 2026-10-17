import { stat } from "node:fs/promises";
import sharp from "sharp";

// Ukuran diset sesuai pemakaian di halaman:
//  - logo : tampil ~71x40px            -> 320px lebar (tetap tajem di retina)
//  - foto : tampil ~206px di kartu,
//           maks 720px di lightbox     -> 1280px lebar
const targets = [
  { input: "assets/icons/wiplogo.png", output: "assets/icons/wiplogo.webp", width: 320, quality: 90 },
  { input: "assets/images/wipngajar0.jpeg", output: "assets/images/wipngajar0.webp", width: 1280, quality: 80 },
];

const kb = (bytes) => `${(bytes / 1024).toFixed(1)} KB`;

for (const t of targets) {
  const before = await stat(t.input).catch(() => null);
  if (!before) {
    console.log(`skip ${t.input} (file asli nggak ada, hasil convert tetap dipakai)`);
    continue;
  }
  await sharp(t.input)
    .resize({ width: t.width, withoutEnlargement: true })
    .webp({ quality: t.quality, effort: 6 })
    .toFile(t.output);
  const meta = await sharp(t.output).metadata();
  const after = await stat(t.output);
  console.log(
    `${t.input}: ${kb(before.size)} -> ${t.output} ` +
      `(${meta.width}x${meta.height}, ${kb(after.size)})`
  );
}
