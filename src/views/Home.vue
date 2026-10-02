<script setup lang="ts">
import { ref, onMounted, computed } from "vue";

interface Profile {
  id: number;
  name: string;
  job_title: string;
  bio: string;
  email: string;
  location: string;
  github: string;
  linkedin: string;
  image: string | null;
}

const API_URL = "http://localhost:3000";

const profile = ref<Profile | null>(null);

const profileImage = computed(() => {
  if (!profile.value?.image) {
    return null;
  }

  if (
    profile.value.image.startsWith("http://") ||
    profile.value.image.startsWith("https://")
  ) {
    return profile.value.image;
  }

  return `${API_URL}${profile.value.image}`;
});

const fetchProfile = async () => {
  try {
    const response = await fetch(`${API_URL}/api/profile`);

    if (!response.ok) {
      throw new Error("Failed to fetch profile");
    }

    const data = await response.json();

    if (data) {
      profile.value = data;
    }
  } catch (error) {
    console.error("Error fetching profile:", error);
  }
};

onMounted(fetchProfile);
</script>

<template>
  <div class="w-full min-w-0 overflow-x-hidden">

    <!-- ================================================= -->
    <!-- HERO -->
    <!-- ================================================= -->

    <section
      class="relative w-full overflow-hidden bg-slate-950"
    >
      <!-- BACKGROUND GLOW -->
      <div
        class="pointer-events-none absolute -right-40 top-20 h-96 w-96 rounded-full bg-blue-600/10 blur-3xl"
      ></div>

      <div
        class="pointer-events-none absolute -left-40 bottom-0 h-80 w-80 rounded-full bg-blue-500/[0.06] blur-3xl"
      ></div>

      <!-- HERO CONTAINER -->
      <div
        class="relative mx-auto flex min-h-[calc(100vh-84px)] w-full max-w-6xl items-center px-4 pb-16 pt-32 sm:px-6 sm:pb-20 sm:pt-36 lg:px-8 lg:pb-24 lg:pt-32"
      >
        <div
          class="grid w-full grid-cols-1 items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16"
        >

          <!-- ========================================= -->
          <!-- LEFT CONTENT -->
          <!-- ========================================= -->

          <div class="min-w-0">

            <!-- EYEBROW -->
            <div class="mb-5 flex items-center gap-3 sm:mb-6">
              <span class="h-px w-8 bg-blue-500"></span>

              <p
                class="text-xs font-semibold uppercase tracking-[0.28em] text-blue-400 sm:text-sm"
              >
                Hello, I'm
              </p>
            </div>

            <!-- NAME -->
            <h1
              class="max-w-3xl break-words text-5xl font-bold leading-[0.98] tracking-[-0.04em] text-white sm:text-6xl md:text-7xl lg:text-[76px]"
            >
              {{ profile?.name || "Manish Tamang" }}
            </h1>

            <!-- JOB TITLE -->
            <h2
              class="mt-5 text-xl font-medium tracking-tight text-slate-300 sm:mt-6 sm:text-2xl md:text-3xl"
            >
              {{ profile?.job_title || "Frontend Developer" }}
            </h2>

            <!-- BIO -->
            <p
              class="mt-5 max-w-xl text-sm leading-7 text-slate-400 sm:mt-6 sm:text-base sm:leading-8 lg:text-lg"
            >
              {{
                profile?.bio ||
                "I build modern, responsive and user-friendly web applications using modern frontend technologies."
              }}
            </p>

            <!-- TECHNOLOGIES -->
            <div
              class="mt-6 flex flex-wrap gap-2"
            >
              <span
                class="rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-xs font-medium text-slate-400"
              >
                Vue.js
              </span>

              <span
                class="rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-xs font-medium text-slate-400"
              >
                TypeScript
              </span>

              <span
                class="rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-xs font-medium text-slate-400"
              >
                JavaScript
              </span>

              <span
                class="rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-xs font-medium text-slate-400"
              >
                Tailwind CSS
              </span>
            </div>

            <!-- BUTTONS -->
            <div
              class="mt-8 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:flex-wrap"
            >
              <router-link
                to="/projects"
                class="inline-flex items-center justify-center rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/10 transition-all duration-200 hover:bg-blue-500 hover:shadow-blue-500/20 active:scale-[0.98] sm:px-7"
              >
                View My Work

                <span class="ml-2 text-base" aria-hidden="true">
                  →
                </span>
              </router-link>

              <router-link
                to="/contact"
                class="inline-flex items-center justify-center rounded-xl border border-white/[0.10] bg-white/[0.02] px-6 py-3.5 text-sm font-semibold text-slate-200 transition-all duration-200 hover:border-blue-500/50 hover:bg-white/[0.05] hover:text-white active:scale-[0.98] sm:px-7"
              >
                Contact Me

                <span class="ml-2 text-base" aria-hidden="true">
                  ↗
                </span>
              </router-link>
            </div>

            <!-- SOCIAL LINKS -->
            <div
              class="mt-7 flex items-center gap-6 sm:mt-8"
            >
              <a
                v-if="profile?.github"
                :href="profile.github"
                target="_blank"
                rel="noopener noreferrer"
                class="text-sm font-medium text-slate-500 transition-colors duration-200 hover:text-white"
              >
                GitHub
                <span class="ml-1">↗</span>
              </a>

              <a
                v-if="profile?.linkedin"
                :href="profile.linkedin"
                target="_blank"
                rel="noopener noreferrer"
                class="text-sm font-medium text-slate-500 transition-colors duration-200 hover:text-blue-400"
              >
                LinkedIn
                <span class="ml-1">↗</span>
              </a>
            </div>

          </div>

          <!-- ========================================= -->
          <!-- RIGHT IMAGE -->
          <!-- ========================================= -->

          <div
            class="flex min-w-0 justify-center lg:justify-end"
          >
            <div
              class="relative w-full max-w-[360px] sm:max-w-[400px] lg:max-w-[430px]"
            >

              <!-- IMAGE GLOW -->
              <div
                class="absolute -inset-5 rounded-[2rem] bg-blue-600/10 blur-3xl"
              ></div>

              <!-- DECORATIVE FRAME -->
              <div
                class="absolute -right-3 -top-3 h-full w-full rounded-[1.75rem] border border-blue-500/20"
              ></div>

              <!-- IMAGE -->
              <div
                class="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] border border-white/[0.10] bg-slate-900 shadow-2xl shadow-black/30"
              >
                <img
                  v-if="profileImage"
                  :src="profileImage"
                  :alt="profile?.name || 'Profile image'"
                  class="h-full w-full object-cover"
                />

                <!-- FALLBACK -->
                <div
                  v-else
                  class="flex h-full w-full items-center justify-center bg-slate-900"
                >
                  <span
                    class="text-8xl font-bold text-blue-500"
                  >
                    M
                  </span>
                </div>

                <!-- IMAGE OVERLAY -->
                <div
                  class="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-slate-950/60 to-transparent"
                ></div>
              </div>

              <!-- SMALL FLOATING LABEL -->
              <div
                class="absolute -bottom-4 left-4 rounded-xl border border-white/[0.08] bg-slate-950/90 px-4 py-3 shadow-xl shadow-black/30 backdrop-blur-xl sm:left-6"
              >
                <p
                  class="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500"
                >
                  Focus
                </p>

                <p
                  class="mt-1 text-sm font-medium text-white"
                >
                  Frontend Development
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>


    <!-- ================================================= -->
    <!-- INFO -->
    <!-- ================================================= -->

    <section
      class="w-full border-y border-white/[0.06] bg-slate-900/60"
    >
      <div
        class="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8"
      >

        <div
          class="grid grid-cols-1 divide-y divide-white/[0.06] md:grid-cols-3 md:divide-x md:divide-y-0"
        >

          <!-- LOCATION -->
          <div class="py-4 md:px-7 md:py-2 md:first:pl-0">
            <p
              class="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500"
            >
              Location
            </p>

            <p
              class="mt-2 break-words text-sm font-medium text-slate-200 sm:text-base"
            >
              {{ profile?.location || "Nepal" }}
            </p>
          </div>

          <!-- EMAIL -->
          <div class="py-4 md:px-7 md:py-2">
            <p
              class="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500"
            >
              Email
            </p>

            <p
              class="mt-2 break-all text-sm font-medium text-slate-200 sm:text-base"
            >
              {{ profile?.email || "Available on request" }}
            </p>
          </div>

          <!-- FOCUS -->
          <div class="py-4 md:px-7 md:py-2 md:last:pr-0">
            <p
              class="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500"
            >
              Focus
            </p>

            <p
              class="mt-2 break-words text-sm font-medium text-slate-200 sm:text-base"
            >
              Frontend Development
            </p>
          </div>

        </div>

      </div>
    </section>


    <!-- ================================================= -->
    <!-- ABOUT -->
    <!-- ================================================= -->

    <section
      class="w-full bg-slate-950"
    >
      <div
        class="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-32"
      >

        <div class="max-w-4xl">

          <p
            class="text-xs font-semibold uppercase tracking-[0.28em] text-blue-400 sm:text-sm"
          >
            About Me
          </p>

          <h2
            class="mt-4 text-3xl font-bold leading-tight tracking-tight text-white sm:mt-5 sm:text-4xl md:text-5xl"
          >
            Building for the web,
            <span class="text-slate-500">
              one project at a time.
            </span>
          </h2>

          <p
            class="mt-6 max-w-3xl text-base leading-8 text-slate-400 sm:mt-7 sm:text-lg sm:leading-9"
          >
            I'm focused on developing clean, responsive and practical
            web experiences. I enjoy turning ideas into functional
            interfaces and continuously improving my frontend
            development skills.
          </p>

          <router-link
            to="/about"
            class="mt-7 inline-flex items-center text-sm font-semibold text-blue-400 transition-colors duration-200 hover:text-blue-300 sm:mt-8 sm:text-base"
          >
            More about me

            <span class="ml-2 text-lg">
              →
            </span>
          </router-link>

        </div>

      </div>
    </section>


    <!-- ================================================= -->
    <!-- CTA -->
    <!-- ================================================= -->

    <section
      class="w-full border-y border-white/[0.06] bg-slate-900/60"
    >
      <div
        class="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
      >

        <div
          class="flex flex-col gap-8 md:flex-row md:items-center md:justify-between"
        >

          <div>
            <p
              class="text-xs font-semibold uppercase tracking-[0.28em] text-blue-400 sm:text-sm"
            >
              Have a project?
            </p>

            <h2
              class="mt-3 text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl"
            >
              Let's build something together.
            </h2>
          </div>

          <router-link
            to="/contact"
            class="inline-flex shrink-0 items-center justify-center rounded-xl bg-blue-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/10 transition-all duration-200 hover:bg-blue-500 hover:shadow-blue-500/20 active:scale-[0.98] sm:px-8 sm:py-4 sm:text-base"
          >
            Get In Touch

            <span class="ml-2">
              ↗
            </span>
          </router-link>

        </div>

      </div>
    </section>

  </div>
</template>