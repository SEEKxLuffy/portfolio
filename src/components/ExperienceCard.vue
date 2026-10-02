<script setup lang="ts">
interface Experience {
  id: number;
  company: string;
  position: string;
  start_date: string;
  end_date: string;
  description: string;
}

defineProps<{
  experience: Experience;
}>();
</script>

<template>
  <div class="relative pl-8">
    <!-- Timeline -->
    <div
      class="absolute left-0 top-1 h-4 w-4 rounded-full border-4 border-slate-950 bg-cyan-400"
    ></div>

    <div
      class="absolute left-[7px] top-5 h-full w-px bg-slate-800"
    ></div>

    <div
      class="rounded-xl border border-slate-800 bg-slate-900/60 p-6 transition hover:border-cyan-400/40"
    >
      <div
        class="flex flex-col justify-between gap-2 sm:flex-row"
      >
        <div>
          <h3 class="text-xl font-bold text-white">
            {{ experience.position }}
          </h3>

          <p class="mt-1 font-medium text-cyan-400">
            {{ experience.company }}
          </p>
        </div>

        <p class="text-sm text-slate-500">
          {{ experience.start_date }}
          -
          {{ experience.end_date || "Present" }}
        </p>
      </div>

      <p
        class="mt-5 leading-7 text-slate-400"
      >
        {{ experience.description }}
      </p>
    </div>
  </div>
</template>