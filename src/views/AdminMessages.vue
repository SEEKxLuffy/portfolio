<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

interface Message {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

const messages = ref<Message[]>([]);
const loading = ref(true);
const errorMessage = ref("");

const unreadCount = computed(() => {
  return messages.value.filter((message) => !message.is_read).length;
});

// ==============================
// LOAD MESSAGES
// ==============================

const loadMessages = async () => {
  loading.value = true;
  errorMessage.value = "";

  try {
    const response = await fetch(
      "http://localhost:3000/api/messages"
    );

    if (!response.ok) {
      throw new Error("Failed to load messages");
    }

    const data = await response.json();

    console.log("Messages received from backend:", data);

    messages.value = data;
  } catch (error) {
    console.error("Error loading messages:", error);

    errorMessage.value =
      error instanceof Error
        ? error.message
        : "Failed to load messages.";
  } finally {
    loading.value = false;
  }
};

// ==============================
// MARK AS READ
// ==============================

const markAsRead = async (message: Message) => {
  if (message.is_read) {
    return;
  }

  try {
    const response = await fetch(
      `http://localhost:3000/api/messages/${message.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          is_read: true,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to mark message as read");
    }

    message.is_read = true;
  } catch (error) {
    console.error("Error marking message as read:", error);
    alert("Failed to mark message as read.");
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
// FORMAT DATE
// ==============================

const formatDate = (date: string) => {
  if (!date) {
    return "";
  }

  return new Date(date).toLocaleString();
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
  <div class="min-h-screen bg-slate-950 text-white">

    <!-- HEADER -->
    <header
      class="border-b border-white/[0.08] bg-slate-950/90"
    >
      <div class="mx-auto max-w-6xl px-6 py-6">

        <button
          @click="goBack"
          class="mb-6 inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"
        >
          ← Back to Dashboard
        </button>

        <div
          class="flex flex-col justify-between gap-5 sm:flex-row sm:items-end"
        >
          <div>
            <p
              class="text-sm font-semibold uppercase tracking-[0.25em] text-blue-400"
            >
              Admin
            </p>

            <h1
              class="mt-2 text-3xl font-bold tracking-tight sm:text-4xl"
            >
              Messages
            </h1>

            <p class="mt-2 text-slate-400">
              Messages submitted through your portfolio.
            </p>
          </div>

          <button
            @click="loadMessages"
            class="rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:border-blue-500/30 hover:bg-blue-500/10 hover:text-white"
          >
            ↻ Refresh
          </button>
        </div>

      </div>
    </header>


    <!-- MAIN -->
    <main class="mx-auto max-w-6xl px-6 py-10">

      <!-- STATS -->
      <div
        class="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2"
      >

        <div
          class="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5"
        >
          <p
            class="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500"
          >
            Total Messages
          </p>

          <p class="mt-2 text-3xl font-bold">
            {{ messages.length }}
          </p>
        </div>

        <div
          class="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5"
        >
          <p
            class="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500"
          >
            Unread
          </p>

          <p class="mt-2 text-3xl font-bold text-blue-400">
            {{ unreadCount }}
          </p>
        </div>

      </div>


      <!-- ERROR -->
      <div
        v-if="errorMessage"
        class="mb-6 rounded-2xl border border-red-500/20 bg-red-500/10 p-5 text-red-300"
      >
        <p class="font-medium">
          {{ errorMessage }}
        </p>

        <button
          @click="loadMessages"
          class="mt-3 text-sm font-semibold text-red-200 underline"
        >
          Try again
        </button>
      </div>


      <!-- LOADING -->
      <div
        v-if="loading"
        class="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-10 text-center"
      >
        <div
          class="mx-auto h-7 w-7 animate-spin rounded-full border-2 border-slate-700 border-t-blue-500"
        ></div>

        <p class="mt-4 text-sm text-slate-400">
          Loading messages...
        </p>
      </div>


      <!-- EMPTY -->
      <div
        v-else-if="!errorMessage && messages.length === 0"
        class="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-12 text-center"
      >
        <div
          class="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/10 text-2xl"
        >
          ✉
        </div>

        <h2 class="mt-5 text-xl font-semibold">
          No messages yet
        </h2>

        <p class="mt-2 text-slate-400">
          Messages submitted through your contact form will appear here.
        </p>
      </div>


      <!-- MESSAGES -->
      <div
        v-else
        class="space-y-5"
      >

        <div
          v-for="message in messages"
          :key="message.id"
          @click="markAsRead(message)"
          class="group cursor-pointer rounded-2xl border bg-white/[0.03] p-6 transition duration-200 hover:bg-white/[0.05]"
          :class="
            message.is_read
              ? 'border-white/[0.08]'
              : 'border-blue-500/30 bg-blue-500/[0.04]'
          "
        >

          <!-- TOP -->
          <div
            class="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between"
          >

            <div class="min-w-0">

              <div class="flex flex-wrap items-center gap-3">

                <h2
                  class="break-words text-xl font-semibold text-white"
                >
                  {{ message.subject || "No Subject" }}
                </h2>

                <span
                  v-if="!message.is_read"
                  class="rounded-full border border-blue-500/20 bg-blue-500/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-blue-400"
                >
                  Unread
                </span>

                <span
                  v-else
                  class="rounded-full border border-white/[0.08] bg-white/[0.04] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-500"
                >
                  Read
                </span>

              </div>


              <div class="mt-3 flex flex-col gap-1">

                <p class="font-medium text-blue-400">
                  {{ message.name }}
                </p>

                <a
                  :href="`mailto:${message.email}`"
                  @click.stop
                  class="w-fit text-sm text-slate-400 transition hover:text-white"
                >
                  {{ message.email }}
                </a>

              </div>

            </div>


            <!-- DELETE -->
            <button
              @click.stop="deleteMessage(message.id)"
              class="shrink-0 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-2.5 text-sm font-medium text-red-400 transition hover:bg-red-500/20 hover:text-red-300"
            >
              Delete
            </button>

          </div>


          <!-- DIVIDER -->
          <div
            class="my-5 border-t border-white/[0.06]"
          ></div>


          <!-- MESSAGE -->
          <div>
            <p
              class="whitespace-pre-line break-words leading-7 text-slate-300"
            >
              {{ message.message }}
            </p>
          </div>


          <!-- DATE -->
          <div
            v-if="message.created_at"
            class="mt-6 flex items-center justify-between gap-4"
          >
            <p class="text-xs text-slate-500">
              {{ formatDate(message.created_at) }}
            </p>

            <p
              class="text-xs text-slate-600"
            >
              ID #{{ message.id }}
            </p>
          </div>

        </div>

      </div>

    </main>

  </div>
</template>