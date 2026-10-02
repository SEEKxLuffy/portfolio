```vue
<script setup lang="ts">
import { ref, onMounted } from "vue";
import ProjectCard from "../components/ProjectCard.vue";

interface Project {
  id: number;
  title: string;
  description: string;
  tech: string;
  github: string;
  live: string;
}

const API_URL = "http://localhost:3000";

const projects = ref<Project[]>([]);
const loading = ref(true);
const errorMessage = ref("");

const fetchProjects = async () => {
  loading.value = true;
  errorMessage.value = "";

  try {
    const response = await fetch(`${API_URL}/api/projects`);

    if (!response.ok) {
      throw new Error("Failed to fetch projects.");
    }

    const data = await response.json();

    projects.value = Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Error fetching projects:", error);

    errorMessage.value =
      "Unable to load projects. Please try again.";
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchProjects();
});
</script>

<template>
  <main class="min-h-screen bg-slate-950 text-white">

    <!-- ================================= -->
    <!-- HERO -->
    <!-- ================================= -->

    <section class="relative overflow-hidden">

      <!-- Background Glow -->
      <div
        class="pointer-events-none absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-blue-600/10 blur-3xl"
      ></div>

      <div
        class="pointer-events-none absolute right-0 top-72 h-72 w-72 rounded-full bg-blue-500/5 blur-3xl"
      ></div>

      <div
        class="relative mx-auto max-w-6xl px-6 pb-20 pt-32 sm:px-8 sm:pt-36 lg:px-10 lg:pb-24"
      >

        <!-- Eyebrow -->
        <div class="flex items-center gap-3">
          <span class="h-px w-8 bg-blue-500"></span>

          <p
            class="text-xs font-semibold uppercase tracking-[0.25em] text-blue-400"
          >
            Selected Work
          </p>
        </div>

        <!-- Heading -->
        <div
          class="mt-6 flex flex-col gap-8 md:flex-row md:items-end md:justify-between"
        >

          <div>
            <h1
              class="max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
            >
              Projects<span class="text-blue-500">.</span>
            </h1>

            <p
              class="mt-6 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg"
            >
              A collection of projects I've built while learning,
              experimenting, and developing my skills as a frontend
              developer.
            </p>
          </div>

          <!-- Project Count -->
          <div
            v-if="!loading && !errorMessage"
            class="flex shrink-0 items-center gap-3 text-sm text-slate-500"
          >
            <span
              class="flex h-10 min-w-10 items-center justify-center rounded-lg border border-white/[0.08] bg-slate-900 px-3 font-semibold text-slate-300"
            >
              {{ projects.length }}
            </span>

            <span>
              {{ projects.length === 1 ? "Project" : "Projects" }}
            </span>
          </div>

        </div>
      </div>
    </section>


    <!-- ================================= -->
    <!-- PROJECTS SECTION -->
    <!-- ================================= -->

    <section
      class="border-t border-white/[0.06]"
    >

      <div
        class="mx-auto max-w-6xl px-6 py-16 sm:px-8 sm:py-20 lg:px-10"
      >

        <!-- SECTION INTRO -->
        <div class="mb-10">

          <p
            class="text-sm font-medium text-slate-500"
          >
            What I've been building
          </p>

          <h2
            class="mt-2 text-2xl font-bold tracking-tight sm:text-3xl"
          >
            Recent Projects
          </h2>

        </div>


        <!-- ================================= -->
        <!-- LOADING -->
        <!-- ================================= -->

        <div
          v-if="loading"
          class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
        >

          <div
            v-for="item in 3"
            :key="item"
            class="overflow-hidden rounded-2xl border border-white/[0.08] bg-slate-900/70"
          >

            <!-- Skeleton Header -->
            <div
              class="h-48 animate-pulse bg-slate-800/70"
            ></div>

            <!-- Skeleton Content -->
            <div class="p-6">

              <div
                class="h-6 w-2/3 animate-pulse rounded bg-slate-800"
              ></div>

              <div
                class="mt-5 h-4 animate-pulse rounded bg-slate-800"
              ></div>

              <div
                class="mt-2 h-4 w-4/5 animate-pulse rounded bg-slate-800"
              ></div>

              <div
                class="mt-6 flex gap-2"
              >
                <div
                  class="h-7 w-16 animate-pulse rounded bg-slate-800"
                ></div>

                <div
                  class="h-7 w-20 animate-pulse rounded bg-slate-800"
                ></div>
              </div>

              <div
                class="mt-8 h-11 animate-pulse rounded-lg bg-slate-800"
              ></div>

            </div>
          </div>

        </div>


        <!-- ================================= -->
        <!-- ERROR -->
        <!-- ================================= -->

        <div
          v-else-if="errorMessage"
          class="rounded-2xl border border-red-900/50 bg-red-950/20 px-6 py-16 text-center"
        >

          <div
            class="mx-auto flex h-14 w-14 items-center justify-center rounded-xl border border-red-900/50 bg-red-950/30 text-red-400"
          >
            !
          </div>

          <h2
            class="mt-5 text-xl font-semibold"
          >
            Something went wrong
          </h2>

          <p
            class="mx-auto mt-3 max-w-md text-sm leading-7 text-slate-400"
          >
            {{ errorMessage }}
          </p>

          <button
            type="button"
            @click="fetchProjects"
            class="mt-6 rounded-lg bg-slate-800 px-5 py-3 text-sm font-semibold transition hover:bg-slate-700"
          >
            Try Again
          </button>

        </div>


        <!-- ================================= -->
        <!-- PROJECT GRID -->
        <!-- ================================= -->

        <div
          v-else-if="projects.length"
          class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8"
        >

          <ProjectCard
            v-for="(project, index) in projects"
            :key="project.id"
            :project="project"
            :index="index"
          />

        </div>


        <!-- ================================= -->
        <!-- EMPTY STATE -->
        <!-- ================================= -->

        <div
          v-else
          class="rounded-2xl border border-dashed border-white/[0.08] px-6 py-20 text-center"
        >

          <div
            class="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-white/[0.08] bg-slate-900 text-2xl text-blue-400"
          >
            &lt;/&gt;
          </div>

          <h2
            class="mt-6 text-2xl font-bold"
          >
            Projects are on the way
          </h2>

          <p
            class="mx-auto mt-3 max-w-md text-sm leading-7 text-slate-400 sm:text-base"
          >
            I'm currently working on new projects.
            Check back soon to see what I've been building.
          </p>

        </div>

      </div>
    </section>


    <!-- ================================= -->
    <!-- CTA -->
    <!-- ================================= -->

    <section
      class="border-t border-white/[0.06] bg-slate-900/50"
    >

      <div
        class="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-16 sm:px-8 sm:py-20 md:flex-row md:items-center md:justify-between lg:px-10"
      >

        <div>

          <div class="flex items-center gap-3">

            <span
              class="h-px w-7 bg-blue-500"
            ></span>

            <p
              class="text-xs font-semibold uppercase tracking-[0.25em] text-blue-400"
            >
              Have an idea?
            </p>

          </div>

          <h2
            class="mt-4 max-w-xl text-2xl font-bold tracking-tight sm:text-3xl"
          >
            Let's build something meaningful together.
          </h2>

          <p
            class="mt-3 max-w-xl text-sm leading-7 text-slate-400 sm:text-base"
          >
            I'm always interested in building useful,
            well-designed web experiences.
          </p>

        </div>


        <router-link
          to="/contact"
          class="inline-flex w-fit shrink-0 items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white transition duration-200 hover:bg-blue-500"
        >
          Contact Me

          <span
            aria-hidden="true"
            class="text-base"
          >
            →
          </span>
        </router-link>

      </div>

    </section>

  </main>
</template>
```