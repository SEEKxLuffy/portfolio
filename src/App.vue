```vue
<script setup lang="ts">
import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";
</script>

<template>
  <div class="min-h-screen w-full overflow-x-hidden bg-gray-950 text-white">
    <Navbar />

    <!-- Keeps page content below the fixed navbar -->
    <div class="h-20 w-full" aria-hidden="true"></div>

    <main class="w-full">
      <router-view />
    </main>

    <Footer />
  </div>
</template>
```