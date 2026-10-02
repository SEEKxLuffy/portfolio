
<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();

const menuItems = [
  {
    name: "Dashboard",
    path: "/admin",
    icon: "dashboard",
  },
  {
    name: "Profile",
    path: "/admin/profile",
    icon: "profile",
  },
  {
    name: "Skills",
    path: "/admin/skills",
    icon: "skills",
  },
  {
    name: "Education",
    path: "/admin/education",
    icon: "education",
  },
  {
    name: "Experience",
    path: "/admin/experience",
    icon: "experience",
  },
  {
    name: "Projects",
    path: "/admin/projects",
    icon: "projects",
  },
  {
    name: "Interests",
    path: "/admin/interests",
    icon: "interests",
  },
  {
    name: "Messages",
    path: "/admin/messages",
    icon: "messages",
  },
];

const navigate = (path: string) => {
  router.push(path);
};

const logout = () => {
  localStorage.removeItem("adminLoggedIn");
  router.push("/admin/login");
};
</script>

<template>
  <aside
    class="fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-gray-800 bg-gray-900"
  >
    <!-- BRAND -->
    <div class="border-b border-gray-800 px-6 py-6">
      <router-link
        to="/admin"
        class="text-2xl font-bold tracking-tight text-white"
      >
        Manish<span class="text-blue-500">.</span>
      </router-link>

      <p class="mt-1 text-xs uppercase tracking-[0.2em] text-gray-500">
        Admin Panel
      </p>
    </div>

    <!-- NAVIGATION -->
    <nav class="flex-1 overflow-y-auto px-4 py-6">
      <p
        class="mb-3 px-3 text-xs font-semibold uppercase tracking-[0.2em] text-gray-600"
      >
        Management
      </p>

      <div class="space-y-1">
        <button
          v-for="item in menuItems"
          :key="item.path"
          type="button"
          @click="navigate(item.path)"
          :class="[
            'flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium transition-all duration-200',
            router.currentRoute.value.path === item.path
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/10'
              : 'text-gray-400 hover:bg-gray-800 hover:text-white'
          ]"
        >
          <!-- Dashboard -->
          <svg
            v-if="item.icon === 'dashboard'"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.8"
            stroke="currentColor"
            class="h-5 w-5 shrink-0"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3 13h8V3H3v10Zm10 8h8V11h-8v10ZM3 21h8v-6H3v6Zm10-18v6h8V3h-8Z"
            />
          </svg>

          <!-- Profile -->
          <svg
            v-else-if="item.icon === 'profile'"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.8"
            stroke="currentColor"
            class="h-5 w-5 shrink-0"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 6.75a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.5 20.25a7.5 7.5 0 0 1 15 0"
            />
          </svg>

          <!-- Skills -->
          <svg
            v-else-if="item.icon === 'skills'"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.8"
            stroke="currentColor"
            class="h-5 w-5 shrink-0"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m8.25 4.5 7.5 7.5-7.5 7.5"
            />
          </svg>

          <!-- Education -->
          <svg
            v-else-if="item.icon === 'education'"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.8"
            stroke="currentColor"
            class="h-5 w-5 shrink-0"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m3 9 9-5 9 5-9 5-9-5Z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M7 11.22v4.53c0 .69.37 1.33.97 1.68A8 8 0 0 0 12 18.5a8 8 0 0 0 4.03-1.07c.6-.35.97-.99.97-1.68v-4.53"
            />
          </svg>

          <!-- Experience -->
          <svg
            v-else-if="item.icon === 'experience'"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.8"
            stroke="currentColor"
            class="h-5 w-5 shrink-0"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9 7.5V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v1.5M4.5 8.25h15A1.5 1.5 0 0 1 21 9.75v8.5a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 18.25v-8.5a1.5 1.5 0 0 1 1.5-1.5Z"
            />
          </svg>

          <!-- Projects -->
          <svg
            v-else-if="item.icon === 'projects'"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.8"
            stroke="currentColor"
            class="h-5 w-5 shrink-0"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3.75 6.75h16.5v12.5H3.75V6.75Z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M8 6.75V5.5A1.5 1.5 0 0 1 9.5 4h5A1.5 1.5 0 0 1 16 5.5v1.25"
            />
          </svg>

          <!-- Interests -->
          <svg
            v-else-if="item.icon === 'interests'"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.8"
            stroke="currentColor"
            class="h-5 w-5 shrink-0"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 20.25s-7.5-4.35-7.5-10.02A4.23 4.23 0 0 1 8.73 6c1.36 0 2.59.64 3.27 1.65A3.94 3.94 0 0 1 15.27 6a4.23 4.23 0 0 1 4.23 4.23C19.5 15.9 12 20.25 12 20.25Z"
            />
          </svg>

          <!-- Messages -->
          <svg
            v-else-if="item.icon === 'messages'"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.8"
            stroke="currentColor"
            class="h-5 w-5 shrink-0"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M4.5 5.25h15v10.5h-9l-4.5 3v-3h-1.5V5.25Z"
            />
          </svg>

          <span>{{ item.name }}</span>
        </button>
      </div>
    </nav>

    <!-- LOGOUT -->
    <div class="border-t border-gray-800 p-4">
      <button
        type="button"
        @click="logout"
        class="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-red-400 transition-all duration-200 hover:bg-red-500/10 hover:text-red-300"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.8"
          stroke="currentColor"
          class="h-5 w-5"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v15A2.25 2.25 0 0 0 7.5 22.5h6a2.25 2.25 0 0 0 2.25-2.25V16.5M18 15l3-3m0 0-3-3m3 3H9"
          />
        </svg>

        <span>Logout</span>
      </button>
    </div>
  </aside>
</template>
