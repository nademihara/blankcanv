<script setup>
</script>

<template>
  <header class="h-20 border-b border-gray-200">
    <nav class="mx-auto flex h-full max-w-6xl items-center justify-between px-4">
      <div class="flex items-center gap-2">
        <a href="https://www.instagram.com/wip_pas/" class="text-xl font-bold">
          <img src="/assets/icons/wiplogo.png" alt="Logo" class="h-10 w-auto">
        </a>
      </div>

      <ul class="flex gap-6 text-sm font-medium">
        <li>
          <RouterLink to="/" class="hover:text-blue-600">Home</RouterLink>
        </li>
        <li>
          <RouterLink to="/tentang" class="hover:text-blue-600">Tentang</RouterLink>
        </li>
        <li>
          <RouterLink to="/bidang" class="hover:text-blue-600">Bidang</RouterLink>
        </li>
        <li>
          <RouterLink to="/project" class="hover:text-blue-600">Project</RouterLink>
        </li>
        <li>
          <RouterLink to="/galeri" class="hover:text-blue-600">Galeri</RouterLink>
        </li>
        <li>
          <RouterLink to="/kontak" class="hover:text-blue-600">Kontak</RouterLink>
        </li>
      </ul>
    </nav>
  </header>
</template>