<script setup lang="ts">
interface Skill {
  id: number;
  name: string;
  category: string;
  level: string;
}

defineProps<{
  skill: Skill;
}>();
</script>

<template>
  <div
    class="group rounded-xl border border-slate-800 bg-slate-900/70 p-6 transition duration-300 hover:-translate-y-1 hover:border-cyan-400/50 hover:bg-slate-900"
  >
    <div class="flex items-start justify-between gap-4">
      <div>
        <h3
          class="text-lg font-semibold text-white transition group-hover:text-cyan-400"
        >
          {{ skill.name }}
        </h3>

        <p class="mt-2 text-sm text-slate-500">
          {{ skill.category }}
        </p>
      </div>

      <span
        class="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs text-cyan-400"
      >
        {{ skill.level }}
      </span>
    </div>

    <div class="mt-5 h-1.5 overflow-hidden rounded-full bg-slate-800">
      <div
        class="h-full rounded-full bg-cyan-400 transition-all duration-700"
        :style="{
          width:
            skill.level === 'Expert'
              ? '95%'
              : skill.level === 'Advanced'
              ? '85%'
              : skill.level === 'Intermediate'
              ? '70%'
              : '50%',
        }"
      ></div>
    </div>
  </div>
</template>