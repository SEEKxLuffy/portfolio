<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();

const openProfile = () => {
  router.push("/admin/profile");
};

const openSkills = () => {
  router.push("/admin/skills");
};

const openEducation = () => {
  router.push("/admin/education");
};

const openExperience = () => {
  router.push("/admin/experience");
};

const openProjects = () => {
  router.push("/admin/projects");
};

const openInterests = () => {
  router.push("/admin/interests");
};

const openMessages = () => {
  router.push("/admin/messages");
};

const logout = () => {
  localStorage.removeItem("adminLoggedIn");
  router.push("/admin/login");
};
</script>

<template>
  <div class="min-h-screen bg-gray-950 text-white p-8">
    <div class="max-w-6xl mx-auto">

      <div class="flex justify-between items-center mb-10">
        <div>
          <h1 class="text-4xl font-bold">Admin Dashboard</h1>
          <p class="text-gray-400 mt-2">
            Manage your portfolio content
          </p>
        </div>

        <button
          @click="logout"
          class="bg-red-600 hover:bg-red-700 px-5 py-2 rounded-lg"
        >
          Logout
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        <button
          @click="openProfile"
          class="bg-gray-900 border border-gray-800 hover:border-blue-500 p-6 rounded-xl text-left transition"
        >
          <h2 class="text-xl font-bold">Profile</h2>
          <p class="text-gray-400 mt-2">
            Manage your personal information.
          </p>
        </button>

        <button
          @click="openSkills"
          class="bg-gray-900 border border-gray-800 hover:border-blue-500 p-6 rounded-xl text-left transition"
        >
          <h2 class="text-xl font-bold">Skills</h2>
          <p class="text-gray-400 mt-2">
            Add, edit and delete your skills.
          </p>
        </button>

        <button
          @click="openEducation"
          class="bg-gray-900 border border-gray-800 hover:border-blue-500 p-6 rounded-xl text-left transition"
        >
          <h2 class="text-xl font-bold">Education</h2>
          <p class="text-gray-400 mt-2">
            Manage your education history.
          </p>
        </button>

        <button
          @click="openExperience"
          class="bg-gray-900 border border-gray-800 hover:border-blue-500 p-6 rounded-xl text-left transition"
        >
          <h2 class="text-xl font-bold">Experience</h2>
          <p class="text-gray-400 mt-2">
            Manage your work experience.
          </p>
        </button>

        <button
          @click="openProjects"
          class="bg-gray-900 border border-gray-800 hover:border-blue-500 p-6 rounded-xl text-left transition"
        >
          <h2 class="text-xl font-bold">Projects</h2>
          <p class="text-gray-400 mt-2">
            Manage your portfolio projects.
          </p>
        </button>

        <button
          @click="openInterests"
          class="bg-gray-900 border border-gray-800 hover:border-blue-500 p-6 rounded-xl text-left transition"
        >
          <h2 class="text-xl font-bold">Interests</h2>
          <p class="text-gray-400 mt-2">
            Manage your interests.
          </p>
        </button>

        <button
          @click="openMessages"
          class="bg-gray-900 border border-gray-800 hover:border-blue-500 p-6 rounded-xl text-left transition"
        >
          <h2 class="text-xl font-bold">Messages</h2>
          <p class="text-gray-400 mt-2">
            View and delete contact messages.
          </p>
        </button>

      </div>
    </div>
  </div>
</template>