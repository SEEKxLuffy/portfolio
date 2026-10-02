<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

interface Experience {
  id: number;
  job_title: string;
  company: string;
  start_date: string;
  end_date: string | null;
  description: string;
}

const experiences = ref<Experience[]>([]);

const company = ref("");
const jobTitle = ref("");
const startDate = ref("");
const endDate = ref("");
const description = ref("");

const editingExperienceId = ref<number | null>(null);

const loading = ref(true);
const saving = ref(false);

// ==============================
// LOAD EXPERIENCE
// ==============================

const loadExperience = async () => {
  try {
    const response = await fetch(
      "http://localhost:3000/api/experience"
    );

    if (!response.ok) {
      throw new Error("Failed to load experience");
    }

    experiences.value = await response.json();
  } catch (error) {
    console.error(error);
    alert("Failed to load experience.");
  } finally {
    loading.value = false;
  }
};

// ==============================
// SAVE EXPERIENCE
// ==============================

const saveExperience = async () => {
  if (!company.value.trim()) {
    alert("Please enter company name.");
    return;
  }

  if (!jobTitle.value.trim()) {
    alert("Please enter job title.");
    return;
  }

  saving.value = true;

  try {
    const experienceData = {
      company: company.value,
      job_title: jobTitle.value,
      start_date: startDate.value,
      end_date: endDate.value || null,
      description: description.value,
    };

    const method =
      editingExperienceId.value !== null
        ? "PUT"
        : "POST";

    const url =
      editingExperienceId.value !== null
        ? `http://localhost:3000/api/experience/${editingExperienceId.value}`
        : "http://localhost:3000/api/experience";

    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(experienceData),
    });

    if (!response.ok) {
      const errorData = await response.json();

      throw new Error(
        errorData.message || "Failed to save experience"
      );
    }

    alert(
      editingExperienceId.value !== null
        ? "Experience updated successfully!"
        : "Experience created successfully!"
    );

    clearForm();

    await loadExperience();
  } catch (error) {
    console.error(error);

    if (error instanceof Error) {
      alert(error.message);
    } else {
      alert("Failed to save experience.");
    }
  } finally {
    saving.value = false;
  }
};

// ==============================
// EDIT EXPERIENCE
// ==============================

const editExperience = (experience: Experience) => {
  editingExperienceId.value = experience.id;

  company.value = experience.company || "";
  jobTitle.value = experience.job_title || "";
  startDate.value = experience.start_date || "";
  endDate.value = experience.end_date || "";
  description.value = experience.description || "";

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

// ==============================
// DELETE EXPERIENCE
// ==============================

const deleteExperience = async (id: number) => {
  const confirmed = confirm(
    "Are you sure you want to delete this experience?"
  );

  if (!confirmed) {
    return;
  }

  try {
    const response = await fetch(
      `http://localhost:3000/api/experience/${id}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      const errorData = await response.json();

      throw new Error(
        errorData.message || "Failed to delete experience"
      );
    }

    alert("Experience deleted successfully!");

    await loadExperience();
  } catch (error) {
    console.error(error);

    if (error instanceof Error) {
      alert(error.message);
    } else {
      alert("Failed to delete experience.");
    }
  }
};

// ==============================
// CLEAR FORM
// ==============================

const clearForm = () => {
  company.value = "";
  jobTitle.value = "";
  startDate.value = "";
  endDate.value = "";
  description.value = "";

  editingExperienceId.value = null;
};

// ==============================
// BACK
// ==============================

const goBack = () => {
  router.push("/admin");
};

// ==============================
// INITIAL LOAD
// ==============================

onMounted(() => {
  loadExperience();
});
</script>

<template>
  <div class="min-h-screen w-full overflow-x-hidden bg-gray-950 text-white">

    <!-- HEADER -->
    <header class="border-b border-gray-800">
      <div class="mx-auto w-full max-w-5xl px-4 py-5 sm:px-6">

        <button
          @click="goBack"
          class="mb-5 text-gray-400 transition hover:text-white"
        >
          ← Back to Dashboard
        </button>

        <h1 class="text-2xl font-bold sm:text-3xl">
          Experience
        </h1>

        <p class="mt-2 text-sm text-gray-400 sm:text-base">
          Manage your professional experience.
        </p>

      </div>
    </header>

    <!-- MAIN -->
    <main class="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 sm:py-10">

      <!-- FORM -->
      <div
        class="mb-10 rounded-xl border border-gray-800 bg-gray-900 p-5 sm:p-6"
      >

        <h2 class="mb-6 text-xl font-semibold">
          {{
            editingExperienceId !== null
              ? "Edit Experience"
              : "Add Experience"
          }}
        </h2>

        <!-- COMPANY -->
        <div class="mb-5">
          <label class="mb-2 block text-sm text-gray-400">
            Company *
          </label>

          <input
            v-model="company"
            type="text"
            placeholder="Company Name"
            class="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 outline-none transition focus:border-blue-500"
          />
        </div>

        <!-- JOB TITLE -->
        <div class="mb-5">
          <label class="mb-2 block text-sm text-gray-400">
            Job Title *
          </label>

          <input
            v-model="jobTitle"
            type="text"
            placeholder="Frontend Developer Intern"
            class="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 outline-none transition focus:border-blue-500"
          />
        </div>

        <!-- DATES -->
        <div class="mb-5 grid grid-cols-1 gap-5 md:grid-cols-2">

          <div>
            <label class="mb-2 block text-sm text-gray-400">
              Start Date
            </label>

            <input
              v-model="startDate"
              type="date"
              class="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 outline-none transition focus:border-blue-500"
            />
          </div>

          <div>
            <label class="mb-2 block text-sm text-gray-400">
              End Date
            </label>

            <input
              v-model="endDate"
              type="date"
              class="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 outline-none transition focus:border-blue-500"
            />
          </div>

        </div>

        <!-- DESCRIPTION -->
        <div class="mb-6">
          <label class="mb-2 block text-sm text-gray-400">
            Description
          </label>

          <textarea
            v-model="description"
            rows="5"
            placeholder="Describe your responsibilities and experience..."
            class="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 outline-none transition focus:border-blue-500"
          ></textarea>
        </div>

        <!-- BUTTONS -->
        <div class="flex flex-col gap-3 sm:flex-row">

          <button
            @click="saveExperience"
            :disabled="saving"
            class="rounded-lg bg-blue-600 px-6 py-3 font-medium transition hover:bg-blue-700 disabled:bg-gray-700"
          >
            {{
              saving
                ? "Saving..."
                : editingExperienceId !== null
                  ? "Update Experience"
                  : "Add Experience"
            }}
          </button>

          <button
            v-if="editingExperienceId !== null"
            @click="clearForm"
            class="rounded-lg bg-gray-700 px-6 py-3 font-medium transition hover:bg-gray-600"
          >
            Cancel
          </button>

        </div>

      </div>

      <!-- EXPERIENCE LIST -->
      <h2 class="mb-5 text-xl font-semibold">
        Your Experience
      </h2>

      <!-- LOADING -->
      <div
        v-if="loading"
        class="text-gray-400"
      >
        Loading experience...
      </div>

      <!-- EMPTY -->
      <div
        v-else-if="experiences.length === 0"
        class="rounded-xl border border-gray-800 bg-gray-900 p-8 text-center text-gray-400"
      >
        No experience added yet.
      </div>

      <!-- LIST -->
      <div
        v-else
        class="grid grid-cols-1 gap-5 md:grid-cols-2"
      >

        <div
          v-for="experience in experiences"
          :key="experience.id"
          class="min-w-0 rounded-xl border border-gray-800 bg-gray-900 p-5 sm:p-6"
        >

          <!-- JOB TITLE -->
          <h3 class="break-words text-xl font-semibold">
            {{ experience.job_title }}
          </h3>

          <!-- COMPANY -->
          <p class="mt-2 break-words text-blue-400">
            {{ experience.company }}
          </p>

          <!-- DATE -->
          <p class="mt-2 text-sm text-gray-400">
            {{ experience.start_date || "Unknown" }}
            -
            {{ experience.end_date || "Present" }}
          </p>

          <!-- DESCRIPTION -->
          <p
            v-if="experience.description"
            class="mt-3 break-words text-sm leading-6 text-gray-400"
          >
            {{ experience.description }}
          </p>

          <!-- ACTIONS -->
          <div class="mt-6 flex flex-wrap gap-3">

            <button
              @click="editExperience(experience)"
              class="rounded-lg bg-yellow-600 px-4 py-2 text-sm transition hover:bg-yellow-700"
            >
              Edit
            </button>

            <button
              @click="deleteExperience(experience.id)"
              class="rounded-lg bg-red-600 px-4 py-2 text-sm transition hover:bg-red-700"
            >
              Delete
            </button>

          </div>

        </div>

      </div>

    </main>
  </div>
</template>