```vue
<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

import { API_URL } from "../config";

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

interface Project {
  id: number;
  title: string;
  description: string;
  tech: string;
  github: string;
  live: string;
}

interface Skill {
  id: number;
  name: string;
  category: string;
  level: string;
}

interface Education {
  id: number;
  institution: string;
  degree: string;
  field: string;
  start_year: string;
  end_year: string;
  description: string;
}

interface Experience {
  id: number;
  company: string;
  position: string;
  start_date: string;
  end_date: string;
  description: string;
}

interface Interest {
  id: number;
  name: string;
  description?: string;
}

interface Message {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

const profile = ref<Profile | null>(null);
const projects = ref<Project[]>([]);
const skills = ref<Skill[]>([]);
const education = ref<Education[]>([]);
const experience = ref<Experience[]>([]);
const interests = ref<Interest[]>([]);
const messages = ref<Message[]>([]);

const loading = ref(true);
const errorMessage = ref("");

const fetchData = async () => {
  loading.value = true;
  errorMessage.value = "";

  try {
    const [
      profileResponse,
      projectsResponse,
      skillsResponse,
      educationResponse,
      experienceResponse,
      interestsResponse,
      messagesResponse,
    ] = await Promise.all([
      fetch(`${API_URL}/api/profile`),
      fetch(`${API_URL}/api/projects`),
      fetch(`${API_URL}/api/skills`),
      fetch(`${API_URL}/api/education`),
      fetch(`${API_URL}/api/experience`),
      fetch(`${API_URL}/api/interests`),
      fetch(`${API_URL}/api/messages`),
    ]);

    if (!profileResponse.ok) {
      throw new Error("Failed to load profile.");
    }

    if (!projectsResponse.ok) {
      throw new Error("Failed to load projects.");
    }

    if (!skillsResponse.ok) {
      throw new Error("Failed to load skills.");
    }

    if (!educationResponse.ok) {
      throw new Error("Failed to load education.");
    }

    if (!experienceResponse.ok) {
      throw new Error("Failed to load experience.");
    }

    if (!interestsResponse.ok) {
      throw new Error("Failed to load interests.");
    }

    if (!messagesResponse.ok) {
      throw new Error("Failed to load messages.");
    }

    profile.value = await profileResponse.json();
    projects.value = await projectsResponse.json();
    skills.value = await skillsResponse.json();
    education.value = await educationResponse.json();
    experience.value = await experienceResponse.json();
    interests.value = await interestsResponse.json();
    messages.value = await messagesResponse.json();
  } catch (error) {
    console.error("Dashboard error:", error);
    errorMessage.value =
      "Unable to load dashboard data. Please make sure the backend is running.";
  } finally {
    loading.value = false;
  }
};

onMounted(fetchData);

/* -----------------------------
   Statistics
----------------------------- */

const unreadMessages = computed(() => {
  return messages.value.filter((message) => !message.is_read).length;
});

const readMessages = computed(() => {
  return messages.value.filter((message) => message.is_read).length;
});

const totalContent = computed(() => {
  return (
    projects.value.length +
    skills.value.length +
    education.value.length +
    experience.value.length +
    interests.value.length
  );
});

/* -----------------------------
   Chart calculations
----------------------------- */

const maxContentValue = computed(() => {
  return Math.max(
    projects.value.length,
    skills.value.length,
    education.value.length,
    experience.value.length,
    interests.value.length,
    1
  );
});

const contentBars = computed(() => {
  return [
    {
      label: "Projects",
      value: projects.value.length,
      color: "bg-blue-500",
    },
    {
      label: "Skills",
      value: skills.value.length,
      color: "bg-cyan-500",
    },
    {
      label: "Education",
      value: education.value.length,
      color: "bg-violet-500",
    },
    {
      label: "Experience",
      value: experience.value.length,
      color: "bg-emerald-500",
    },
    {
      label: "Interests",
      value: interests.value.length,
      color: "bg-orange-500",
    },
  ];
});

const messageTotal = computed(() => {
  return Math.max(messages.value.length, 1);
});

const readPercentage = computed(() => {
  return Math.round((readMessages.value / messageTotal.value) * 100);
});

const unreadPercentage = computed(() => {
  return Math.round((unreadMessages.value / messageTotal.value) * 100);
});

/* -----------------------------
   Recent data
----------------------------- */

const recentMessages = computed(() => {
  return [...messages.value]
    .sort(
      (a, b) =>
        new Date(b.created_at).getTime() -
        new Date(a.created_at).getTime()
    )
    .slice(0, 5);
});

const recentProjects = computed(() => {
  return [...projects.value].slice(-5).reverse();
});

/* -----------------------------
   Helpers
----------------------------- */

const getProfileImage = () => {
  if (!profile.value?.image) {
    return "";
  }

  if (profile.value.image.startsWith("http")) {
    return profile.value.image;
  }

  return `${API_URL}${profile.value.image}`;
};

const formatDate = (date: string) => {
  if (!date) return "";

  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const truncateMessage = (message: string, length = 70) => {
  if (message.length <= length) {
    return message;
  }

  return `${message.substring(0, length)}...`;
};

const openPage = (path: string) => {
  router.push(path);
};

const viewPortfolio = () => {
  window.open("/", "_blank");
};
</script>

<template>
  <div class="min-h-screen bg-gray-950">
    <!-- Main container -->
    <div class="p-6 md:p-8 lg:p-10">

      <!-- =========================================
           HEADER
      ========================================== -->
      <header
        class="mb-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between"
      >
        <div>
          <p
            class="mb-2 text-sm font-medium uppercase tracking-[0.2em] text-blue-400"
          >
            Admin Panel
          </p>

          <h1 class="text-3xl font-bold tracking-tight text-white md:text-4xl">
            Dashboard
          </h1>

          <p class="mt-2 text-gray-400">
            Manage and monitor your portfolio from one place.
          </p>
        </div>

        <button
          @click="viewPortfolio"
          class="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-700 bg-gray-900 px-5 py-3 text-sm font-medium text-gray-200 transition hover:border-blue-500 hover:bg-gray-800 hover:text-white"
        >
          <!-- External link icon -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="1.8"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M14 5h5m0 0v5m0-5-7 7"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M19 13v5a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5"
            />
          </svg>

          View Portfolio
        </button>
      </header>

      <!-- =========================================
           LOADING
      ========================================== -->
      <div
        v-if="loading"
        class="flex min-h-[500px] items-center justify-center"
      >
        <div class="flex flex-col items-center gap-4">
          <div
            class="h-10 w-10 animate-spin rounded-full border-4 border-gray-700 border-t-blue-500"
          ></div>

          <p class="text-sm text-gray-400">
            Loading dashboard...
          </p>
        </div>
      </div>

      <!-- =========================================
           ERROR
      ========================================== -->
      <div
        v-else-if="errorMessage"
        class="rounded-2xl border border-red-900/50 bg-red-950/30 p-6"
      >
        <div class="flex items-start gap-4">
          <div
            class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-500/10 text-red-400"
          >
            !
          </div>

          <div>
            <h2 class="font-semibold text-red-300">
              Dashboard unavailable
            </h2>

            <p class="mt-1 text-sm text-red-400/80">
              {{ errorMessage }}
            </p>

            <button
              @click="fetchData"
              class="mt-4 rounded-lg bg-red-500/10 px-4 py-2 text-sm font-medium text-red-300 transition hover:bg-red-500/20"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>

      <!-- =========================================
           DASHBOARD CONTENT
      ========================================== -->
      <div v-else class="space-y-8">

        <!-- =======================================
             PROFILE SUMMARY
        ======================================== -->
        <section
          class="overflow-hidden rounded-2xl border border-gray-800 bg-gray-900"
        >
          <div class="h-24 bg-gradient-to-r from-blue-600/20 via-blue-500/5 to-transparent"></div>

          <div class="-mt-12 px-6 pb-6 md:px-8">
            <div
              class="flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
            >
              <div class="flex flex-col gap-4 sm:flex-row sm:items-end">
                <!-- Profile image -->
                <div
                  class="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-2xl border-4 border-gray-900 bg-gray-800 shadow-xl"
                >
                  <img
                    v-if="getProfileImage()"
                    :src="getProfileImage()"
                    :alt="profile?.name || 'Admin profile'"
                    class="h-full w-full object-cover"
                  />

                  <span
                    v-else
                    class="text-3xl font-bold text-blue-400"
                  >
                    {{ profile?.name?.charAt(0) || "M" }}
                  </span>
                </div>

                <div class="pb-1">
                  <div class="flex flex-wrap items-center gap-3">
                    <h2 class="text-2xl font-bold text-white">
                      {{ profile?.name || "Admin" }}
                    </h2>

                    <span
                      class="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400"
                    >
                      Online
                    </span>
                  </div>

                  <p class="mt-1 text-gray-400">
                    {{ profile?.job_title || "Portfolio Administrator" }}
                  </p>
                </div>
              </div>

              <button
                @click="openPage('/admin/profile')"
                class="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-500"
              >
                Edit Profile

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>

            <!-- Profile information -->
            <div
              class="mt-6 grid grid-cols-1 gap-4 border-t border-gray-800 pt-6 md:grid-cols-2 lg:grid-cols-3"
            >
              <div class="flex items-center gap-3">
                <div
                  class="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400"
                >
                  @
                </div>

                <div class="min-w-0">
                  <p class="text-xs uppercase tracking-wider text-gray-500">
                    Email
                  </p>

                  <p class="truncate text-sm text-gray-300">
                    {{ profile?.email || "Not provided" }}
                  </p>
                </div>
              </div>

              <div class="flex items-center gap-3">
                <div
                  class="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10 text-violet-400"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="1.8"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M12 21s7-5.2 7-11a7 7 0 10-14 0c0 5.8 7 11 7 11z"
                    />
                    <circle cx="12" cy="10" r="2.5" />
                  </svg>
                </div>

                <div>
                  <p class="text-xs uppercase tracking-wider text-gray-500">
                    Location
                  </p>

                  <p class="text-sm text-gray-300">
                    {{ profile?.location || "Not provided" }}
                  </p>
                </div>
              </div>

              <div class="flex items-center gap-3">
                <div
                  class="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400"
                >
                  #
                </div>

                <div>
                  <p class="text-xs uppercase tracking-wider text-gray-500">
                    Total Content
                  </p>

                  <p class="text-sm text-gray-300">
                    {{ totalContent }} records
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- =======================================
             STATISTICS
        ======================================== -->
        <section
          class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          <!-- Projects -->
          <button
            @click="openPage('/admin/projects')"
            class="group rounded-2xl border border-gray-800 bg-gray-900 p-5 text-left transition hover:-translate-y-1 hover:border-blue-500/40 hover:bg-gray-900/80"
          >
            <div class="flex items-center justify-between">
              <div
                class="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="1.8"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M4 7h16M4 7l2-3h12l2 3M5 7v13h14V7M9 11h6"
                  />
                </svg>
              </div>

              <span class="text-gray-600 transition group-hover:text-blue-400">
                →
              </span>
            </div>

            <p class="mt-5 text-3xl font-bold text-white">
              {{ projects.length }}
            </p>

            <p class="mt-1 text-sm text-gray-400">
              Projects
            </p>
          </button>

          <!-- Skills -->
          <button
            @click="openPage('/admin/skills')"
            class="group rounded-2xl border border-gray-800 bg-gray-900 p-5 text-left transition hover:-translate-y-1 hover:border-cyan-500/40 hover:bg-gray-900/80"
          >
            <div class="flex items-center justify-between">
              <div
                class="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400"
              >
                <span class="text-lg font-bold">S</span>
              </div>

              <span class="text-gray-600 transition group-hover:text-cyan-400">
                →
              </span>
            </div>

            <p class="mt-5 text-3xl font-bold text-white">
              {{ skills.length }}
            </p>

            <p class="mt-1 text-sm text-gray-400">
              Skills
            </p>
          </button>

          <!-- Messages -->
          <button
            @click="openPage('/admin/messages')"
            class="group rounded-2xl border border-gray-800 bg-gray-900 p-5 text-left transition hover:-translate-y-1 hover:border-violet-500/40 hover:bg-gray-900/80"
          >
            <div class="flex items-center justify-between">
              <div
                class="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-500/10 text-violet-400"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="1.8"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7A8.38 8.38 0 014 11.5a8.5 8.5 0 0117 0z"
                  />
                </svg>
              </div>

              <span class="text-gray-600 transition group-hover:text-violet-400">
                →
              </span>
            </div>

            <p class="mt-5 text-3xl font-bold text-white">
              {{ messages.length }}
            </p>

            <p class="mt-1 text-sm text-gray-400">
              Messages
            </p>
          </button>

          <!-- Unread -->
          <button
            @click="openPage('/admin/messages')"
            class="group rounded-2xl border border-gray-800 bg-gray-900 p-5 text-left transition hover:-translate-y-1 hover:border-orange-500/40 hover:bg-gray-900/80"
          >
            <div class="flex items-center justify-between">
              <div
                class="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-500/10 text-orange-400"
              >
                !
              </div>

              <span class="text-gray-600 transition group-hover:text-orange-400">
                →
              </span>
            </div>

            <p class="mt-5 text-3xl font-bold text-white">
              {{ unreadMessages }}
            </p>

            <p class="mt-1 text-sm text-gray-400">
              Unread Messages
            </p>
          </button>
        </section>

        <!-- =======================================
             CHARTS
        ======================================== -->
        <section class="grid grid-cols-1 gap-6 xl:grid-cols-2">

          <!-- Content chart -->
          <div
            class="rounded-2xl border border-gray-800 bg-gray-900 p-6 md:p-7"
          >
            <div class="flex items-start justify-between">
              <div>
                <h2 class="text-lg font-semibold text-white">
                  Content Overview
                </h2>

                <p class="mt-1 text-sm text-gray-500">
                  Your portfolio content distribution
                </p>
              </div>

              <div
                class="rounded-xl bg-blue-500/10 px-3 py-2 text-xs font-medium text-blue-400"
              >
                {{ totalContent }} Total
              </div>
            </div>

            <div class="mt-8 space-y-5">
              <div
                v-for="bar in contentBars"
                :key="bar.label"
              >
                <div class="mb-2 flex items-center justify-between text-sm">
                  <span class="text-gray-400">
                    {{ bar.label }}
                  </span>

                  <span class="font-semibold text-white">
                    {{ bar.value }}
                  </span>
                </div>

                <div class="h-3 overflow-hidden rounded-full bg-gray-800">
                  <div
                    :class="bar.color"
                    class="h-full rounded-full transition-all duration-700"
                    :style="{
                      width: `${Math.max(
                        (bar.value / maxContentValue) * 100,
                        bar.value > 0 ? 8 : 0
                      )}%`,
                    }"
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Message chart -->
          <div
            class="rounded-2xl border border-gray-800 bg-gray-900 p-6 md:p-7"
          >
            <div>
              <h2 class="text-lg font-semibold text-white">
                Message Overview
              </h2>

              <p class="mt-1 text-sm text-gray-500">
                Read and unread contact messages
              </p>
            </div>

            <div class="mt-8 flex flex-col items-center justify-center">
              <!-- Donut -->
              <div
                class="relative flex h-48 w-48 items-center justify-center rounded-full"
                :style="{
                  background: `conic-gradient(
                    rgb(34 197 94) ${readPercentage}%,
                    rgb(139 92 246) ${readPercentage}% ${readPercentage + unreadPercentage}%,
                    rgb(31 41 55) ${readPercentage + unreadPercentage}% 100%
                  )`,
                }"
              >
                <div
                  class="flex h-32 w-32 flex-col items-center justify-center rounded-full bg-gray-900"
                >
                  <span class="text-3xl font-bold text-white">
                    {{ messages.length }}
                  </span>

                  <span class="text-xs text-gray-500">
                    Total
                  </span>
                </div>
              </div>

              <div
                class="mt-8 grid w-full max-w-md grid-cols-2 gap-4"
              >
                <div
                  class="rounded-xl border border-gray-800 bg-gray-950 p-4"
                >
                  <div class="flex items-center gap-2">
                    <span class="h-2.5 w-2.5 rounded-full bg-green-500"></span>

                    <span class="text-sm text-gray-400">
                      Read
                    </span>
                  </div>

                  <p class="mt-2 text-2xl font-bold text-white">
                    {{ readMessages }}
                  </p>
                </div>

                <div
                  class="rounded-xl border border-gray-800 bg-gray-950 p-4"
                >
                  <div class="flex items-center gap-2">
                    <span class="h-2.5 w-2.5 rounded-full bg-violet-500"></span>

                    <span class="text-sm text-gray-400">
                      Unread
                    </span>
                  </div>

                  <p class="mt-2 text-2xl font-bold text-white">
                    {{ unreadMessages }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- =======================================
             QUICK MANAGEMENT
        ======================================== -->
        <section>
          <div class="mb-5">
            <h2 class="text-xl font-semibold text-white">
              Quick Management
            </h2>

            <p class="mt-1 text-sm text-gray-500">
              Quickly access every section of your admin panel.
            </p>
          </div>

          <div
            class="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"
          >
            <!-- Dashboard -->
            <button
              @click="openPage('/admin')"
              class="group rounded-2xl border border-blue-500/30 bg-blue-500/5 p-5 text-left transition hover:-translate-y-1 hover:border-blue-500/60 hover:bg-blue-500/10"
            >
              <div
                class="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="1.8"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M4 13h6V4H4v9zm10 7h6v-9h-6v9zM4 20h6v-3H4v3zm10-16v3h6V4h-6z"
                  />
                </svg>
              </div>

              <p class="mt-4 font-semibold text-white">
                Dashboard
              </p>

              <p class="mt-1 text-xs text-gray-500">
                Overview
              </p>
            </button>

            <!-- Profile -->
            <button
              @click="openPage('/admin/profile')"
              class="group rounded-2xl border border-gray-800 bg-gray-900 p-5 text-left transition hover:-translate-y-1 hover:border-blue-500/40"
            >
              <div
                class="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400"
              >
                👤
              </div>

              <p class="mt-4 font-semibold text-white">
                Profile
              </p>

              <p class="mt-1 text-xs text-gray-500">
                Personal details
              </p>
            </button>

            <!-- Skills -->
            <button
              @click="openPage('/admin/skills')"
              class="group rounded-2xl border border-gray-800 bg-gray-900 p-5 text-left transition hover:-translate-y-1 hover:border-cyan-500/40"
            >
              <div
                class="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400"
              >
                🛠
              </div>

              <p class="mt-4 font-semibold text-white">
                Skills
              </p>

              <p class="mt-1 text-xs text-gray-500">
                Technical skills
              </p>
            </button>

            <!-- Education -->
            <button
              @click="openPage('/admin/education')"
              class="group rounded-2xl border border-gray-800 bg-gray-900 p-5 text-left transition hover:-translate-y-1 hover:border-violet-500/40"
            >
              <div
                class="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-500/10 text-violet-400"
              >
                🎓
              </div>

              <p class="mt-4 font-semibold text-white">
                Education
              </p>

              <p class="mt-1 text-xs text-gray-500">
                Academic history
              </p>
            </button>

            <!-- Experience -->
            <button
              @click="openPage('/admin/experience')"
              class="group rounded-2xl border border-gray-800 bg-gray-900 p-5 text-left transition hover:-translate-y-1 hover:border-emerald-500/40"
            >
              <div
                class="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400"
              >
                💼
              </div>

              <p class="mt-4 font-semibold text-white">
                Experience
              </p>

              <p class="mt-1 text-xs text-gray-500">
                Work experience
              </p>
            </button>

            <!-- Projects -->
            <button
              @click="openPage('/admin/projects')"
              class="group rounded-2xl border border-gray-800 bg-gray-900 p-5 text-left transition hover:-translate-y-1 hover:border-orange-500/40"
            >
              <div
                class="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-500/10 text-orange-400"
              >
                💻
              </div>

              <p class="mt-4 font-semibold text-white">
                Projects
              </p>

              <p class="mt-1 text-xs text-gray-500">
                Portfolio projects
              </p>
            </button>

            <!-- Interests -->
            <button
              @click="openPage('/admin/interests')"
              class="group rounded-2xl border border-gray-800 bg-gray-900 p-5 text-left transition hover:-translate-y-1 hover:border-pink-500/40"
            >
              <div
                class="flex h-11 w-11 items-center justify-center rounded-xl bg-pink-500/10 text-pink-400"
              >
                ❤️
              </div>

              <p class="mt-4 font-semibold text-white">
                Interests
              </p>

              <p class="mt-1 text-xs text-gray-500">
                Personal interests
              </p>
            </button>

            <!-- Messages -->
            <button
              @click="openPage('/admin/messages')"
              class="group relative rounded-2xl border border-gray-800 bg-gray-900 p-5 text-left transition hover:-translate-y-1 hover:border-purple-500/40"
            >
              <div
                class="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400"
              >
                💬
              </div>

              <span
                v-if="unreadMessages > 0"
                class="absolute right-4 top-4 flex h-6 min-w-6 items-center justify-center rounded-full bg-red-500 px-2 text-xs font-bold text-white"
              >
                {{ unreadMessages }}
              </span>

              <p class="mt-4 font-semibold text-white">
                Messages
              </p>

              <p class="mt-1 text-xs text-gray-500">
                Contact messages
              </p>
            </button>
          </div>
        </section>

        <!-- =======================================
             RECENT DATA
        ======================================== -->
        <section class="grid grid-cols-1 gap-6 xl:grid-cols-2">

          <!-- Recent Messages -->
          <div
            class="overflow-hidden rounded-2xl border border-gray-800 bg-gray-900"
          >
            <div
              class="flex items-center justify-between border-b border-gray-800 p-6"
            >
              <div>
                <h2 class="font-semibold text-white">
                  Recent Messages
                </h2>

                <p class="mt-1 text-xs text-gray-500">
                  Latest messages from visitors
                </p>
              </div>

              <button
                @click="openPage('/admin/messages')"
                class="text-sm font-medium text-blue-400 transition hover:text-blue-300"
              >
                View all
              </button>
            </div>

            <div
              v-if="recentMessages.length === 0"
              class="p-8 text-center text-sm text-gray-500"
            >
              No messages yet.
            </div>

            <div v-else>
              <div
                v-for="message in recentMessages"
                :key="message.id"
                class="flex gap-4 border-b border-gray-800 p-5 last:border-b-0"
              >
                <div
                  class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-sm font-semibold text-blue-400"
                >
                  {{ message.name.charAt(0).toUpperCase() }}
                </div>

                <div class="min-w-0 flex-1">
                  <div class="flex items-start justify-between gap-3">
                    <div class="min-w-0">
                      <p class="truncate text-sm font-medium text-white">
                        {{ message.name }}
                      </p>

                      <p class="truncate text-xs text-gray-500">
                        {{ message.email }}
                      </p>
                    </div>

                    <span
                      class="shrink-0 text-xs text-gray-600"
                    >
                      {{ formatDate(message.created_at) }}
                    </span>
                  </div>

                  <p class="mt-2 truncate text-sm font-medium text-gray-300">
                    {{ message.subject }}
                  </p>

                  <p class="mt-1 text-xs leading-5 text-gray-500">
                    {{ truncateMessage(message.message) }}
                  </p>

                  <span
                    class="mt-3 inline-flex rounded-full px-2.5 py-1 text-[10px] font-medium"
                    :class="
                      message.is_read
                        ? 'bg-green-500/10 text-green-400'
                        : 'bg-violet-500/10 text-violet-400'
                    "
                  >
                    {{ message.is_read ? "Read" : "Unread" }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Recent Projects -->
          <div
            class="overflow-hidden rounded-2xl border border-gray-800 bg-gray-900"
          >
            <div
              class="flex items-center justify-between border-b border-gray-800 p-6"
            >
              <div>
                <h2 class="font-semibold text-white">
                  Projects
                </h2>

                <p class="mt-1 text-xs text-gray-500">
                  Portfolio projects
                </p>
              </div>

              <button
                @click="openPage('/admin/projects')"
                class="text-sm font-medium text-blue-400 transition hover:text-blue-300"
              >
                Manage
              </button>
            </div>

            <div
              v-if="recentProjects.length === 0"
              class="p-8 text-center text-sm text-gray-500"
            >
              No projects yet.
            </div>

            <div v-else>
              <div
                v-for="project in recentProjects"
                :key="project.id"
                class="flex items-center gap-4 border-b border-gray-800 p-5 last:border-b-0"
              >
                <div
                  class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400"
                >
                  &lt;/&gt;
                </div>

                <div class="min-w-0 flex-1">
                  <h3 class="truncate text-sm font-semibold text-white">
                    {{ project.title }}
                  </h3>

                  <p class="mt-1 truncate text-xs text-gray-500">
                    {{ project.tech || "No technologies listed" }}
                  </p>
                </div>

                <button
                  @click="openPage('/admin/projects')"
                  class="shrink-0 rounded-lg border border-gray-700 px-3 py-2 text-xs text-gray-400 transition hover:border-blue-500 hover:text-blue-400"
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  </div>
</template>
```
This is designed to drop directly into the admin layout you already created. It uses your existing `/api/...` endpoints and does **not** add another navigation bar or logout button—the `AdminSidebar` handles that.