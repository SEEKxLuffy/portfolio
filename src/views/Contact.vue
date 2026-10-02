<script setup lang="ts">
import { ref, onMounted } from "vue";

interface Profile {
  email: string;
  phone: string;
  location: string;
  github: string;
  linkedin: string;
}

const profile = ref<Profile | null>(null);

const form = ref({
  name: "",
  email: "",
  subject: "",
  message: "",
});

const sending = ref(false);
const successMessage = ref("");
const errorMessage = ref("");

const fetchProfile = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/profile");

    if (!response.ok) {
      throw new Error("Failed to fetch profile");
    }

    profile.value = await response.json();
  } catch (error) {
    console.error("Error fetching profile:", error);
  }
};

const sendMessage = async () => {
  successMessage.value = "";
  errorMessage.value = "";

  if (!form.value.name.trim()) {
    errorMessage.value = "Please enter your name.";
    return;
  }

  if (!form.value.email.trim()) {
    errorMessage.value = "Please enter your email.";
    return;
  }

  if (!form.value.message.trim()) {
    errorMessage.value = "Please enter a message.";
    return;
  }

  sending.value = true;

  try {
    const response = await fetch("http://localhost:3000/api/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: form.value.name,
        email: form.value.email,
        subject: form.value.subject,
        message: form.value.message,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to send message.");
    }

    successMessage.value =
      "Your message has been sent successfully. Thank you!";

    form.value = {
      name: "",
      email: "",
      subject: "",
      message: "",
    };
  } catch (error) {
    console.error("Error sending message:", error);

    if (error instanceof Error) {
      errorMessage.value = error.message;
    } else {
      errorMessage.value = "Something went wrong. Please try again.";
    }
  } finally {
    sending.value = false;
  }
};

onMounted(fetchProfile);
</script>

<template>
  <section class="min-h-screen bg-gray-950 px-6 py-24 text-white">
    <div class="mx-auto max-w-6xl">

      <!-- HEADER -->
      <div class="mb-16 text-center">
        <p
          class="text-sm font-semibold uppercase tracking-[0.3em] text-blue-500"
        >
          Contact
        </p>

        <h1 class="mt-4 text-4xl font-bold md:text-6xl">
          Let's Work Together
        </h1>

        <p class="mx-auto mt-5 max-w-2xl text-lg text-gray-400">
          Have a project, opportunity, or just want to say hello?
          Feel free to get in touch.
        </p>
      </div>

      <div class="grid grid-cols-1 gap-10 lg:grid-cols-2">

        <!-- CONTACT INFO -->
        <div class="space-y-5">

          <!-- EMAIL -->
          <div
            class="rounded-2xl border border-gray-800 bg-gray-900 p-7"
          >
            <p class="text-sm uppercase tracking-wider text-gray-500">
              Email
            </p>

            <p class="mt-2 break-all text-lg font-semibold">
              {{ profile?.email || "Email not available" }}
            </p>
          </div>

          <!-- PHONE -->
          <div
            class="rounded-2xl border border-gray-800 bg-gray-900 p-7"
          >
            <p class="text-sm uppercase tracking-wider text-gray-500">
              Phone
            </p>

            <p class="mt-2 text-lg font-semibold">
              {{ profile?.phone || "Phone not available" }}
            </p>
          </div>

          <!-- LOCATION -->
          <div
            class="rounded-2xl border border-gray-800 bg-gray-900 p-7"
          >
            <p class="text-sm uppercase tracking-wider text-gray-500">
              Location
            </p>

            <p class="mt-2 text-lg font-semibold">
              {{ profile?.location || "Nepal" }}
            </p>
          </div>

          <!-- SOCIAL LINKS -->
          <div class="flex gap-4 pt-2">

            <a
              v-if="profile?.github"
              :href="profile.github"
              target="_blank"
              rel="noopener noreferrer"
              class="rounded-lg border border-gray-700 px-5 py-3 transition hover:border-blue-500"
            >
              GitHub
            </a>

            <a
              v-if="profile?.linkedin"
              :href="profile.linkedin"
              target="_blank"
              rel="noopener noreferrer"
              class="rounded-lg border border-gray-700 px-5 py-3 transition hover:border-blue-500"
            >
              LinkedIn
            </a>

          </div>
        </div>

        <!-- FORM -->
        <div
          class="rounded-2xl border border-gray-800 bg-gray-900 p-8"
        >
          <form
            class="space-y-6"
            @submit.prevent="sendMessage"
          >

            <!-- NAME -->
            <div>
              <label class="mb-2 block text-gray-300">
                Name
              </label>

              <input
                v-model="form.name"
                type="text"
                placeholder="Your name"
                required
                class="w-full rounded-lg border border-gray-800 bg-gray-950 px-4 py-3 text-white outline-none transition focus:border-blue-500"
              />
            </div>

            <!-- EMAIL -->
            <div>
              <label class="mb-2 block text-gray-300">
                Email
              </label>

              <input
                v-model="form.email"
                type="email"
                placeholder="your@email.com"
                required
                class="w-full rounded-lg border border-gray-800 bg-gray-950 px-4 py-3 text-white outline-none transition focus:border-blue-500"
              />
            </div>

            <!-- SUBJECT -->
            <div>
              <label class="mb-2 block text-gray-300">
                Subject
              </label>

              <input
                v-model="form.subject"
                type="text"
                placeholder="What is this about?"
                class="w-full rounded-lg border border-gray-800 bg-gray-950 px-4 py-3 text-white outline-none transition focus:border-blue-500"
              />
            </div>

            <!-- MESSAGE -->
            <div>
              <label class="mb-2 block text-gray-300">
                Message
              </label>

              <textarea
                v-model="form.message"
                rows="6"
                placeholder="Write your message..."
                required
                class="w-full resize-none rounded-lg border border-gray-800 bg-gray-950 px-4 py-3 text-white outline-none transition focus:border-blue-500"
              ></textarea>
            </div>

            <!-- SUCCESS -->
            <div
              v-if="successMessage"
              class="rounded-lg border border-green-500/20 bg-green-500/10 px-4 py-3 text-sm text-green-400"
            >
              {{ successMessage }}
            </div>

            <!-- ERROR -->
            <div
              v-if="errorMessage"
              class="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400"
            >
              {{ errorMessage }}
            </div>

            <!-- SUBMIT -->
            <button
              type="submit"
              :disabled="sending"
              class="w-full rounded-lg bg-blue-600 py-3 font-semibold transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {{ sending ? "Sending..." : "Send Message" }}
            </button>

          </form>
        </div>

      </div>
    </div>
  </section>
</template>