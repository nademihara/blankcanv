<script setup>
</script>

<template>
  <div id="app" class="flex flex-col min-h-screen">
    <AppHeader />
    <main class="flex-grow bg-white">
      <router-view />
    </main>
    <AppFooter />
  </div>
</template>