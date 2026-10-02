```vue
<template>
  <footer class="border-t border-gray-800 bg-gray-950 text-white">
    <div class="mx-auto max-w-7xl px-4 py-14 sm:px-6 md:px-8 lg:px-10">

      <!-- MAIN FOOTER -->
      <div
        class="flex flex-col gap-10 md:flex-row md:items-start md:justify-between"
      >
        <!-- BRAND -->
        <div class="max-w-sm text-center md:text-left">
          <router-link
            to="/"
            class="inline-block text-2xl font-bold tracking-tight transition hover:opacity-90"
          >
            Manish<span class="text-blue-500">.</span>
          </router-link>

          <p class="mt-3 text-sm leading-6 text-gray-500">
            Frontend Developer focused on building clean, responsive,
            and user-friendly web experiences.
          </p>
        </div>

        <!-- NAVIGATION -->
        <div class="text-center md:text-right">
          <p
            class="text-xs font-semibold uppercase tracking-[0.2em] text-gray-600"
          >
            Explore
          </p>

          <nav
            class="mt-4 flex flex-wrap justify-center gap-x-6 gap-y-3 md:justify-end"
          >
            <router-link
              to="/"
              class="text-sm text-gray-400 transition-colors duration-200 hover:text-white"
            >
              Home
            </router-link>

            <router-link
              to="/projects"
              class="text-sm text-gray-400 transition-colors duration-200 hover:text-blue-400"
            >
              Projects
            </router-link>

            <router-link
              to="/skills"
              class="text-sm text-gray-400 transition-colors duration-200 hover:text-blue-400"
            >
              Skills
            </router-link>

            <router-link
              to="/experience"
              class="text-sm text-gray-400 transition-colors duration-200 hover:text-blue-400"
            >
              Experience
            </router-link>

            <router-link
              to="/education"
              class="text-sm text-gray-400 transition-colors duration-200 hover:text-blue-400"
            >
              Education
            </router-link>

            <router-link
              to="/contact"
              class="text-sm text-gray-400 transition-colors duration-200 hover:text-blue-400"
            >
              Contact
            </router-link>
          </nav>
        </div>
      </div>

      <!-- DIVIDER -->
      <div class="my-10 h-px bg-gray-800"></div>

      <!-- BOTTOM -->
      <div
        class="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left"
      >
        <p class="text-xs leading-5 text-gray-600 sm:text-sm">
          © {{ new Date().getFullYear() }} Manish Tamang. All rights reserved.
        </p>

        <p class="text-xs text-gray-600 sm:text-sm">
          Built with
          <span class="text-gray-400">Vue</span>
          &
          <span class="text-gray-400">Tailwind CSS</span>
        </p>
      </div>

    </div>
  </footer>
</template>
```