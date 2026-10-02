<script setup lang="ts">
interface Profile {
  name: string;
  job_title: string;
  bio: string;
  email: string;
  location: string;
  github: string;
  linkedin: string;
}

defineProps<{
  profile: Profile;
}>();

const scrollToSection = (id: string) => {
  const element = document.getElementById(id);

  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
    });
  }
};
</script>

<template>
  <section
    id="home"
    class="relative flex min-h-screen items-center overflow-hidden bg-slate-950 pt-20"
  >
    <!-- Background -->
    <div
      class="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(34,211,238,0.12),_transparent_35%)]"
    ></div>

    <div
      class="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_rgba(59,130,246,0.10),_transparent_35%)]"
    ></div>

    <div
      class="relative mx-auto grid max-w-7xl gap-14 px-6 py-20 lg:grid-cols-2 lg:items-center"
    >
      <!-- Left -->
      <div>
        <p
          class="mb-5 inline-flex rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-400"
        >
          Frontend Developer
        </p>

        <h1
          class="text-5xl font-black leading-tight text-white sm:text-6xl lg:text-7xl"
        >
          Hi, I'm
          <span class="block text-cyan-400">
            {{ profile.name || "Manish Tamang" }}
          </span>
        </h1>

        <h2 class="mt-5 text-2xl font-semibold text-slate-300 sm:text-3xl">
          {{ profile.job_title || "Frontend Developer" }}
        </h2>

        <p
          class="mt-6 max-w-xl text-lg leading-8 text-slate-400"
        >
          {{ profile.bio }}
        </p>

        <div class="mt-9 flex flex-wrap gap-4">
          <button
            @click="scrollToSection('projects')"
            class="rounded-lg bg-cyan-400 px-6 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300"
          >
            View My Work
          </button>

          <button
            @click="scrollToSection('contact')"
            class="rounded-lg border border-slate-700 px-6 py-3 font-semibold text-white transition hover:border-cyan-400 hover:text-cyan-400"
          >
            Contact Me
          </button>
        </div>

        <div class="mt-10 flex gap-6">
          <a
            v-if="profile.github"
            :href="profile.github"
            target="_blank"
            rel="noopener noreferrer"
            class="text-slate-400 transition hover:text-cyan-400"
          >
            GitHub ↗
          </a>

          <a
            v-if="profile.linkedin"
            :href="profile.linkedin"
            target="_blank"
            rel="noopener noreferrer"
            class="text-slate-400 transition hover:text-cyan-400"
          >
            LinkedIn ↗
          </a>
        </div>
      </div>

      <!-- Right -->
      <div class="flex justify-center lg:justify-end">
        <div class="relative">
          <div
            class="absolute -inset-6 rounded-full bg-cyan-400/10 blur-3xl"
          ></div>

          <div
            class="relative flex h-72 w-72 items-center justify-center rounded-full border border-cyan-400/30 bg-slate-900 shadow-2xl shadow-cyan-500/10 sm:h-96 sm:w-96"
          >
            <div
              class="flex h-56 w-56 items-center justify-center rounded-full border border-slate-700 bg-slate-950 sm:h-72 sm:w-72"
            >
              <span class="text-7xl font-black text-cyan-400 sm:text-8xl">
                &lt;/&gt;
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>