<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

interface Skill {
  id: number;
  name: string;
  category: string;
  level: string;
}

const skills = ref<Skill[]>([]);

const form = ref({
  name: "",
  category: "",
  level: "",
});

const editingId = ref<number | null>(null);
const loading = ref(false);
const saving = ref(false);
const message = ref("");
const errorMessage = ref("");

const categories = [
  "Frontend",
  "Backend",
  "Database",
  "Tools",
];

const levels = [
  "Beginner",
  "Intermediate",
  "Advanced",
  "Expert",
];

const loadSkills = async () => {
  loading.value = true;
  errorMessage.value = "";

  try {
    const response = await fetch(
      "http://localhost:3000/api/skills"
    );

    if (!response.ok) {
      throw new Error("Failed to load skills");
    }

    const data = await response.json();

    skills.value = Array.isArray(data) ? data : [];
  } catch (error) {
    console.error(error);
    errorMessage.value = "Failed to load skills.";
  } finally {
    loading.value = false;
  }
};

const saveSkill = async () => {
  if (!form.value.name.trim()) {
    alert("Please enter a skill name.");
    return;
  }

  if (!form.value.category) {
    alert("Please select a category.");
    return;
  }

  if (!form.value.level) {
    alert("Please select a skill level.");
    return;
  }

  saving.value = true;
  message.value = "";
  errorMessage.value = "";

  const isEditing = editingId.value !== null;

  try {
    const url = isEditing
      ? `http://localhost:3000/api/skills/${editingId.value}`
      : "http://localhost:3000/api/skills";

    const method = isEditing ? "PUT" : "POST";

    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form.value),
    });

    if (!response.ok) {
      throw new Error("Failed to save skill");
    }

    clearForm();
    await loadSkills();

    message.value = isEditing
      ? "Skill updated successfully."
      : "Skill added successfully.";
  } catch (error) {
    console.error(error);
    errorMessage.value = "Failed to save skill.";
  } finally {
    saving.value = false;
  }
};

const editSkill = (skill: Skill) => {
  editingId.value = skill.id;

  form.value = {
    name: skill.name,
    category: skill.category,
    level: skill.level,
  };

  message.value = "";
  errorMessage.value = "";

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

const deleteSkill = async (id: number) => {
  if (!confirm("Are you sure you want to delete this skill?")) {
    return;
  }

  try {
    const response = await fetch(
      `http://localhost:3000/api/skills/${id}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to delete skill");
    }

    await loadSkills();

    message.value = "Skill deleted successfully.";
  } catch (error) {
    console.error(error);
    errorMessage.value = "Failed to delete skill.";
  }
};

const clearForm = () => {
  editingId.value = null;

  form.value = {
    name: "",
    category: "",
    level: "",
  };
};

const goBack = () => {
  router.push("/admin");
};

onMounted(loadSkills);
</script>

<template>
  <main class="min-h-screen bg-slate-950 text-white">
    <div
      class="mx-auto max-w-6xl px-6 py-10 sm:px-8 lg:px-10"
    >

      <!-- HEADER -->
      <header
        class="flex flex-col gap-5 border-b border-white/[0.06] pb-8 sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <div class="flex items-center gap-3">
            <span class="h-px w-7 bg-blue-500"></span>

            <p
              class="text-xs font-semibold uppercase tracking-[0.25em] text-blue-400"
            >
              Admin
            </p>
          </div>

          <h1
            class="mt-3 text-3xl font-bold tracking-tight sm:text-4xl"
          >
            Manage Skills
          </h1>

          <p class="mt-2 text-sm text-slate-400 sm:text-base">
            Add, edit and organize the technologies in your portfolio.
          </p>
        </div>

        <button
          type="button"
          @click="goBack"
          class="inline-flex w-fit items-center gap-2 rounded-lg border border-white/[0.08] bg-slate-900 px-4 py-2.5 text-sm font-semibold text-slate-300 transition hover:border-blue-500/40 hover:text-white"
        >
          <span aria-hidden="true">←</span>
          Back to Dashboard
        </button>
      </header>

      <!-- FORM -->
      <section
        class="mt-8 rounded-2xl border border-white/[0.08] bg-slate-900/60 p-6 sm:p-8"
      >
        <div class="mb-6">
          <p
            class="text-xs font-semibold uppercase tracking-[0.2em] text-blue-400"
          >
            {{ editingId ? "Update Skill" : "New Skill" }}
          </p>

          <h2 class="mt-2 text-xl font-bold">
            {{ editingId ? "Edit skill details" : "Add a skill" }}
          </h2>
        </div>

        <form
          @submit.prevent="saveSkill"
          class="grid grid-cols-1 gap-5 md:grid-cols-3"
        >

          <!-- NAME -->
          <div>
            <label
              for="skill-name"
              class="mb-2 block text-sm font-medium text-slate-300"
            >
              Skill Name
            </label>

            <input
              id="skill-name"
              v-model="form.name"
              type="text"
              placeholder="e.g. Vue.js"
              class="w-full rounded-xl border border-white/[0.08] bg-slate-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500/60"
              required
            />
          </div>

          <!-- CATEGORY -->
          <div>
            <label
              for="skill-category"
              class="mb-2 block text-sm font-medium text-slate-300"
            >
              Category
            </label>

            <select
              id="skill-category"
              v-model="form.category"
              class="w-full rounded-xl border border-white/[0.08] bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-blue-500/60"
              required
            >
              <option value="" disabled>
                Select category
              </option>

              <option
                v-for="category in categories"
                :key="category"
                :value="category"
              >
                {{ category }}
              </option>
            </select>
          </div>

          <!-- LEVEL -->
          <div>
            <label
              for="skill-level"
              class="mb-2 block text-sm font-medium text-slate-300"
            >
              Experience Level
            </label>

            <select
              id="skill-level"
              v-model="form.level"
              class="w-full rounded-xl border border-white/[0.08] bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-blue-500/60"
              required
            >
              <option value="" disabled>
                Select level
              </option>

              <option
                v-for="level in levels"
                :key="level"
                :value="level"
              >
                {{ level }}
              </option>
            </select>
          </div>

          <!-- BUTTONS -->
          <div
            class="flex flex-wrap gap-3 md:col-span-3"
          >
            <button
              type="submit"
              :disabled="saving"
              class="rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {{
                saving
                  ? "Saving..."
                  : editingId
                  ? "Update Skill"
                  : "Add Skill"
              }}
            </button>

            <button
              v-if="editingId"
              type="button"
              @click="clearForm"
              class="rounded-xl border border-white/[0.08] bg-slate-800 px-6 py-3 text-sm font-semibold text-slate-300 transition hover:bg-slate-700 hover:text-white"
            >
              Cancel
            </button>
          </div>
        </form>
      </section>

      <!-- SUCCESS MESSAGE -->
      <div
        v-if="message"
        class="mt-5 rounded-xl border border-emerald-500/20 bg-emerald-500/5 px-4 py-3 text-sm text-emerald-400"
      >
        {{ message }}
      </div>

      <!-- ERROR MESSAGE -->
      <div
        v-if="errorMessage"
        class="mt-5 rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3 text-sm text-red-400"
      >
        {{ errorMessage }}
      </div>

      <!-- SKILLS -->
      <section class="mt-10">

        <div
          class="mb-6 flex items-end justify-between gap-4"
        >
          <div>
            <p
              class="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500"
            >
              Portfolio Skills
            </p>

            <h2 class="mt-2 text-2xl font-bold">
              Current Skills
            </h2>
          </div>

          <span
            class="rounded-lg border border-white/[0.08] bg-slate-900 px-3 py-2 text-xs font-semibold text-slate-400"
          >
            {{ skills.length }}
            {{ skills.length === 1 ? "skill" : "skills" }}
          </span>
        </div>

        <!-- LOADING -->
        <div
          v-if="loading"
          class="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3"
        >
          <div
            v-for="item in 6"
            :key="item"
            class="animate-pulse rounded-2xl border border-white/[0.08] bg-slate-900/60 p-6"
          >
            <div class="h-5 w-32 rounded bg-slate-800"></div>

            <div class="mt-4 h-4 w-24 rounded bg-slate-800"></div>

            <div class="mt-6 h-4 w-20 rounded bg-slate-800"></div>

            <div class="mt-6 flex gap-2">
              <div class="h-9 w-16 rounded-lg bg-slate-800"></div>
              <div class="h-9 w-20 rounded-lg bg-slate-800"></div>
            </div>
          </div>
        </div>

        <!-- EMPTY -->
        <div
          v-else-if="!skills.length"
          class="rounded-2xl border border-dashed border-white/[0.08] px-6 py-20 text-center"
        >
          <div
            class="mx-auto flex h-14 w-14 items-center justify-center rounded-xl border border-white/[0.08] bg-slate-900 text-xl text-blue-400"
          >
            &lt;/&gt;
          </div>

          <h3 class="mt-5 text-xl font-bold">
            No skills yet
          </h3>

          <p class="mt-2 text-sm text-slate-500">
            Add your first skill using the form above.
          </p>
        </div>

        <!-- SKILL CARDS -->
        <div
          v-else
          class="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3"
        >
          <article
            v-for="skill in skills"
            :key="skill.id"
            class="group rounded-2xl border border-white/[0.08] bg-slate-900/60 p-6 transition duration-300 hover:-translate-y-1 hover:border-blue-500/30 hover:bg-slate-900"
          >
            <div
              class="flex items-start justify-between gap-4"
            >
              <div class="min-w-0">
                <h3
                  class="break-words text-lg font-bold text-white transition group-hover:text-blue-400"
                >
                  {{ skill.name }}
                </h3>

                <p
                  class="mt-2 text-xs font-semibold uppercase tracking-[0.15em] text-slate-500"
                >
                  {{ skill.category }}
                </p>
              </div>

              <span
                class="shrink-0 rounded-lg border border-blue-500/20 bg-blue-500/10 px-2.5 py-1.5 text-xs font-medium text-blue-400"
              >
                {{ skill.level }}
              </span>
            </div>

            <div
              class="mt-6 flex gap-3 border-t border-white/[0.06] pt-5"
            >
              <button
                type="button"
                @click="editSkill(skill)"
                class="flex-1 rounded-lg border border-white/[0.08] bg-slate-800 px-4 py-2.5 text-sm font-semibold text-slate-300 transition hover:border-blue-500/40 hover:text-blue-400"
              >
                Edit
              </button>

              <button
                type="button"
                @click="deleteSkill(skill.id)"
                class="flex-1 rounded-lg border border-red-500/10 bg-red-500/5 px-4 py-2.5 text-sm font-semibold text-red-400 transition hover:border-red-500/30 hover:bg-red-500/10"
              >
                Delete
              </button>
            </div>
          </article>
        </div>
      </section>
    </div>
  </main>
</template>