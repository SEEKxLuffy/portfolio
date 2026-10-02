<script setup lang="ts">
import { API_URL } from "../config";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();


// ==============================
// PROJECT INTERFACE
// ==============================

interface Project {
  id: number;
  title: string;
  description: string;
  tech: string;
  github: string;
  live: string;
}


// ==============================
// PROJECT DATA
// ==============================

const projects = ref<Project[]>([]);

const title = ref("");
const description = ref("");
const tech = ref("");
const github = ref("");
const live = ref("");

const editingProjectId = ref<number | null>(null);

const loading = ref(true);
const saving = ref(false);


// ==============================
// LOAD PROJECTS
// ==============================

const loadProjects = async () => {
  try {
    const response = await fetch(
      `${API_URL}/api/projects`
    );

    if (!response.ok) {
      throw new Error("Failed to load projects");
    }

    projects.value = await response.json();

  } catch (error) {
    console.error(error);
    alert("Failed to load projects.");

  } finally {
    loading.value = false;
  }
};


// ==============================
// SAVE PROJECT
// ==============================

const saveProject = async () => {
  if (!title.value.trim()) {
    alert("Please enter a project title.");
    return;
  }

  saving.value = true;

  try {
    const projectData = {
      title: title.value,
      description: description.value,
      tech: tech.value,
      github: github.value,
      live: live.value,
    };

    const method =
      editingProjectId.value !== null
        ? "PUT"
        : "POST";

    const url =
      editingProjectId.value !== null
        ? `${API_URL}/api/projects/${editingProjectId.value}`
        : `${API_URL}/api/projects`;

    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(projectData),
    });

    if (!response.ok) {
      const errorData = await response.json();

      throw new Error(
        errorData.message || "Failed to save project"
      );
    }

    alert(
      editingProjectId.value !== null
        ? "Project updated successfully!"
        : "Project created successfully!"
    );

    clearForm();

    await loadProjects();

  } catch (error) {
    console.error(error);

    if (error instanceof Error) {
      alert(error.message);
    } else {
      alert("Failed to save project.");
    }

  } finally {
    saving.value = false;
  }
};


// ==============================
// EDIT PROJECT
// ==============================

const editProject = (project: Project) => {
  editingProjectId.value = project.id;

  title.value = project.title || "";
  description.value = project.description || "";
  tech.value = project.tech || "";
  github.value = project.github || "";
  live.value = project.live || "";

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};


// ==============================
// DELETE PROJECT
// ==============================

const deleteProject = async (id: number) => {
  const confirmed = confirm(
    "Are you sure you want to delete this project?"
  );

  if (!confirmed) {
    return;
  }

  try {
    const response = await fetch(
      `${API_URL}/api/projects/${id}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      const errorData = await response.json();

      throw new Error(
        errorData.message || "Failed to delete project"
      );
    }

    alert("Project deleted successfully!");

    await loadProjects();

  } catch (error) {
    console.error(error);

    if (error instanceof Error) {
      alert(error.message);
    } else {
      alert("Failed to delete project.");
    }
  }
};


// ==============================
// CLEAR FORM
// ==============================

const clearForm = () => {
  title.value = "";
  description.value = "";
  tech.value = "";
  github.value = "";
  live.value = "";

  editingProjectId.value = null;
};


// ==============================
// BACK TO DASHBOARD
// ==============================

const goBack = () => {
  router.push("/admin");
};


// ==============================
// INITIAL LOAD
// ==============================

onMounted(() => {
  loadProjects();
});
</script>


<template>
  <div class="min-h-screen bg-gray-950 text-white">

    <!-- HEADER -->
    <header class="border-b border-gray-800">

      <div class="max-w-5xl mx-auto px-6 py-5">

        <button
          @click="goBack"
          class="text-gray-400 hover:text-white transition mb-5"
        >
          â† Back to Dashboard
        </button>

        <h1 class="text-3xl font-bold">
          Projects
        </h1>

        <p class="text-gray-400 mt-2">
          Add, edit and manage your portfolio projects.
        </p>

      </div>

    </header>


    <!-- CONTENT -->
    <main class="max-w-5xl mx-auto px-6 py-10">

      <!-- FORM -->
      <div
        class="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-10"
      >

        <h2 class="text-xl font-semibold mb-6">
          {{
            editingProjectId !== null
              ? "Edit Project"
              : "Add Project"
          }}
        </h2>


        <!-- TITLE -->
        <div class="mb-5">

          <label class="block text-sm text-gray-400 mb-2">
            Project Title *
          </label>

          <input
            v-model="title"
            type="text"
            placeholder="My Portfolio Website"
            class="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
          />

        </div>


        <!-- DESCRIPTION -->
        <div class="mb-5">

          <label class="block text-sm text-gray-400 mb-2">
            Description
          </label>

          <textarea
            v-model="description"
            rows="5"
            placeholder="Describe your project..."
            class="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
          ></textarea>

        </div>


        <!-- TECHNOLOGIES -->
        <div class="mb-5">

          <label class="block text-sm text-gray-400 mb-2">
            Technologies
          </label>

          <input
            v-model="tech"
            type="text"
            placeholder="Vue, TypeScript, PostgreSQL"
            class="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
          />

        </div>


        <!-- GITHUB -->
        <div class="mb-5">

          <label class="block text-sm text-gray-400 mb-2">
            GitHub URL
          </label>

          <input
            v-model="github"
            type="text"
            placeholder="https://github.com/username/project"
            class="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
          />

        </div>


        <!-- LIVE -->
        <div class="mb-6">

          <label class="block text-sm text-gray-400 mb-2">
            Live Project URL
          </label>

          <input
            v-model="live"
            type="text"
            placeholder="https://example.com"
            class="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
          />

        </div>


        <!-- BUTTONS -->
        <div class="flex gap-3">

          <button
            @click="saveProject"
            :disabled="saving"
            class="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:cursor-not-allowed px-6 py-3 rounded-lg font-medium transition"
          >
            {{
              saving
                ? "Saving..."
                : editingProjectId !== null
                  ? "Update Project"
                  : "Add Project"
            }}
          </button>


          <button
            v-if="editingProjectId !== null"
            @click="clearForm"
            class="bg-gray-700 hover:bg-gray-600 px-6 py-3 rounded-lg font-medium transition"
          >
            Cancel
          </button>

        </div>

      </div>


      <!-- PROJECT LIST -->
      <div>

        <h2 class="text-xl font-semibold mb-5">
          Your Projects
        </h2>


        <!-- LOADING -->
        <div
          v-if="loading"
          class="text-gray-400"
        >
          Loading projects...
        </div>


        <!-- EMPTY -->
        <div
          v-else-if="projects.length === 0"
          class="bg-gray-900 border border-gray-800 rounded-xl p-8 text-center text-gray-400"
        >
          No projects added yet.
        </div>


        <!-- PROJECT CARDS -->
        <div
          v-else
          class="grid md:grid-cols-2 gap-5"
        >

          <div
            v-for="project in projects"
            :key="project.id"
            class="bg-gray-900 border border-gray-800 rounded-xl p-6"
          >

            <h3 class="text-xl font-semibold">
              {{ project.title }}
            </h3>


            <p
              v-if="project.description"
              class="text-gray-400 text-sm mt-3"
            >
              {{ project.description }}
            </p>


            <p
              v-if="project.tech"
              class="text-blue-400 text-sm mt-3"
            >
              {{ project.tech }}
            </p>


            <!-- LINKS -->
            <div class="flex gap-4 mt-4">

              <a
                v-if="project.github"
                :href="project.github"
                target="_blank"
                rel="noopener noreferrer"
                class="text-gray-300 hover:text-white text-sm"
              >
                GitHub â†’
              </a>


              <a
                v-if="project.live"
                :href="project.live"
                target="_blank"
                rel="noopener noreferrer"
                class="text-blue-400 hover:text-blue-300 text-sm"
              >
                Live Project â†’
              </a>

            </div>


            <!-- ACTIONS -->
            <div class="flex gap-3 mt-6">

              <button
                @click="editProject(project)"
                class="bg-yellow-600 hover:bg-yellow-700 px-4 py-2 rounded-lg text-sm transition"
              >
                Edit
              </button>


              <button
                @click="deleteProject(project.id)"
                class="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-sm transition"
              >
                Delete
              </button>

            </div>

          </div>

        </div>

      </div>

    </main>

  </div>
</template>
