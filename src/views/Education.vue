```vue
<script setup lang="ts">
import { API_URL } from "../config";
import { ref, onMounted } from "vue";

interface Education {
  id: number;
  institution: string;
  degree: string;
  field: string;
  start_year: string;
  end_year: string;
  description: string;
}

const education = ref<Education[]>([]);
const loading = ref(true);

const fetchEducation = async () => {
  try {
    const response = await fetch(`${API_URL}/api/education`);

    if (!response.ok) {
      throw new Error("Failed to fetch education");
    }

    const data = await response.json();

    education.value = Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Error fetching education:", error);
    education.value = [];
  } finally {
    loading.value = false;
  }
};

onMounted(fetchEducation);
</script>

<template>
  <section
    class="min-h-screen w-full overflow-hidden bg-gray-950 px-4 py-20 text-white sm:px-6 sm:py-24 md:px-8 lg:px-10"
  >
    <div class="mx-auto w-full max-w-6xl">

      <!-- HEADER -->
      <div class="mx-auto mb-14 max-w-3xl text-center sm:mb-16">
        <p
          class="text-xs font-semibold uppercase tracking-[0.25em] text-blue-500 sm:text-sm sm:tracking-[0.3em]"
        >
          Education
        </p>

        <h1
          class="mt-4 text-3xl font-bold leading-tight sm:text-4xl md:text-5xl lg:text-6xl"
        >
          My Education
        </h1>

        <p
          class="mx-auto mt-5 max-w-2xl text-base leading-7 text-gray-400 sm:text-lg sm:leading-8"
        >
          My academic background and the foundation behind my development journey.
        </p>
      </div>

      <!-- LOADING -->
      <div
        v-if="loading"
        class="flex min-h-[300px] items-center justify-center text-gray-400"
      >
        <div class="text-center">
          <div
            class="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-gray-700 border-t-blue-500"
          ></div>

          <p>Loading education...</p>
        </div>
      </div>

      <!-- EDUCATION -->
      <div
        v-else-if="education.length"
        class="relative"
      >
        <!-- TIMELINE -->
        <div
          class="absolute bottom-0 left-4 top-0 w-px bg-gradient-to-b from-blue-500/70 via-gray-800 to-transparent md:left-1/2"
        ></div>

        <div class="space-y-10 sm:space-y-12">
          <div
            v-for="(item, index) in education"
            :key="item.id"
            class="relative grid grid-cols-1 md:grid-cols-2"
          >

            <!-- TIMELINE DOT -->
            <div
              class="absolute left-4 top-7 z-10 h-3 w-3 -translate-x-1/2 rounded-full border-4 border-gray-950 bg-blue-500 shadow-lg shadow-blue-500/30 md:left-1/2"
            ></div>

            <!-- CARD -->
            <div
              :class="[
                index % 2 === 0
                  ? 'md:col-start-1 md:pr-12'
                  : 'md:col-start-2 md:pl-12'
              ]"
              class="pl-10"
            >
              <article
                class="group relative overflow-hidden rounded-2xl border border-gray-800 bg-gray-900/80 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-500/10 sm:p-7"
              >
                <!-- TOP ACCENT -->
                <div
                  class="absolute left-0 top-0 h-1 w-0 bg-blue-500 transition-all duration-300 group-hover:w-full"
                ></div>

                <!-- YEAR -->
                <div class="mb-5 flex items-center gap-3">
                  <span
                    class="rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs font-semibold tracking-wide text-blue-400"
                  >
                    {{ item.start_year }} - {{ item.end_year || "Present" }}
                  </span>
                </div>

                <!-- DEGREE -->
                <h2
                  class="text-xl font-bold leading-snug text-white transition-colors duration-300 group-hover:text-blue-400 sm:text-2xl"
                >
                  {{ item.degree }}
                </h2>

                <!-- INSTITUTION -->
                <p
                  class="mt-2 text-base font-medium text-gray-300 sm:text-lg"
                >
                  {{ item.institution }}
                </p>

                <!-- FIELD -->
                <p
                  v-if="item.field"
                  class="mt-2 text-sm text-blue-400"
                >
                  {{ item.field }}
                </p>

                <!-- DESCRIPTION -->
                <p
                  v-if="item.description"
                  class="mt-5 text-sm leading-7 text-gray-400 sm:text-base sm:leading-relaxed"
                >
                  {{ item.description }}
                </p>

                <!-- BOTTOM LINE -->
                <div
                  class="mt-6 h-px w-full bg-gray-800 transition-colors duration-300 group-hover:bg-blue-500/20"
                ></div>

                <!-- EDUCATION LABEL -->
                <p
                  class="mt-4 text-xs font-medium uppercase tracking-[0.2em] text-gray-600"
                >
                  Academic Background
                </p>
              </article>
            </div>
          </div>
        </div>
      </div>

      <!-- EMPTY -->
      <div
        v-else
        class="rounded-2xl border border-dashed border-gray-800 bg-gray-900/40 px-6 py-16 text-center"
      >
        <p class="text-gray-500">
          No education information available.
        </p>
      </div>

    </div>
  </section>
</template>
```
