<script setup lang="ts">
import { API_URL } from "../config";
import { ref, onMounted } from "vue";

interface Interest {
  id: number;
  name: string;
  description: string;
}

const interests = ref<Interest[]>([]);
const loading = ref(true);

const fetchInterests = async () => {
  try {
    const response = await fetch(`${API_URL}/api/interests`);

    if (!response.ok) {
      throw new Error("Failed to fetch interests");
    }

    interests.value = await response.json();
  } catch (error) {
    console.error("Error fetching interests:", error);
  } finally {
    loading.value = false;
  }
};

onMounted(fetchInterests);
</script>

<template>
  <section class="min-h-screen bg-gray-950 text-white px-6 py-24">
    <div class="max-w-7xl mx-auto">

      <div class="text-center mb-16">
        <p class="text-blue-500 uppercase tracking-[0.3em] text-sm font-semibold">
          Interests
        </p>

        <h1 class="text-4xl md:text-6xl font-bold mt-4">
          Beyond Coding
        </h1>

        <p class="text-gray-400 max-w-2xl mx-auto mt-5 text-lg">
          Things I enjoy and activities that keep me curious and motivated.
        </p>
      </div>

      <div v-if="loading" class="text-center text-gray-400 py-20">
        Loading interests...
      </div>

      <div
        v-else-if="interests.length"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <article
          v-for="interest in interests"
          :key="interest.id"
          class="bg-gray-900 border border-gray-800 rounded-2xl p-7 hover:border-blue-500/60 hover:-translate-y-1 transition duration-300"
        >
          <div
            class="w-12 h-12 rounded-xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-400 text-xl font-bold"
          >
            {{ interest.name.charAt(0).toUpperCase() }}
          </div>

          <h2 class="text-2xl font-bold mt-6">
            {{ interest.name }}
          </h2>

          <p class="text-gray-400 mt-4 leading-relaxed">
            {{ interest.description }}
          </p>
        </article>
      </div>

      <div v-else class="text-center py-20 text-gray-500">
        No interests added yet.
      </div>

    </div>
  </section>
</template>
