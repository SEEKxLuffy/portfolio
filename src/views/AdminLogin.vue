
<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const email = ref("");
const password = ref("");
const showPassword = ref(false);
const errorMessage = ref("");
const isLoading = ref(false);

const login = async () => {
  errorMessage.value = "";

  if (!email.value.trim() || !password.value) {
    errorMessage.value = "Please enter your email and password.";
    return;
  }

  isLoading.value = true;

  const adminEmail = "admin@gmail.com";
  const adminPassword = "admin123";

  await new Promise((resolve) => setTimeout(resolve, 400));

  if (
    email.value.trim() !== adminEmail ||
    password.value !== adminPassword
  ) {
    errorMessage.value = "Invalid email or password.";
    isLoading.value = false;
    return;
  }

  localStorage.setItem("adminLoggedIn", "true");

  await router.push("/admin");

  isLoading.value = false;
};
</script>

<template>
  <main
    class="flex min-h-screen items-center justify-center bg-gray-950 px-4 py-10 text-white"
  >
    <!-- Background glow -->
    <div
      class="pointer-events-none fixed left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-3xl"
    ></div>

    <!-- Login Card -->
    <div
      class="relative w-full max-w-md overflow-hidden rounded-2xl border border-gray-800 bg-gray-900/90 p-6 shadow-2xl shadow-black/30 backdrop-blur-sm sm:p-8"
    >
      <!-- Top accent -->
      <div
        class="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-transparent via-blue-500 to-transparent"
      ></div>

      <!-- Header -->
      <div class="mb-8 text-center">
        <div
          class="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-blue-500/20 bg-blue-500/10"
        >
          <span class="text-2xl font-bold text-blue-400">
            M
          </span>
        </div>

        <h1 class="mt-5 text-2xl font-bold sm:text-3xl">
          Admin Login
        </h1>

        <p class="mt-2 text-sm text-gray-500">
          Sign in to manage your portfolio
        </p>
      </div>

      <!-- Form -->
      <form @submit.prevent="login" class="space-y-5">

        <!-- Email -->
        <div>
          <label
            for="email"
            class="mb-2 block text-sm font-medium text-gray-300"
          >
            Email
          </label>

          <input
            id="email"
            v-model="email"
            type="email"
            autocomplete="email"
            placeholder="admin@gmail.com"
            class="w-full rounded-xl border border-gray-700 bg-gray-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
          />
        </div>

        <!-- Password -->
        <div>
          <label
            for="password"
            class="mb-2 block text-sm font-medium text-gray-300"
          >
            Password
          </label>

          <!-- Password wrapper -->
          <div class="relative">
            <input
              id="password"
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              autocomplete="current-password"
              placeholder="Enter your password"
              class="w-full rounded-xl border border-gray-700 bg-gray-950 px-4 py-3 pr-12 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
            />

            <!-- Eye button -->
            <button
              type="button"
              @click="showPassword = !showPassword"
              class="absolute right-0 top-0 flex h-full w-12 items-center justify-center text-gray-500 transition hover:text-blue-400"
              :aria-label="
                showPassword ? 'Hide password' : 'Show password'
              "
            >
              <!-- Eye open -->
              <svg
                v-if="!showPassword"
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
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7Z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>

              <!-- Eye closed -->
              <svg
                v-else
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
                  d="M3.98 8.223A10.477 10.477 0 0 0 2.458 12C3.732 16.057 7.523 19 12 19c1.49 0 2.89-.312 4.16-.873"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6.228 6.228A10.451 10.451 0 0 1 12 5c4.477 0 8.268 2.943 9.542 7a10.505 10.505 0 0 1-4.132 5.411"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6.228 6.228 3 3m3.228 3.228 4.07 4.07m4.07 4.07 3.07 3.07M14.37 14.37A3 3 0 0 1 9.63 9.63"
                />
              </svg>
            </button>
          </div>
        </div>

        <!-- Error -->
        <div
          v-if="errorMessage"
          class="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3"
        >
          <p class="text-sm text-red-400">
            {{ errorMessage }}
          </p>
        </div>

        <!-- Login Button -->
        <button
          type="submit"
          :disabled="isLoading"
          class="w-full rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/20 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <span v-if="!isLoading">
            Login to Dashboard
          </span>

          <span v-else class="flex items-center justify-center gap-2">
            <span
              class="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"
            ></span>
            Signing in...
          </span>
        </button>
      </form>

      <!-- Back to portfolio -->
      <div class="mt-7 text-center">
        <router-link
          to="/"
          class="text-sm text-gray-500 transition hover:text-blue-400"
        >
          ← Back to portfolio
        </router-link>
      </div>
    </div>
  </main>
</template>
