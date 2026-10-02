<script setup lang="ts">
import { API_URL } from "../config";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

interface Interest {
  id: number;
  name: string;
  description: string;
}

const interests = ref<Interest[]>([]);

const name = ref("");
const description = ref("");

const editingInterestId = ref<number | null>(null);

const loading = ref(true);
const saving = ref(false);


// ==============================
// LOAD INTERESTS
// ==============================

const loadInterests = async () => {
  try {
    const response = await fetch(
      `${API_URL}/api/interests`
    );

    if (!response.ok) {
      throw new Error("Failed to load interests");
    }

    interests.value = await response.json();

  } catch (error) {
    console.error(error);
    alert("Failed to load interests.");

  } finally {
    loading.value = false;
  }
};


// ==============================
// SAVE INTEREST
// ==============================

const saveInterest = async () => {
  if (!name.value.trim()) {
    alert("Please enter an interest.");
    return;
  }

  saving.value = true;

  try {
    const interestData = {
      name: name.value,
      description: description.value,
    };

    const method =
      editingInterestId.value !== null
        ? "PUT"
        : "POST";

    const url =
      editingInterestId.value !== null
        ? `${API_URL}/api/interests/${editingInterestId.value}`
        : `${API_URL}/api/interests`;

    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(interestData),
    });

    if (!response.ok) {
      const errorData = await response.json();

      throw new Error(
        errorData.message || "Failed to save interest"
      );
    }

    alert(
      editingInterestId.value !== null
        ? "Interest updated successfully!"
        : "Interest created successfully!"
    );

    clearForm();

    await loadInterests();

  } catch (error) {
    console.error(error);

    if (error instanceof Error) {
      alert(error.message);
    } else {
      alert("Failed to save interest.");
    }

  } finally {
    saving.value = false;
  }
};


// ==============================
// EDIT INTEREST
// ==============================

const editInterest = (interest: Interest) => {
  editingInterestId.value = interest.id;

  name.value = interest.name || "";
  description.value = interest.description || "";

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};


// ==============================
// DELETE INTEREST
// ==============================

const deleteInterest = async (id: number) => {
  const confirmed = confirm(
    "Are you sure you want to delete this interest?"
  );

  if (!confirmed) {
    return;
  }

  try {
    const response = await fetch(
      `${API_URL}/api/interests/${id}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      const errorData = await response.json();

      throw new Error(
        errorData.message || "Failed to delete interest"
      );
    }

    alert("Interest deleted successfully!");

    await loadInterests();

  } catch (error) {
    console.error(error);

    if (error instanceof Error) {
      alert(error.message);
    } else {
      alert("Failed to delete interest.");
    }
  }
};


// ==============================
// CLEAR FORM
// ==============================

const clearForm = () => {
  name.value = "";
  description.value = "";

  editingInterestId.value = null;
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
  loadInterests();
});
</script>


<template>
  <div class="min-h-screen bg-gray-950 text-white">

    <header class="border-b border-gray-800">
      <div class="max-w-5xl mx-auto px-6 py-5">

        <button
          @click="goBack"
          class="text-gray-400 hover:text-white transition mb-5"
        >
          â† Back to Dashboard
        </button>

        <h1 class="text-3xl font-bold">
          Interests
        </h1>

        <p class="text-gray-400 mt-2">
          Manage your personal interests.
        </p>

      </div>
    </header>


    <main class="max-w-5xl mx-auto px-6 py-10">

      <div
        class="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-10"
      >

        <h2 class="text-xl font-semibold mb-6">
          {{
            editingInterestId !== null
              ? "Edit Interest"
              : "Add Interest"
          }}
        </h2>


        <div class="mb-5">

          <label class="block text-sm text-gray-400 mb-2">
            Interest *
          </label>

          <input
            v-model="name"
            type="text"
            placeholder="Web Development"
            class="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
          />

        </div>


        <div class="mb-6">

          <label class="block text-sm text-gray-400 mb-2">
            Description
          </label>

          <textarea
            v-model="description"
            rows="4"
            placeholder="Tell something about this interest..."
            class="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
          ></textarea>

        </div>


        <div class="flex gap-3">

          <button
            @click="saveInterest"
            :disabled="saving"
            class="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 px-6 py-3 rounded-lg font-medium"
          >
            {{
              saving
                ? "Saving..."
                : editingInterestId !== null
                  ? "Update Interest"
                  : "Add Interest"
            }}
          </button>

          <button
            v-if="editingInterestId !== null"
            @click="clearForm"
            class="bg-gray-700 hover:bg-gray-600 px-6 py-3 rounded-lg font-medium"
          >
            Cancel
          </button>

        </div>

      </div>


      <h2 class="text-xl font-semibold mb-5">
        Your Interests
      </h2>


      <div v-if="loading" class="text-gray-400">
        Loading interests...
      </div>


      <div
        v-else-if="interests.length === 0"
        class="bg-gray-900 border border-gray-800 rounded-xl p-8 text-center text-gray-400"
      >
        No interests added yet.
      </div>


      <div
        v-else
        class="grid md:grid-cols-2 gap-5"
      >

        <div
          v-for="interest in interests"
          :key="interest.id"
          class="bg-gray-900 border border-gray-800 rounded-xl p-6"
        >

          <h3 class="text-xl font-semibold">
            {{ interest.name }}
          </h3>

          <p
            v-if="interest.description"
            class="text-gray-400 text-sm mt-3"
          >
            {{ interest.description }}
          </p>


          <div class="flex gap-3 mt-6">

            <button
              @click="editInterest(interest)"
              class="bg-yellow-600 hover:bg-yellow-700 px-4 py-2 rounded-lg text-sm"
            >
              Edit
            </button>

            <button
              @click="deleteInterest(interest.id)"
              class="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-sm"
            >
              Delete
            </button>

          </div>

        </div>

      </div>

    </main>

  </div>
</template>
