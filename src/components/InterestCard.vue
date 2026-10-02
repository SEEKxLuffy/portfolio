<script setup lang="ts">
interface Interest {
  id: number;
  name: string;
  description: string;
}

defineProps<{
  interest: Interest;
}>();
</script>

<template>
  <div
    class="group rounded-xl border border-slate-800 bg-slate-900/60 p-6 transition duration-300 hover:-translate-y-1 hover:border-cyan-400/40"
  >
    <div
      class="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-cyan-400/10 text-xl text-cyan-400"
    >
      ✦
    </div>

    <h3
      class="text-lg font-bold text-white transition group-hover:text-cyan-400"
    >
      {{ interest.name }}
    </h3>

    <p
      v-if="interest.description"
      class="mt-3 text-sm leading-6 text-slate-400"
    >
      {{ interest.description }}
    </p>
  </div>
</template>