
<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";

import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";

const route = useRoute();

const isAdminPage = computed(() => {
  return route.path.startsWith("/admin");
});

const showPublicLayout = computed(() => {
  return !isAdminPage.value;
});
</script>

<template>
  <div class="min-h-screen w-full overflow-x-hidden bg-gray-950 text-white">

    <!-- PUBLIC NAVBAR -->
    <Navbar v-if="showPublicLayout" />

    <!-- PUBLIC NAVBAR SPACING -->
    <div
      v-if="showPublicLayout"
      class="h-20 w-full"
      aria-hidden="true"
    ></div>

    <!-- PAGE -->
    <main class="w-full">
      <router-view />
    </main>

    <!-- PUBLIC FOOTER -->
    <Footer v-if="showPublicLayout" />

  </div>
</template>
