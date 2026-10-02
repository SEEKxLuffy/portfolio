<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

interface Message {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at: string;
}

const messages = ref<Message[]>([]);

const loading = ref(true);


// ==============================
// LOAD MESSAGES
// ==============================

const loadMessages = async () => {
  try {
    const response = await fetch(
      "http://localhost:3000/api/messages"
    );

    if (!response.ok) {
      throw new Error("Failed to load messages");
    }

    messages.value = await response.json();

  } catch (error) {
    console.error(error);
    alert("Failed to load messages.");

  } finally {
    loading.value = false;
  }
};


// ==============================
// DELETE MESSAGE
// ==============================

const deleteMessage = async (id: number) => {
  const confirmed = confirm(
    "Are you sure you want to delete this message?"
  );

  if (!confirmed) {
    return;
  }

  try {
    const response = await fetch(
      `http://localhost:3000/api/messages/${id}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      const errorData = await response.json();

      throw new Error(
        errorData.message || "Failed to delete message"
      );
    }

    alert("Message deleted successfully!");

    await loadMessages();

  } catch (error) {
    console.error(error);

    if (error instanceof Error) {
      alert(error.message);
    } else {
      alert("Failed to delete message.");
    }
  }
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
  loadMessages();
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
          ← Back to Dashboard
        </button>

        <h1 class="text-3xl font-bold">
          Messages
        </h1>

        <p class="text-gray-400 mt-2">
          View messages submitted through your portfolio.
        </p>

      </div>

    </header>


    <main class="max-w-5xl mx-auto px-6 py-10">

      <h2 class="text-xl font-semibold mb-5">
        Received Messages
      </h2>


      <div
        v-if="loading"
        class="text-gray-400"
      >
        Loading messages...
      </div>


      <div
        v-else-if="messages.length === 0"
        class="bg-gray-900 border border-gray-800 rounded-xl p-8 text-center text-gray-400"
      >
        No messages received yet.
      </div>


      <div
        v-else
        class="space-y-5"
      >

        <div
          v-for="message in messages"
          :key="message.id"
          class="bg-gray-900 border border-gray-800 rounded-xl p-6"
        >

          <div class="flex justify-between items-start gap-5">

            <div>

              <h3 class="text-xl font-semibold">
                {{ message.subject || "No Subject" }}
              </h3>

              <p class="text-blue-400 mt-2">
                {{ message.name }}
              </p>

              <p class="text-gray-400 text-sm mt-1">
                {{ message.email }}
              </p>

            </div>

            <button
              @click="deleteMessage(message.id)"
              class="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-sm"
            >
              Delete
            </button>

          </div>


          <div class="border-t border-gray-800 my-5"></div>


          <p class="text-gray-300 whitespace-pre-line">
            {{ message.message }}
          </p>


          <p
            v-if="message.created_at"
            class="text-gray-500 text-sm mt-5"
          >
            {{ message.created_at }}
          </p>

        </div>

      </div>

    </main>

  </div>
</template>