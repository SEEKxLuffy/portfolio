```vue
<script setup lang="ts">
interface Project {
  id: number;
  title: string;
  description: string;
  tech: string;
  github: string;
  live: string;
}

const props = defineProps<{
  project: Project;
  index?: number;
}>();

const getTechnologies = (tech: string | null | undefined) => {
  if (!tech) return [];

  return tech
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
};
</script>

<template>
  <article
    class="group flex min-w-0 flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-slate-900/70 transition duration-300 hover:-translate-y-1 hover:border-blue-500/40 hover:bg-slate-900"
  >
    <!-- PROJECT VISUAL -->
    <div
      class="relative flex h-48 items-center justify-between overflow-hidden border-b border-white/[0.06] bg-gradient-to-br from-blue-950/80 via-slate-900 to-slate-950 px-7"
    >
      <!-- Glow -->
      <div
        class="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-blue-500/10 blur-3xl transition duration-500 group-hover:bg-blue-500/20"
      ></div>

      <!-- Project Number -->
      <span
        class="relative text-5xl font-bold tracking-tight text-blue-400/60 transition duration-300 group-hover:text-blue-400"
      >
        {{ String((props.index ?? 0) + 1).padStart(2, "0") }}
      </span>

      <!-- Code Icon -->
      <div
        class="relative flex h-12 w-12 items-center justify-center rounded-xl border border-slate-700/80 bg-slate-950/70 text-blue-400 transition duration-300 group-hover:border-blue-500/50 group-hover:bg-blue-500/10"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.7"
          class="h-6 w-6"
          aria-hidden="true"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m8.25 8.25-3.5 3.75 3.5 3.75M15.75 8.25l3.5 3.75-3.5 3.75M14.25 5.25l-4.5 13.5"
          />
        </svg>
      </div>

      <!-- Label -->
      <span
        class="absolute bottom-5 right-7 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500"
      >
        Project
      </span>
    </div>

    <!-- CONTENT -->
    <div class="flex flex-1 flex-col p-6 sm:p-7">
      <!-- Title -->
      <h3
        class="break-words text-xl font-bold leading-snug text-white transition duration-300 group-hover:text-blue-400 sm:text-2xl"
      >
        {{ project.title }}
      </h3>

      <!-- Description -->
      <p
        v-if="project.description"
        class="mt-4 break-words text-sm leading-7 text-slate-400 sm:text-base"
      >
        {{ project.description }}
      </p>

      <!-- Technologies -->
      <div
        v-if="getTechnologies(project.tech).length"
        class="mt-6"
      >
        <p
          class="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500"
        >
          Built with
        </p>

        <div class="flex flex-wrap gap-2">
          <span
            v-for="technology in getTechnologies(project.tech)"
            :key="technology"
            class="max-w-full break-words rounded-md border border-slate-700/70 bg-slate-800/70 px-3 py-1.5 text-xs font-medium text-slate-300"
          >
            {{ technology }}
          </span>
        </div>
      </div>

      <!-- LINKS -->
      <div class="mt-auto flex flex-wrap gap-3 pt-8">
        <a
          v-if="project.github"
          :href="project.github"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-slate-700 px-3 py-3 text-sm font-semibold text-slate-200 transition duration-200 hover:border-blue-500/60 hover:text-blue-400"
        >
          GitHub
          <span aria-hidden="true">↗</span>
        </a>

        <a
          v-if="project.live"
          :href="project.live"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-blue-600 px-3 py-3 text-sm font-semibold text-white transition duration-200 hover:bg-blue-500"
        >
          Live Demo
          <span aria-hidden="true">↗</span>
        </a>

        <p
          v-if="!project.github && !project.live"
          class="w-full rounded-lg border border-slate-800 px-3 py-3 text-center text-sm text-slate-500"
        >
          Links coming soon
        </p>
      </div>
    </div>
  </article>
</template>
```