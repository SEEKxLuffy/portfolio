```vue
<script setup lang="ts">
import { ref, watch } from "vue";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();

const menuOpen = ref(false);

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Projects", path: "/projects" },
  { name: "Skills", path: "/skills" },
  { name: "Experience", path: "/experience" },
  { name: "Education", path: "/education" },
  { name: "Interests", path: "/interests" },
];

const navigate = (path: string) => {
  menuOpen.value = false;
  router.push(path);
};

const isActive = (path: string) => {
  if (path === "/") {
    return route.path === "/";
  }

  return route.path === path || route.path.startsWith(`${path}/`);
};

watch(
  () => route.fullPath,
  () => {
    menuOpen.value = false;
  },
);
</script>

<template>
  <header
    class="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 sm:pt-5 lg:px-8 lg:pt-6"
  >
    <nav
      class="mx-auto w-full max-w-6xl overflow-hidden rounded-2xl border border-white/[0.08] bg-slate-950/75 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.65)] backdrop-blur-2xl"
      aria-label="Main navigation"
    >
      <!-- NAVBAR ROW -->
      <div
        class="flex min-h-[64px] items-center justify-between px-4 sm:min-h-[68px] sm:px-6 lg:px-7"
      >
        <!-- LOGO -->
        <button
          type="button"
          @click="navigate('/')"
          class="group inline-flex shrink-0 items-center"
          aria-label="Go to homepage"
        >
          <span
            class="text-lg font-bold tracking-[-0.02em] text-white transition-colors duration-200 group-hover:text-slate-300 sm:text-xl"
          >
            Manish
          </span>

          <span
            class="ml-0.5 text-xl font-bold text-blue-500 transition-colors duration-200 group-hover:text-blue-400 sm:text-2xl"
          >
            .
          </span>
        </button>

        <!-- DESKTOP NAVIGATION -->
        <div class="hidden lg:flex lg:items-center">
          <div class="flex items-center gap-0.5 xl:gap-1">
            <button
              v-for="link in navLinks"
              :key="link.path"
              type="button"
              @click="navigate(link.path)"
              :aria-current="isActive(link.path) ? 'page' : undefined"
              :class="[
                'relative whitespace-nowrap rounded-lg px-3 py-2 text-[13px] font-medium transition-all duration-200 xl:px-3.5 xl:text-sm',
                isActive(link.path)
                  ? 'bg-white/[0.08] text-white'
                  : 'text-slate-400 hover:bg-white/[0.05] hover:text-slate-100',
              ]"
            >
              {{ link.name }}

              <span
                v-if="isActive(link.path)"
                class="absolute bottom-1 left-1/2 h-0.5 w-4 -translate-x-1/2 rounded-full bg-blue-500"
              ></span>
            </button>
          </div>
        </div>

        <!-- DESKTOP CONTACT -->
        <button
          type="button"
          @click="navigate('/contact')"
          class="hidden shrink-0 items-center rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/10 transition-all duration-200 hover:bg-blue-500 hover:shadow-blue-500/20 active:scale-[0.98] lg:inline-flex xl:px-5"
        >
          Contact Me

          <span
            class="ml-2 text-base leading-none transition-transform duration-200 group-hover:translate-x-0.5"
            aria-hidden="true"
          >
            ↗
          </span>
        </button>

        <!-- MOBILE MENU BUTTON -->
        <button
          type="button"
          @click="menuOpen = !menuOpen"
          class="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.04] text-slate-200 transition-all duration-200 hover:bg-white/[0.08] hover:text-white active:scale-95 lg:hidden"
          :aria-expanded="menuOpen"
          aria-controls="mobile-navigation"
          :aria-label="
            menuOpen ? 'Close navigation menu' : 'Open navigation menu'
          "
        >
          <!-- MENU ICON -->
          <svg
            v-if="!menuOpen"
            xmlns="http://www.w3.org/2000/svg"
            width="19"
            height="19"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.8"
            stroke-linecap="round"
            aria-hidden="true"
          >
            <path d="M4 7h16" />
            <path d="M4 12h16" />
            <path d="M4 17h16" />
          </svg>

          <!-- CLOSE ICON -->
          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            width="19"
            height="19"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.8"
            stroke-linecap="round"
            aria-hidden="true"
          >
            <path d="m18 6-12 12" />
            <path d="M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- MOBILE MENU -->
      <div
        v-if="menuOpen"
        id="mobile-navigation"
        class="border-t border-white/[0.07] bg-white/[0.015] px-3 pb-4 pt-3 sm:px-5 sm:pb-5 lg:hidden"
      >
        <div class="flex flex-col gap-1">
          <!-- NAV LINKS -->
          <button
            v-for="link in navLinks"
            :key="link.path"
            type="button"
            @click="navigate(link.path)"
            :aria-current="isActive(link.path) ? 'page' : undefined"
            :class="[
              'flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-sm font-medium transition-all duration-200',
              isActive(link.path)
                ? 'bg-blue-500/[0.10] text-blue-400'
                : 'text-slate-300 hover:bg-white/[0.05] hover:text-white',
            ]"
          >
            <span>{{ link.name }}</span>

            <span
              v-if="isActive(link.path)"
              class="h-1.5 w-1.5 rounded-full bg-blue-500"
              aria-hidden="true"
            ></span>
          </button>

          <!-- CONTACT -->
          <button
            type="button"
            @click="navigate('/contact')"
            class="mt-2 flex w-full items-center justify-center rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/10 transition-all duration-200 hover:bg-blue-500 active:scale-[0.99]"
          >
            Contact Me

            <span class="ml-2 text-base leading-none" aria-hidden="true">
              ↗
            </span>
          </button>
        </div>
      </div>
    </nav>
  </header>
</template>
```