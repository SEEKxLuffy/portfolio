<script setup lang="ts">
import { ref, computed, onMounted } from "vue";

interface Skill {
  id: number;
  name: string;
  category: string;
  level: string;
}

const skills = ref<Skill[]>([]);
const loading = ref(true);
const errorMessage = ref("");

const fetchSkills = async () => {
  loading.value = true;
  errorMessage.value = "";

  try {
    const response = await fetch(
      "http://localhost:3000/api/skills"
    );

    if (!response.ok) {
      throw new Error("Failed to fetch skills");
    }

    const data = await response.json();

    skills.value = Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Error fetching skills:", error);

    errorMessage.value =
      "Unable to load skills. Please try again.";
  } finally {
    loading.value = false;
  }
};

const groupedSkills = computed(() => {
  const groups: Record<string, Skill[]> = {};

  for (const skill of skills.value) {
    const category = skill.category?.trim() || "Other";

    if (!groups[category]) {
      groups[category] = [];
    }

    groups[category].push(skill);
  }

  return groups;
});

onMounted(() => {
  fetchSkills();
});
</script>

<template>
  <main class="min-h-screen bg-slate-950 text-white">

    <!-- HERO -->
    <section class="relative overflow-hidden">

      <div
        class="pointer-events-none absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-blue-600/10 blur-3xl"
      ></div>

      <div
        class="pointer-events-none absolute right-0 top-72 h-72 w-72 rounded-full bg-blue-500/5 blur-3xl"
      ></div>

      <div
        class="relative mx-auto max-w-6xl px-6 pb-20 pt-32 sm:px-8 sm:pt-36 lg:px-10 lg:pb-24"
      >

        <div class="flex items-center gap-3">
          <span class="h-px w-8 bg-blue-500"></span>

          <p
            class="text-xs font-semibold uppercase tracking-[0.25em] text-blue-400"
          >
            Skills & Technologies
          </p>
        </div>

        <div class="mt-6 max-w-3xl">

          <h1
            class="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
          >
            What I Work With<span class="text-blue-500">.</span>
          </h1>

          <p
            class="mt-6 text-base leading-8 text-slate-400 sm:text-lg"
          >
            Technologies and tools I use to build modern,
            responsive, and maintainable web applications.
          </p>

        </div>

      </div>
    </section>

    <!-- SKILLS -->
    <section class="border-t border-white/[0.06]">

      <div
        class="mx-auto max-w-6xl px-6 py-16 sm:px-8 sm:py-20 lg:px-10"
      >

        <!-- LOADING -->
        <div
          v-if="loading"
          class="grid grid-cols-1 gap-6 md:grid-cols-2"
        >

          <div
            v-for="item in 3"
            :key="item"
            class="animate-pulse rounded-2xl border border-white/[0.08] bg-slate-900/70 p-7"
          >

            <div
              class="h-5 w-32 rounded bg-slate-800"
            ></div>

            <div class="mt-6 grid grid-cols-2 gap-3">

              <div
                class="h-12 rounded-xl bg-slate-800"
              ></div>

              <div
                class="h-12 rounded-xl bg-slate-800"
              ></div>

              <div
                class="h-12 rounded-xl bg-slate-800"
              ></div>

              <div
                class="h-12 rounded-xl bg-slate-800"
              ></div>

            </div>

          </div>

        </div>

        <!-- ERROR -->
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
            @click="fetchSkills"
            class="mt-6 rounded-lg bg-slate-800 px-5 py-3 text-sm font-semibold transition hover:bg-slate-700"
          >
            Try Again
          </button>

        </div>

        <!-- SKILL GROUPS -->
        <div
          v-else-if="skills.length"
          class="grid grid-cols-1 gap-6 md:grid-cols-2"
        >

          <section
            v-for="(categorySkills, category) in groupedSkills"
            :key="category"
            class="group rounded-2xl border border-white/[0.08] bg-slate-900/60 p-6 transition duration-300 hover:border-blue-500/30 hover:bg-slate-900/80 sm:p-7"
          >

            <!-- CATEGORY HEADER -->
            <div
              class="flex items-center justify-between gap-4"
            >

              <div class="flex items-center gap-3">

                <span
                  class="h-2 w-2 rounded-full bg-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.6)]"
                ></span>

                <h2
                  class="text-sm font-semibold uppercase tracking-[0.18em] text-slate-300"
                >
                  {{ category }}
                </h2>

              </div>

              <span
                class="text-xs text-slate-600"
              >
                {{ categorySkills.length }}
                {{ categorySkills.length === 1 ? "skill" : "skills" }}
              </span>

            </div>

            <!-- SKILLS -->
            <div
              class="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2"
            >

              <div
                v-for="skill in categorySkills"
                :key="skill.id"
                class="group/skill flex min-h-12 items-center justify-between gap-3 rounded-xl border border-white/[0.06] bg-slate-950/60 px-4 py-3 transition duration-200 hover:border-blue-500/30 hover:bg-blue-500/[0.05]"
              >

                <span
                  class="min-w-0 break-words text-sm font-medium text-slate-200 transition group-hover/skill:text-white"
                >
                  {{ skill.name }}
                </span>

                <span
                  v-if="skill.level"
                  class="shrink-0 rounded-md border border-blue-500/20 bg-blue-500/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-blue-400"
                >
                  {{ skill.level }}
                </span>

              </div>

            </div>

          </section>

        </div>

        <!-- EMPTY -->
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
            Skills are being added
          </h2>

          <p
            class="mx-auto mt-3 max-w-md text-sm leading-7 text-slate-400"
          >
            I'm currently updating my skills and technologies.
            Check back soon.
          </p>

        </div>

      </div>
    </section>

    <!-- BOTTOM STATEMENT -->
    <section
      class="border-t border-white/[0.06] bg-slate-900/40"
    >

      <div
        class="mx-auto max-w-6xl px-6 py-16 sm:px-8 sm:py-20 lg:px-10"
      >

        <div class="max-w-2xl">

          <div class="flex items-center gap-3">

            <span
              class="h-px w-7 bg-blue-500"
            ></span>

            <p
              class="text-xs font-semibold uppercase tracking-[0.25em] text-blue-400"
            >
              Always Learning
            </p>

          </div>

          <h2
            class="mt-4 text-2xl font-bold tracking-tight sm:text-3xl"
          >
            Building skills through real projects.
          </h2>

          <p
            class="mt-4 text-sm leading-7 text-slate-400 sm:text-base"
          >
            I'm continuously improving my frontend development
            skills by building projects, exploring new technologies,
            and learning how different parts of the web work together.
          </p>

        </div>

      </div>

    </section>

  </main>
</template>