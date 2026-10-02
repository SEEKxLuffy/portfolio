<script setup lang="ts">
interface Education {
  id: number;
  institution: string;
  degree: string;
  field: string;
  start_year: string;
  end_year: string;
  description: string;
}

defineProps<{
  education: Education;
}>();
</script>

<template>
  <div
    class="rounded-xl border border-slate-800 bg-slate-900/60 p-6 transition duration-300 hover:-translate-y-1 hover:border-cyan-400/40"
  >
    <div
      class="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-cyan-400/10 text-xl text-cyan-400"
    >
      🎓
    </div>

    <h3 class="text-xl font-bold text-white">
      {{ education.degree }}
    </h3>

    <p class="mt-2 font-medium text-cyan-400">
      {{ education.field }}
    </p>

    <p class="mt-3 text-slate-300">
      {{ education.institution }}
    </p>

    <p class="mt-2 text-sm text-slate-500">
      {{ education.start_year }}
      -
      {{ education.end_year || "Present" }}
    </p>

    <p
      v-if="education.description"
      class="mt-4 leading-6 text-slate-400"
    >
      {{ education.description }}
    </p>
  </div>
</template>