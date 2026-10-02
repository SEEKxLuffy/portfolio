<script setup lang="ts">
import { ref, onMounted } from "vue";

interface Profile {
  email: string;
  phone: string;
  location: string;
  github: string;
  linkedin: string;
}

const profile = ref<Profile | null>(null);

const fetchProfile = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/profile");

    if (!response.ok) {
      throw new Error("Failed to fetch profile");
    }

    profile.value = await response.json();
  } catch (error) {
    console.error("Error fetching profile:", error);
  }
};

onMounted(fetchProfile);
</script>

<template>
  <section class="min-h-screen bg-gray-950 text-white px-6 py-24">
    <div class="max-w-6xl mx-auto">

      <div class="text-center mb-16">
        <p class="text-blue-500 uppercase tracking-[0.3em] text-sm font-semibold">
          Contact
        </p>

        <h1 class="text-4xl md:text-6xl font-bold mt-4">
          Let's Work Together
        </h1>

        <p class="text-gray-400 max-w-2xl mx-auto mt-5 text-lg">
          Have a project, opportunity, or just want to say hello?
          Feel free to get in touch.
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-10">

        <!-- CONTACT INFO -->
        <div class="space-y-5">

          <div
            class="bg-gray-900 border border-gray-800 rounded-2xl p-7"
          >
            <p class="text-gray-500 text-sm uppercase tracking-wider">
              Email
            </p>

            <p class="text-lg font-semibold mt-2 break-all">
              {{ profile?.email || "Email not available" }}
            </p>
          </div>

          <div
            class="bg-gray-900 border border-gray-800 rounded-2xl p-7"
          >
            <p class="text-gray-500 text-sm uppercase tracking-wider">
              Phone
            </p>

            <p class="text-lg font-semibold mt-2">
              {{ profile?.phone || "Phone not available" }}
            </p>
          </div>

          <div
            class="bg-gray-900 border border-gray-800 rounded-2xl p-7"
          >
            <p class="text-gray-500 text-sm uppercase tracking-wider">
              Location
            </p>

            <p class="text-lg font-semibold mt-2">
              {{ profile?.location || "Nepal" }}
            </p>
          </div>

          <div class="flex gap-4 pt-2">

            <a
              v-if="profile?.github"
              :href="profile.github"
              target="_blank"
              rel="noopener noreferrer"
              class="px-5 py-3 border border-gray-700 rounded-lg hover:border-blue-500 transition"
            >
              GitHub
            </a>

            <a
              v-if="profile?.linkedin"
              :href="profile.linkedin"
              target="_blank"
              rel="noopener noreferrer"
              class="px-5 py-3 border border-gray-700 rounded-lg hover:border-blue-500 transition"
            >
              LinkedIn
            </a>

          </div>
        </div>

        <!-- FORM -->
        <div
          class="bg-gray-900 border border-gray-800 rounded-2xl p-8"
        >
          <form class="space-y-6">

            <div>
              <label class="block text-gray-300 mb-2">
                Name
              </label>

              <input
                type="text"
                placeholder="Your name"
                class="w-full bg-gray-950 border border-gray-800 rounded-lg px-4 py-3 text-white outline-none focus:border-blue-500 transition"
              />
            </div>

            <div>
              <label class="block text-gray-300 mb-2">
                Email
              </label>

              <input
                type="email"
                placeholder="your@email.com"
                class="w-full bg-gray-950 border border-gray-800 rounded-lg px-4 py-3 text-white outline-none focus:border-blue-500 transition"
              />
            </div>

            <div>
              <label class="block text-gray-300 mb-2">
                Message
              </label>

              <textarea
                rows="6"
                placeholder="Write your message..."
                class="w-full bg-gray-950 border border-gray-800 rounded-lg px-4 py-3 text-white outline-none focus:border-blue-500 transition resize-none"
              ></textarea>
            </div>

            <button
              type="button"
              class="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-lg font-semibold transition"
            >
              Send Message
            </button>

          </form>
        </div>

      </div>
    </div>
  </section>
</template>