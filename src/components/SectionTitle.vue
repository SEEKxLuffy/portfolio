<script setup lang="ts">
defineProps<{
  title: string;
  subtitle?: string;
}>();
</script>

<template>
  <div class="mb-14 text-center">
    <p
      class="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400"
    >
      {{ subtitle || "Portfolio" }}
    </p>

    <h2
      class="text-3xl font-bold text-white sm:text-4xl"
    >
      {{ title }}
    </h2>

    <div
      class="mx-auto mt-5 h-1 w-16 rounded-full bg-cyan-400"
    ></div>
  </div>
</template>