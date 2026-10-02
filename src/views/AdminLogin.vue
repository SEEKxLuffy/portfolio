<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const email = ref("");
const password = ref("");
const errorMessage = ref("");
const login = () => {
  errorMessage.value = "";

  if (!email.value || !password.value) {
    errorMessage.value = "Please enter your email and password.";
    return;
  }

  const adminEmail = "admin@gmail.com";
  const adminPassword = "admin123";

  if (
    email.value !== adminEmail ||
    password.value !== adminPassword
  ) {
    errorMessage.value = "Invalid email or password.";
    return;
  }

  localStorage.setItem("adminLoggedIn", "true");

router.push("/admin");
}
</script>

<template>
  <div class="admin-login">
    <form @submit.prevent="login" class="login-card">
      <h1>Admin Login</h1>

      <p>Manage your portfolio</p>

      <label for="email">
        Email
      </label>

      <input
        id="email"
        v-model="email"
        type="email"
        placeholder="Enter admin email"
      />

      <label for="password">
        Password
      </label>

      <input
        id="password"
        v-model="password"
        type="password"
        placeholder="Enter password"
      />

      <p v-if="errorMessage" class="error-message">
        {{ errorMessage }}
      </p>

      <button type="submit">
        Login
      </button>
    </form>
  </div>
</template>