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
  <section
    class="relative min-h-screen overflow-hidden bg-slate-950 px-5 py-28 text-white sm:px-6 lg:py-32"
  >
    <!-- SUBTLE BACKGROUND GLOW -->
    <div
      class="pointer-events-none absolute left-1/2 top-20 h-72 w-72 -translate-x-1/2 rounded-full bg-blue-600/10 blur-3xl"
    ></div>

    <div class="relative mx-auto max-w-6xl">

      <!-- HEADER -->
      <div class="mx-auto mb-16 max-w-3xl text-center">

        <p
          class="text-xs font-semibold uppercase tracking-[0.3em] text-blue-400 sm:text-sm"
        >
          Get in touch
        </p>

        <h1
          class="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl"
        >
          Let's work together.
        </h1>

        <p
          class="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg"
        >
          Have a project, opportunity, or an idea you'd like to discuss?
          Send me a message and I'll get back to you.
        </p>

      </div>


      <!-- CONTENT -->
      <div class="grid grid-cols-1 gap-6 lg:grid-cols-[0.85fr_1.15fr]">

        <!-- LEFT SIDE -->
        <div class="flex flex-col gap-6">

          <!-- INTRO CARD -->
          <div
            class="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.03] p-7 sm:p-8"
          >
            <div
              class="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-blue-500/10 blur-3xl"
            ></div>

            <div class="relative">

              <div
                class="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-blue-500/20 bg-blue-500/10 text-blue-400"
              >
                ✦
              </div>

              <h2 class="text-2xl font-semibold">
                Let's connect
              </h2>

              <p class="mt-3 max-w-md text-sm leading-6 text-slate-400">
                I'm always open to discussing frontend development,
                interesting projects, collaboration, and new opportunities.
              </p>

            </div>
          </div>


          <!-- EMAIL -->
          <a
            v-if="profile?.email"
            :href="`mailto:${profile.email}`"
            class="group rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 transition duration-200 hover:border-blue-500/30 hover:bg-blue-500/[0.04]"
          >
            <div class="flex items-start gap-4">

              <div
                class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.04] text-blue-400 transition group-hover:border-blue-500/20 group-hover:bg-blue-500/10"
              >
                @
              </div>

              <div class="min-w-0">

                <p
                  class="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500"
                >
                  Email
                </p>

                <p
                  class="mt-1 break-all text-sm font-medium text-slate-200 transition group-hover:text-white sm:text-base"
                >
                  {{ profile.email }}
                </p>

              </div>

            </div>
          </a>


          <!-- PHONE -->
          <a
            v-if="profile?.phone"
            :href="`tel:${profile.phone}`"
            class="group rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 transition duration-200 hover:border-blue-500/30 hover:bg-blue-500/[0.04]"
          >
            <div class="flex items-start gap-4">

              <div
                class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.04] text-blue-400 transition group-hover:border-blue-500/20 group-hover:bg-blue-500/10"
              >
                ☎
              </div>

              <div>

                <p
                  class="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500"
                >
                  Phone
                </p>

                <p
                  class="mt-1 text-sm font-medium text-slate-200 transition group-hover:text-white sm:text-base"
                >
                  {{ profile.phone }}
                </p>

              </div>

            </div>
          </a>


          <!-- LOCATION -->
          <div
            class="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6"
          >
            <div class="flex items-start gap-4">

              <div
                class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.04] text-blue-400"
              >
                ◎
              </div>

              <div>

                <p
                  class="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500"
                >
                  Location
                </p>

                <p
                  class="mt-1 text-sm font-medium text-slate-200 sm:text-base"
                >
                  {{ profile?.location || "Nepal" }}
                </p>

              </div>

            </div>
          </div>


          <!-- SOCIAL LINKS -->
          <div
            class="flex flex-wrap items-center gap-3 pt-1"
          >

            <a
              v-if="profile?.github"
              :href="profile.github"
              target="_blank"
              rel="noopener noreferrer"
              class="rounded-xl border border-white/[0.08] bg-white/[0.03] px-5 py-3 text-sm font-medium text-slate-300 transition hover:border-blue-500/30 hover:bg-blue-500/10 hover:text-white"
            >
              GitHub ↗
            </a>

            <a
              v-if="profile?.linkedin"
              :href="profile.linkedin"
              target="_blank"
              rel="noopener noreferrer"
              class="rounded-xl border border-white/[0.08] bg-white/[0.03] px-5 py-3 text-sm font-medium text-slate-300 transition hover:border-blue-500/30 hover:bg-blue-500/10 hover:text-white"
            >
              LinkedIn ↗
            </a>

          </div>

        </div>


        <!-- RIGHT SIDE / FORM -->
        <div
          class="rounded-3xl border border-white/[0.08] bg-white/[0.03] p-6 sm:p-8 lg:p-9"
        >

          <div class="mb-8">

            <p
              class="text-xs font-semibold uppercase tracking-[0.2em] text-blue-400"
            >
              Message
            </p>

            <h2 class="mt-2 text-2xl font-semibold">
              Send me a message
            </h2>

            <p class="mt-2 text-sm leading-6 text-slate-400">
              Fill out the form below and I'll get back to you as soon as I can.
            </p>

          </div>


          <form
            class="space-y-5"
            @submit.prevent="sendMessage"
          >

            <!-- NAME + EMAIL -->
            <div class="grid grid-cols-1 gap-5 sm:grid-cols-2">

              <!-- NAME -->
              <div>

                <label
                  for="name"
                  class="mb-2 block text-sm font-medium text-slate-300"
                >
                  Name
                </label>

                <input
                  id="name"
                  v-model="form.name"
                  type="text"
                  placeholder="Your name"
                  autocomplete="name"
                  required
                  class="w-full rounded-xl border border-white/[0.08] bg-slate-950 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 transition focus:border-blue-500/60 focus:ring-2 focus:ring-blue-500/10"
                />

              </div>


              <!-- EMAIL -->
              <div>

                <label
                  for="email"
                  class="mb-2 block text-sm font-medium text-slate-300"
                >
                  Email
                </label>

                <input
                  id="email"
                  v-model="form.email"
                  type="email"
                  placeholder="you@example.com"
                  autocomplete="email"
                  required
                  class="w-full rounded-xl border border-white/[0.08] bg-slate-950 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 transition focus:border-blue-500/60 focus:ring-2 focus:ring-blue-500/10"
                />

              </div>

            </div>


            <!-- SUBJECT -->
            <div>

              <label
                for="subject"
                class="mb-2 block text-sm font-medium text-slate-300"
              >
                Subject
              </label>

              <input
                id="subject"
                v-model="form.subject"
                type="text"
                placeholder="What would you like to discuss?"
                class="w-full rounded-xl border border-white/[0.08] bg-slate-950 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 transition focus:border-blue-500/60 focus:ring-2 focus:ring-blue-500/10"
              />

            </div>


            <!-- MESSAGE -->
            <div>

              <label
                for="message"
                class="mb-2 block text-sm font-medium text-slate-300"
              >
                Message
              </label>

              <textarea
                id="message"
                v-model="form.message"
                rows="7"
                placeholder="Tell me a little about your project or opportunity..."
                autocomplete="off"
                required
                class="w-full resize-none rounded-xl border border-white/[0.08] bg-slate-950 px-4 py-3 text-sm leading-6 text-white outline-none placeholder:text-slate-600 transition focus:border-blue-500/60 focus:ring-2 focus:ring-blue-500/10"
              ></textarea>

            </div>


            <!-- SUCCESS -->
            <div
              v-if="successMessage"
              class="rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm leading-6 text-emerald-400"
            >
              {{ successMessage }}
            </div>


            <!-- ERROR -->
            <div
              v-if="errorMessage"
              class="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm leading-6 text-red-400"
            >
              {{ errorMessage }}
            </div>


            <!-- SUBMIT -->
            <button
              type="submit"
              :disabled="sending"
              class="group flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-semibold text-white transition duration-200 hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <span>
                {{ sending ? "Sending..." : "Send Message" }}
              </span>

              <span
                v-if="!sending"
                class="transition-transform duration-200 group-hover:translate-x-1"
              >
                →
              </span>
            </button>


            <p class="text-center text-xs text-slate-600">
              Your message will be sent directly to my portfolio inbox.
            </p>

          </form>

        </div>

      </div>

    </div>
  </section>
</template>