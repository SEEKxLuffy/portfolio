```vue
<script setup lang="ts">
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import AdminSidebar from "../components/AdminSidebar.vue";

const route = useRoute();
const isSidebarOpen = ref(false);

watch(
  () => route.fullPath,
  () => {
    isSidebarOpen.value = false;
  }
);
</script>

<template>
  <div class="min-h-screen w-full bg-gray-950 text-white">
    <!-- Mobile Header -->
    <header
      class="sticky top-0 z-40 flex h-16 items-center gap-4 border-b border-gray-800 bg-gray-900 px-4 md:hidden"
    >
      <button
        type="button"
        aria-label="Toggle navigation"
        :aria-expanded="isSidebarOpen"
        class="rounded-lg p-2 hover:bg-gray-800"
        @click="isSidebarOpen = !isSidebarOpen"
      >
        <svg
          v-if="!isSidebarOpen"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          class="h-6 w-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>

        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          class="h-6 w-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m6 6 12 12M18 6 6 18"
          />
        </svg>
      </button>

      <span class="text-lg font-bold">
        Manish<span class="text-blue-500">.</span>
      </span>

      <span class="ml-auto text-xs text-gray-400">Admin Panel</span>
    </header>

    <!-- Mobile Backdrop -->
    <button
      v-if="isSidebarOpen"
      type="button"
      aria-label="Close navigation"
      class="fixed inset-0 z-40 bg-black/60 md:hidden"
      @click="isSidebarOpen = false"
    />

    <!-- Sidebar -->
    <AdminSidebar
      :mobile-open="isSidebarOpen"
      @close="isSidebarOpen = false"
    />

    <!-- Main Content -->
    <main
      class="min-h-[calc(100vh-4rem)] min-w-0 px-4 py-5 sm:px-6 md:ml-64 md:min-h-screen md:px-8 md:py-8"
    >
      <router-view />
    </main>
  </div>
</template>
```