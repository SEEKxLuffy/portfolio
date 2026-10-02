
<script setup lang="ts">
import AdminSidebar from "../components/AdminSidebar.vue";
</script>

<template>
  <div class="min-h-screen bg-gray-950 text-white">
    <!-- SIDEBAR -->
    <AdminSidebar />

    <!-- CONTENT -->
    <main class="min-h-screen pl-64">
      <router-view />
    </main>
  </div>
</template>