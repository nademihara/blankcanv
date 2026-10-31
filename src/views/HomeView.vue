<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'

// Asset di-import biar ikut ke-bundle sama Vite.
// Kalau cuma nulis path string di :src, file-nya nggak masuk dist.
import fotoNgajar from '../../assets/images/wipngajar0.webp'
import fotoJadul from '../../assets/images/wipp1.webp'

// Foto-foto yang ada di dalam folder (dulu data-nya nempel di atribut data-* di index.html)
const photos = [
  {
    cls: 'paper-1',
    src: fotoNgajar,
    width: 1280,
    height: 960,
    alt: 'WIP ngajar',
    title: 'Belajar Bersama',
    description: 'WIP ngajar coyy',
  },
  {
    cls: 'paper-3',
    src: fotoJadul,
    width: 1280,
    height: 960,
    alt: 'Tahun 60an',
    title: 'Berbagi Ilmu',
    description: 'Gak tau dari jaman apa',
  },
]

const folderEl = ref(null)
const folderBackEl = ref(null)
const folderFrontEl = ref(null)
const photoStackEl = ref(null)
const viewerEl = ref(null)

const albumOpen = ref(false)
const activeIndex = ref(0)

const activePhoto = computed(() => photos[activeIndex.value])

function setAlbumOpen(isOpen) {
  albumOpen.value = isOpen
}

function toggleAlbum() {
  setAlbumOpen(!albumOpen.value)
}

// Klik folder-nya sendiri (atau bagian belakangnya) juga ikut buka/tutup album,
// tapi klik tombol depan nggak boleh kehitung dua kali -> makanya dicek targetnya.
function onFolderClick(event) {
  if (event.target === folderEl.value || event.target === folderBackEl.value) {
    toggleAlbum()
  }
}

function showPhoto(index) {
  activeIndex.value = (index + photos.length) % photos.length
}

function openViewer(index) {
  showPhoto(index)
  viewerEl.value?.showModal()
}

function closeViewer() {
  viewerEl.value?.close()
}

function onViewerBackdrop(event) {
  if (event.target === viewerEl.value) closeViewer()
}

// Escape ditahan di sini biar nggak bocor ke document handler:
// yang nutup album cuma kalau photo viewer-nya emang lagi nggak buka.
function onViewerKeydown(event) {
  if (event.key === 'Escape') event.stopPropagation()
}

// Balikin fokus ke foto yang tadi diklik pas viewer ditutup (kayak aslinya).
function onViewerClose() {
  const buttons = photoStackEl.value?.querySelectorAll('.paper')
  buttons?.[activeIndex.value]?.focus()
}

// `inert` diikat lewat DOM langsung: kalau di-bind sebagai attribute,
// nilai false bisa malah jadi inert="false" yang tetap kebaca true.
watch(albumOpen, (isOpen) => {
  photoStackEl.value?.toggleAttribute('inert', !isOpen)
})

function onDocumentKeydown(event) {
  if (event.key === 'Escape' && !viewerEl.value?.open && albumOpen.value) {
    setAlbumOpen(false)
    nextTick(() => folderFrontEl.value?.focus())
  }
}

onMounted(() => {
  photoStackEl.value?.toggleAttribute('inert', true)
  document.addEventListener('keydown', onDocumentKeydown)
})

onBeforeUnmount(() => {
  document.removeEventListener('keydown', onDocumentKeydown)
})
</script>

<template>
  <section class="portfolio-container">
    <!-- Judul yang guedeeee -->
    <h1 class="main-title">WIP: on Journeyy!!!</h1>

    <div class="content-wrapper">
      <div class="left-section">
        <!-- Kartu yang ada di sebelah kirii -->
        <div class="badge-card rotated-left">
          <span class="edition-text">open to contribute!</span>
          <div class="badge-icons" aria-hidden="true">
            <span></span>
            <span>✦</span>
          </div>
        </div>

        <!-- Teks yang ada di sebelah krii -->
        <p class="tagline">
          Mandiri dan<br>
          profesional<br>
          berakhlak mulia
        </p>
      </div>

      <!-- Masuk ke bagian Folder interaktifnyaa -->
      <div class="folder-container">
        <div class="album" id="wip-album">
          <div class="folder-stage">
            <div
              ref="folderEl"
              class="folder"
              id="wip-folder"
              :class="{ open: albumOpen }"
              @click="onFolderClick"
            >
              <div ref="folderBackEl" class="folder-back" aria-hidden="true"></div>

              <div
                ref="photoStackEl"
                class="paper-stack"
                id="wip-photo-stack"
                :aria-hidden="String(!albumOpen)"
              >
                <button
                  v-for="(photo, index) in photos"
                  :key="photo.src"
                  class="paper"
                  :class="photo.cls"
                  type="button"
                  @click="openViewer(index)"
                >
                  <img
                    :src="photo.src"
                    :width="photo.width"
                    :height="photo.height"
                    decoding="async"
                    :alt="photo.alt"
                  >
                </button>
              </div>

              <button
                ref="folderFrontEl"
                class="folder-front"
                type="button"
                :aria-expanded="String(albumOpen)"
                aria-controls="wip-photo-stack"
                :aria-label="albumOpen ? 'Tutup album foto' : 'Buka album foto'"
                @click.stop="toggleAlbum"
              >
                <span class="folder-label"></span>
              </button>
            </div>
          </div>

          <!-- VISI nya -->
          <section class="vision-card" aria-labelledby="vision-title">
            <h2 id="vision-title">Visi</h2>
            <p>
              Mencetak individu dan kelompok yang mandiri dan profesional di bidang informatika,
              memiliki jiwa leadership dan entrepreneurship, serta berorganisasi berlandaskan akhlak mulia.
            </p>
          </section>
        </div>
      </div>

      <!-- Teks di sebelah kanan uy,yang WIP: journeyy anjayyy -->
      <div class="right-section">
        <div class="profile-info">
          <h2>WIP:<br>Journey!!</h2>
          <p class="subtitle">WIP on Utility</p>
        </div>

        <!-- Panel di sebelah kanan coy -->
        <nav class="menu-card rotated-right" aria-label="Navigasi utama">
          <ul>
            <li>
              <span class="menu-icon"></span>
              <RouterLink to="/">Home</RouterLink>
              <span class="check-icon" aria-hidden="true">✓</span>
            </li>
            <li>
              <span class="menu-icon"></span>
              <RouterLink to="/bidang">Bidang</RouterLink>
            </li>
            <li>
              <span class="menu-icon"></span>
              <RouterLink to="/project">Project</RouterLink>
            </li>
          </ul>
        </nav>

        <RouterLink
          to="/bidang"
          class="inline-block rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500"
        >
          Hayu liat liat
        </RouterLink>
      </div>

      <!-- Ikon yang melayang di sekitar folder -->
      <img src="../../assets/icons/canva.png" alt="" class="float tl" aria-hidden="true">
      <img src="../../assets/icons/mads.png" alt="" class="float tr" aria-hidden="true">
      <img src="../../assets/icons/mkrt.png" alt="" class="float bl" aria-hidden="true">
      <img src="../../assets/icons/vsc.png" alt="" class="float br" aria-hidden="true">
    </div>
  </section>

  <!-- PHOTO VIEWER -->
  <dialog
    ref="viewerEl"
    class="photo-viewer"
    id="photo-viewer"
    aria-labelledby="viewer-title"
    @click="onViewerBackdrop"
    @keydown="onViewerKeydown"
    @close="onViewerClose"
  >
    <div class="viewer-header">
      <span>{{ activeIndex + 1 }} / {{ photos.length }}</span>
      <button class="viewer-close" type="button" aria-label="Tutup foto" @click="closeViewer">&times;</button>
    </div>

    <div class="viewer-image-wrap">
      <img :src="activePhoto.src" :alt="activePhoto.alt">
    </div>

    <div class="viewer-footer">
      <button class="viewer-nav" type="button" aria-label="Foto sebelumnya" @click="showPhoto(activeIndex - 1)">
        &#8592;
      </button>

      <div class="viewer-caption">
        <h2 id="viewer-title">{{ activePhoto.title }}</h2>
        <p id="viewer-description">{{ activePhoto.description }}</p>
      </div>

      <button class="viewer-nav" type="button" aria-label="Foto berikutnya" @click="showPhoto(activeIndex + 1)">
        &#8594;
      </button>
    </div>
  </dialog>
</template>
