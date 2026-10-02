<template>
  <footer class="bg-gray-950 border-t border-gray-800 text-white">
    <div class="max-w-7xl mx-auto px-6 py-12">

      <div
        class="flex flex-col md:flex-row items-center justify-between gap-6"
      >
        <!-- Logo -->
        <div class="text-center md:text-left">
          <h2 class="text-2xl font-bold">
            Manish<span class="text-blue-500">.</span>
          </h2>

          <p class="text-gray-500 text-sm mt-2">
            Frontend Developer
          </p>
        </div>

        <!-- Navigation -->
        <div class="flex flex-wrap justify-center gap-6 text-sm">
          <router-link
            to="/"
            class="text-gray-400 hover:text-white transition"
          >
            Home
          </router-link>

          <router-link
            to="/projects"
            class="text-gray-400 hover:text-blue-400 transition"
          >
            Projects
          </router-link>

          <router-link
            to="/skills"
            class="text-gray-400 hover:text-blue-400 transition"
          >
            Skills
          </router-link>

          <router-link
            to="/experience"
            class="text-gray-400 hover:text-blue-400 transition"
          >
            Experience
          </router-link>

          <router-link
            to="/contact"
            class="text-gray-400 hover:text-blue-400 transition"
          >
            Contact
          </router-link>
        </div>
      </div>

      <!-- Bottom -->
      <div
        class="border-t border-gray-800 mt-10 pt-6 text-center text-gray-600 text-sm"
      >
        © {{ new Date().getFullYear() }} Manish Tamang. All rights reserved.
      </div>

    </div>
  </footer>
</template>