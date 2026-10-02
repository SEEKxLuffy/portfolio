```vue
<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { API_URL } from "../config";

const router = useRouter();

interface Education {
  id: number;
  institution: string;
  degree: string;
  field: string;
  start_year: string;
  end_year: string;
  description: string;
}

const educationList = ref<Education[]>([]);

const form = ref({
  institution: "",
  degree: "",
  field: "",
  start_year: "",
  end_year: "",
  description: "",
});

const editingId = ref<number | null>(null);
const loading = ref(false);
const saving = ref(false);
const message = ref("");

const loadEducation = async () => {
  loading.value = true;

  try {
    const response = await fetch(`${API_URL}/api/education`);

    if (!response.ok) {
      throw new Error("Failed to load education");
    }

    educationList.value = await response.json();
  } catch (error) {
    console.error(error);
    message.value = "Failed to load education.";
  } finally {
    loading.value = false;
  }
};

const saveEducation = async () => {
  if (!form.value.institution.trim()) {
    alert("Please enter institution.");
    return;
  }

  saving.value = true;
  message.value = "";

  try {
    const url = editingId.value
      ? `${API_URL}/api/education/${editingId.value}`
      : `${API_URL}/api/education`;

    const method = editingId.value ? "PUT" : "POST";

    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form.value),
    });

    if (!response.ok) {
      throw new Error("Failed to save education");
    }

    const wasEditing = editingId.value !== null;

    clearForm();
    await loadEducation();

    message.value = wasEditing
      ? "Education updated successfully."
      : "Education added successfully.";
  } catch (error) {
    console.error(error);
    message.value = "Failed to save education.";
  } finally {
    saving.value = false;
  }
};

const editEducation = (item: Education) => {
  editingId.value = item.id;

  form.value = {
    institution: item.institution,
    degree: item.degree,
    field: item.field,
    start_year: item.start_year,
    end_year: item.end_year,
    description: item.description,
  };
};

const deleteEducation = async (id: number) => {
  if (!confirm("Are you sure you want to delete this education record?")) {
    return;
  }

  try {
    const response = await fetch(
      `${API_URL}/api/education/${id}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to delete education");
    }

    await loadEducation();
    message.value = "Education deleted successfully.";
  } catch (error) {
    console.error(error);
    message.value = "Failed to delete education.";
  }
};

const clearForm = () => {
  editingId.value = null;

  form.value = {
    institution: "",
    degree: "",
    field: "",
    start_year: "",
    end_year: "",
    description: "",
  };
};

const goBack = () => {
  router.push("/admin");
};

onMounted(loadEducation);
</script>

<template>
  <div class="min-h-screen bg-gray-950 text-white p-8">
    <div class="max-w-6xl mx-auto">

      <div class="flex justify-between items-center mb-8">
        <div>
          <h1 class="text-3xl font-bold">Manage Education</h1>
          <p class="text-gray-400">
            Manage your education history.
          </p>
        </div>

        <button
          @click="goBack"
          class="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg"
        >
          Back
        </button>
      </div>

      <div class="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-8">

        <h2 class="text-xl font-bold mb-5">
          {{ editingId ? "Edit Education" : "Add Education" }}
        </h2>

        <form
          @submit.prevent="saveEducation"
          class="space-y-4"
        >

          <input
            v-model="form.institution"
            type="text"
            placeholder="Institution"
            class="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3"
            required
          />

          <input
            v-model="form.degree"
            type="text"
            placeholder="Degree"
            class="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3"
          />

          <input
            v-model="form.field"
            type="text"
            placeholder="Field of study"
            class="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3"
          />

          <div class="grid md:grid-cols-2 gap-4">

            <input
              v-model="form.start_year"
              type="text"
              placeholder="Start year"
              class="bg-gray-800 border border-gray-700 rounded-lg px-4 py-3"
            />

            <input
              v-model="form.end_year"
              type="text"
              placeholder="End year"
              class="bg-gray-800 border border-gray-700 rounded-lg px-4 py-3"
            />

          </div>

          <textarea
            v-model="form.description"
            rows="4"
            placeholder="Description"
            class="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3"
          ></textarea>

          <div class="flex gap-3">

            <button
              type="submit"
              :disabled="saving"
              class="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg"
            >
              {{
                saving
                  ? "Saving..."
                  : editingId
                    ? "Update Education"
                    : "Add Education"
              }}
            </button>

            <button
              v-if="editingId"
              type="button"
              @click="clearForm"
              class="bg-gray-700 hover:bg-gray-600 px-6 py-3 rounded-lg"
            >
              Cancel
            </button>

          </div>
        </form>
      </div>

      <p
        v-if="message"
        class="text-green-400 mb-5"
      >
        {{ message }}
      </p>

      <div
        v-if="loading"
        class="text-gray-400"
      >
        Loading education...
      </div>

      <div
        v-else
        class="grid md:grid-cols-2 gap-6"
      >

        <div
          v-for="item in educationList"
          :key="item.id"
          class="bg-gray-900 border border-gray-800 rounded-xl p-6"
        >

          <h3 class="text-xl font-bold">
            {{ item.institution }}
          </h3>

          <p class="text-blue-400 mt-2">
            {{ item.degree }}
          </p>

          <p class="text-gray-400">
            {{ item.field }}
          </p>

          <p class="text-gray-400 mt-2">
            {{ item.start_year }} - {{ item.end_year }}
          </p>

          <p class="text-gray-400 mt-4">
            {{ item.description }}
          </p>

          <div class="flex gap-3 mt-5">

            <button
              @click="editEducation(item)"
              class="bg-yellow-600 hover:bg-yellow-700 px-4 py-2 rounded-lg"
            >
              Edit
            </button>

            <button
              @click="deleteEducation(item.id)"
              class="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg"
            >
              Delete
            </button>

          </div>
        </div>

      </div>
    </div>
  </div>
</template>
```
