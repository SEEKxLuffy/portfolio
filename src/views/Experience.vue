<script setup lang="ts">
import { ref, onMounted } from "vue";

interface Experience {
  id: number;
  job_title: string;
  company: string;
  start_date: string;
  end_date: string | null;
  description: string;
}

const experiences = ref<Experience[]>([]);
const loading = ref(true);

const fetchExperience = async () => {
  try {
    const response = await fetch(
      "http://localhost:3000/api/experience"
    );

    if (!response.ok) {
      throw new Error("Failed to fetch experience");
    }

    const data = await response.json();

    experiences.value = Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Error fetching experience:", error);
    experiences.value = [];
  } finally {
    loading.value = false;
  }
};

onMounted(fetchExperience);
</script>

<template>
  <section
    class="min-h-screen w-full overflow-hidden bg-gray-950 px-4 py-20 text-white sm:px-6 sm:py-24 md:px-8 lg:px-10"
  >
    <div class="mx-auto w-full max-w-6xl min-w-0">

      <!-- HEADER -->
      <div class="mb-12 text-center sm:mb-16">
        <p
          class="text-xs font-semibold uppercase tracking-[0.25em] text-blue-500 sm:text-sm sm:tracking-[0.3em]"
        >
          Experience
        </p>

        <h1
          class="mt-4 text-3xl font-bold leading-tight sm:text-4xl md:text-5xl lg:text-6xl"
        >
          My Experience
        </h1>

        <p
          class="mx-auto mt-5 max-w-2xl text-base leading-7 text-gray-400 sm:text-lg sm:leading-8"
        >
          My professional journey and hands-on experience.
        </p>
      </div>

      <!-- LOADING -->
      <div
        v-if="loading"
        class="py-20 text-center text-gray-400"
      >
        Loading experience...
      </div>

      <!-- EXPERIENCE -->
      <div
        v-else-if="experiences.length"
        class="relative"
      >

        <!-- TIMELINE -->
        <div
          class="absolute bottom-0 left-3 top-0 w-px bg-gray-800 md:left-1/2"
        ></div>

        <div class="space-y-10 sm:space-y-12">

          <div
            v-for="(experience, index) in experiences"
            :key="experience.id"
            class="relative grid min-w-0 grid-cols-1 gap-6 md:grid-cols-2 md:gap-8"
          >

            <!-- TIMELINE DOT -->
            <div
              class="absolute left-3 top-6 z-10 h-3 w-3 -translate-x-1/2 rounded-full border-4 border-gray-950 bg-blue-500 md:left-1/2"
            ></div>

            <!-- EXPERIENCE CARD -->
            <div
              :class="[
                index % 2 === 0
                  ? 'md:pr-12 md:text-right'
                  : 'md:col-start-2 md:pl-12'
              ]"
              class="min-w-0 pl-10 md:pl-0"
            >
              <div
                class="min-w-0 overflow-hidden rounded-2xl border border-gray-800 bg-gray-900 p-5 transition hover:border-blue-500/60 sm:p-7"
              >

                <!-- DATE -->
                <p
                  class="break-words text-sm font-semibold text-blue-400"
                >
                  {{ experience.start_date || "Unknown" }}
                  -
                  {{ experience.end_date || "Present" }}
                </p>

                <!-- JOB TITLE -->
                <h2
                  class="mt-3 break-words text-xl font-bold sm:text-2xl"
                >
                  {{ experience.job_title }}
                </h2>

                <!-- COMPANY -->
                <h3
                  class="mt-2 break-words text-gray-300"
                >
                  {{ experience.company }}
                </h3>

                <!-- DESCRIPTION -->
                <p
                  v-if="experience.description"
                  class="mt-5 break-words text-sm leading-7 text-gray-400 sm:text-base sm:leading-relaxed"
                >
                  {{ experience.description }}
                </p>

              </div>
            </div>

          </div>

        </div>
      </div>

      <!-- EMPTY -->
      <div
        v-else
        class="py-20 text-center text-gray-500"
      >
        No experience information available yet.
      </div>

    </div>
  </section>
</template>