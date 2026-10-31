<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'

// Header "island": kalau user scroll ke bawah, header melayang jadi pill kecil,
// kalau scroll ke atas balik lagi. Logikanya sama persis dengan src/index.js lama
// (di-coalesce per frame pakai rAF biar nggak nge-layout tiap event scroll).
const headerEl = ref(null)

let headerIsland = false
let previousScrollY = 0
let accumulatedScrollDelta = 0
let scrollFramePending = false

function setHeaderIsland(shouldFloat) {
  if (headerIsland === shouldFloat) return
  headerIsland = shouldFloat
  headerEl.value?.classList.toggle('island', shouldFloat)
}

function updateHeaderFromScroll() {
  scrollFramePending = false

  const currentScrollY = window.scrollY
  const scrollDelta = currentScrollY - previousScrollY
  previousScrollY = currentScrollY

  if (currentScrollY <= 24) {
    accumulatedScrollDelta = 0
    setHeaderIsland(false)
    return
  }

  if (Math.sign(scrollDelta) !== Math.sign(accumulatedScrollDelta)) {
    accumulatedScrollDelta = scrollDelta
  } else {
    accumulatedScrollDelta += scrollDelta
  }

  if (accumulatedScrollDelta >= 12) {
    setHeaderIsland(true)
    accumulatedScrollDelta = 0
  } else if (accumulatedScrollDelta <= -12) {
    setHeaderIsland(false)
    accumulatedScrollDelta = 0
  }
}

function onScroll() {
  if (scrollFramePending) return
  scrollFramePending = true
  requestAnimationFrame(updateHeaderFromScroll)
}

onMounted(() => {
  previousScrollY = window.scrollY
  window.addEventListener('scroll', onScroll, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<template>
  <header ref="headerEl" class="site-header border-b border-gray-200">
    <!--NAVBAR-->
    <nav class="site-nav mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
      <!--LOGO-->
      <div class="flex items-center gap-2">
        <a href="https://www.instagram.com/wip_pas/" class="text-xl font-bold">
          <img
            src="../../assets/icons/wiplogo.webp"
            alt="Logo"
            width="320"
            height="180"
            decoding="async"
            class="h-10 w-auto"
          >
        </a>
      </div>

      <!--LIST/PILIHAN NAVBAR-->
      <ul class="flex gap-6 text-sm font-medium">
        <li><RouterLink to="/" class="hover:text-blue-600">Home</RouterLink></li>
        <li><RouterLink to="/bidang" class="hover:text-blue-600">Bidang</RouterLink></li>
        <li><RouterLink to="/project" class="hover:text-blue-600">Project</RouterLink></li>
      </ul>
    </nav>
  </header>
</template>
