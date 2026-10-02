<script setup lang="ts">
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
    const response = await fetch("http://localhost:3000/api/education");

    if (!response.ok) {
      throw new Error("Failed to fetch education");
    }

    education.value = await response.json();
  } catch (error) {
    console.error("Error fetching education:", error);
  } finally {
    loading.value = false;
  }
};

onMounted(fetchEducation);
</script>

<template>
  <section class="min-h-screen bg-gray-950 text-white px-6 py-24">
    <div class="max-w-6xl mx-auto">

      <!-- Heading -->
      <div class="text-center mb-12">
        <p
          class="text-blue-500 uppercase tracking-widest text-sm font-semibold"
        >
          Education
        </p>

        <h1 class="text-4xl md:text-5xl font-bold mt-3">
          My Education
        </h1>
      </div>

      <!-- Loading -->
      <div v-if="loading" class="text-center text-gray-400">
        Loading education...
      </div>

      <!-- Education List -->
      <div v-else-if="education.length" class="space-y-6">

        <div
          v-for="item in education"
          :key="item.id"
          class="bg-gray-900 border border-gray-800 rounded-2xl p-6
                 transition-all duration-300 ease-out
                 hover:-translate-y-2
                 hover:border-blue-500/60
                 hover:shadow-xl hover:shadow-blue-500/10"
        >
          <h2 class="text-2xl font-bold">
            {{ item.degree }}
          </h2>

          <p class="text-blue-400 mt-2">
            {{ item.institution }}
          </p>

          <p v-if="item.field" class="text-gray-300 mt-2">
            {{ item.field }}
          </p>

          <p class="text-gray-500 mt-2">
            {{ item.start_year }} - {{ item.end_year }}
          </p>

          <p
            v-if="item.description"
            class="text-gray-400 mt-4 leading-relaxed"
          >
            {{ item.description }}
          </p>
        </div>

      </div>

      <!-- Empty -->
      <p v-else class="text-center text-gray-500">
        No education information available.
      </p>

    </div>
  </section>
</template>