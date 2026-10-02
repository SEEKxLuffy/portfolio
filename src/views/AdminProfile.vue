```vue
<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

interface Profile {
  id: number;
  name: string;
  job_title: string;
  bio: string;
  email: string;
  location: string;
  github: string;
  linkedin: string;
  image: string | null;
}

const profile = ref<Profile>({
  id: 0,
  name: "",
  job_title: "",
  bio: "",
  email: "",
  location: "",
  github: "",
  linkedin: "",
  image: null,
});

const selectedImage = ref<File | null>(null);
const imagePreview = ref<string | null>(null);

const loading = ref(false);
const saving = ref(false);
const deletingImage = ref(false);
const message = ref("");
const errorMessage = ref("");

const API_URL = "http://localhost:3000";

const currentImage = computed(() => {
  if (imagePreview.value) {
    return imagePreview.value;
  }

  if (profile.value.image) {
    return `${API_URL}${profile.value.image}`;
  }

  return null;
});

// ==============================
// LOAD PROFILE
// ==============================

const loadProfile = async () => {
  loading.value = true;
  message.value = "";
  errorMessage.value = "";

  try {
    const response = await fetch(
      `${API_URL}/api/profile`
    );

    if (!response.ok) {
      throw new Error("Failed to load profile");
    }

    const data = await response.json();

    if (data) {
      profile.value = {
        ...data,
        image: data.image || null,
      };
    }
  } catch (error) {
    console.error(error);

    errorMessage.value =
      "Failed to load profile.";
  } finally {
    loading.value = false;
  }
};

// ==============================
// SELECT IMAGE
// ==============================

const handleImageChange = (
  event: Event
) => {
  const input =
    event.target as HTMLInputElement;

  if (!input.files || !input.files[0]) {
    return;
  }

  const file = input.files[0];

  // 5 MB limit
  if (file.size > 5 * 1024 * 1024) {
    errorMessage.value =
      "Image must be smaller than 5 MB.";

    input.value = "";
    return;
  }

  selectedImage.value = file;

  imagePreview.value =
    URL.createObjectURL(file);

  message.value = "";
  errorMessage.value = "";
};

// ==============================
// REMOVE SELECTED IMAGE
// ==============================

const cancelSelectedImage = () => {
  selectedImage.value = null;

  if (imagePreview.value) {
    URL.revokeObjectURL(
      imagePreview.value
    );
  }

  imagePreview.value = null;
};

// ==============================
// SAVE PROFILE
// ==============================

const saveProfile = async () => {
  saving.value = true;
  message.value = "";
  errorMessage.value = "";

  try {
    const formData = new FormData();

    formData.append(
      "name",
      profile.value.name
    );

    formData.append(
      "job_title",
      profile.value.job_title
    );

    formData.append(
      "bio",
      profile.value.bio
    );

    formData.append(
      "email",
      profile.value.email
    );

    formData.append(
      "location",
      profile.value.location
    );

    formData.append(
      "github",
      profile.value.github
    );

    formData.append(
      "linkedin",
      profile.value.linkedin
    );

    if (selectedImage.value) {
      formData.append(
        "image",
        selectedImage.value
      );
    }

    let response: Response;

    if (profile.value.id) {
      response = await fetch(
        `${API_URL}/api/profile/${profile.value.id}`,
        {
          method: "PUT",
          body: formData,
        }
      );
    } else {
      response = await fetch(
        `${API_URL}/api/profile`,
        {
          method: "POST",
          body: formData,
        }
      );
    }

    if (!response.ok) {
      const errorData =
        await response.json().catch(
          () => null
        );

      throw new Error(
  errorData?.message ||
    `Failed to save profile (${response.status})`
    );
    }

    const data =
      await response.json();

    if (data) {
      profile.value = {
        ...data,
        image: data.image || null,
      };
    }

    cancelSelectedImage();

    message.value =
      "Profile saved successfully.";
  } catch (error) {
    console.error(error);

    errorMessage.value =
      error instanceof Error
        ? error.message
        : "Failed to save profile.";
  } finally {
    saving.value = false;
  }
};

// ==============================
// DELETE PROFILE IMAGE
// ==============================

const deleteImage = async () => {
  if (!profile.value.id) {
    return;
  }

  if (
    !confirm(
      "Are you sure you want to remove the profile image?"
    )
  ) {
    return;
  }

  deletingImage.value = true;
  message.value = "";
  errorMessage.value = "";

  try {
    const response = await fetch(
      `${API_URL}/api/profile/${profile.value.id}/image`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      const errorData =
        await response.json().catch(
          () => null
        );

      throw new Error(
        errorData?.message ||
          "Failed to delete image"
      );
    }

    const data =
      await response.json();

    profile.value = {
      ...data,
      image: data.image || null,
    };

    message.value =
      "Profile image removed successfully.";
  } catch (error) {
    console.error(error);

    errorMessage.value =
      error instanceof Error
        ? error.message
        : "Failed to delete image.";
  } finally {
    deletingImage.value = false;
  }
};

// ==============================
// BACK
// ==============================

const goBack = () => {
  router.push("/admin");
};

// ==============================
// LOAD
// ==============================

onMounted(loadProfile);
</script>

<template>
  <div
    class="min-h-screen bg-gray-950 p-4 text-white sm:p-6 lg:p-8"
  >
    <div class="mx-auto max-w-4xl">

      <!-- HEADER -->
      <div
        class="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <h1
            class="text-2xl font-bold sm:text-3xl"
          >
            Manage Profile
          </h1>

          <p class="mt-1 text-gray-400">
            Update your portfolio profile.
          </p>
        </div>

        <button
          type="button"
          @click="goBack"
          class="rounded-lg bg-gray-700 px-4 py-2 transition hover:bg-gray-600"
        >
          Back
        </button>
      </div>

      <!-- LOADING -->
      <div
        v-if="loading"
        class="rounded-xl border border-gray-800 bg-gray-900 p-6 text-gray-400"
      >
        Loading profile...
      </div>

      <!-- FORM -->
      <form
        v-else
        @submit.prevent="saveProfile"
        class="space-y-6 rounded-xl border border-gray-800 bg-gray-900 p-5 sm:p-6"
      >

        <!-- ============================== -->
        <!-- PROFILE IMAGE -->
        <!-- ============================== -->

        <div
          class="rounded-xl border border-gray-800 bg-gray-950 p-5"
        >
          <div class="mb-4">
            <h2
              class="text-lg font-semibold"
            >
              Profile Image
            </h2>

            <p
              class="mt-1 text-sm text-gray-400"
            >
              Upload a JPG, PNG, WEBP or GIF
              image. Maximum size: 5 MB.
            </p>
          </div>

          <div
            class="flex flex-col gap-6 sm:flex-row sm:items-center"
          >

            <!-- IMAGE PREVIEW -->
            <div
              class="flex h-40 w-40 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-gray-700 bg-gray-800"
            >
              <img
                v-if="currentImage"
                :src="currentImage"
                alt="Profile preview"
                class="h-full w-full object-cover"
              />

              <div
                v-else
                class="flex h-full w-full items-center justify-center text-5xl font-bold text-gray-500"
              >
                {{ profile.name?.charAt(0) || "M" }}
              </div>
            </div>

            <!-- IMAGE CONTROLS -->
            <div
              class="flex flex-col gap-3"
            >
              <label
                class="inline-flex w-fit cursor-pointer items-center justify-center rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold transition hover:bg-blue-500"
              >
                Choose Image

                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  class="hidden"
                  @change="handleImageChange"
                />
              </label>

              <button
                v-if="selectedImage"
                type="button"
                @click="cancelSelectedImage"
                class="w-fit rounded-lg bg-gray-700 px-5 py-3 text-sm font-medium transition hover:bg-gray-600"
              >
                Cancel New Image
              </button>

              <button
                v-if="profile.image && !selectedImage"
                type="button"
                @click="deleteImage"
                :disabled="deletingImage"
                class="w-fit rounded-lg bg-red-600 px-5 py-3 text-sm font-semibold transition hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {{
                  deletingImage
                    ? "Removing..."
                    : "Remove Image"
                }}
              </button>

              <p
                v-if="selectedImage"
                class="text-sm text-blue-400"
              >
                New image selected. Click
                "Save Profile" to upload it.
              </p>
            </div>
          </div>
        </div>

        <!-- ============================== -->
        <!-- NAME -->
        <!-- ============================== -->

        <div>
          <label
            class="mb-2 block text-sm font-medium"
          >
            Name
          </label>

          <input
            v-model="profile.name"
            type="text"
            class="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 outline-none transition focus:border-blue-500"
            required
          />
        </div>

        <!-- ============================== -->
        <!-- JOB TITLE -->
        <!-- ============================== -->

        <div>
          <label
            class="mb-2 block text-sm font-medium"
          >
            Job Title
          </label>

          <input
            v-model="profile.job_title"
            type="text"
            class="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 outline-none transition focus:border-blue-500"
            required
          />
        </div>

        <!-- ============================== -->
        <!-- BIO -->
        <!-- ============================== -->

        <div>
          <label
            class="mb-2 block text-sm font-medium"
          >
            Bio
          </label>

          <textarea
            v-model="profile.bio"
            rows="5"
            class="w-full resize-y rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 outline-none transition focus:border-blue-500"
          ></textarea>
        </div>

        <!-- ============================== -->
        <!-- EMAIL -->
        <!-- ============================== -->

        <div>
          <label
            class="mb-2 block text-sm font-medium"
          >
            Email
          </label>

          <input
            v-model="profile.email"
            type="email"
            class="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 outline-none transition focus:border-blue-500"
          />
        </div>

        <!-- ============================== -->
        <!-- LOCATION -->
        <!-- ============================== -->

        <div>
          <label
            class="mb-2 block text-sm font-medium"
          >
            Location
          </label>

          <input
            v-model="profile.location"
            type="text"
            class="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 outline-none transition focus:border-blue-500"
          />
        </div>

        <!-- ============================== -->
        <!-- GITHUB -->
        <!-- ============================== -->

        <div>
          <label
            class="mb-2 block text-sm font-medium"
          >
            GitHub
          </label>

          <input
            v-model="profile.github"
            type="text"
            class="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 outline-none transition focus:border-blue-500"
          />
        </div>

        <!-- ============================== -->
        <!-- LINKEDIN -->
        <!-- ============================== -->

        <div>
          <label
            class="mb-2 block text-sm font-medium"
          >
            LinkedIn
          </label>

          <input
            v-model="profile.linkedin"
            type="text"
            class="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 outline-none transition focus:border-blue-500"
          />
        </div>

        <!-- ============================== -->
        <!-- SAVE -->
        <!-- ============================== -->

        <div
          class="flex flex-col gap-4 border-t border-gray-800 pt-5 sm:flex-row sm:items-center"
        >
          <button
            type="submit"
            :disabled="saving"
            class="rounded-lg bg-blue-600 px-6 py-3 font-semibold transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {{
              saving
                ? "Saving..."
                : "Save Profile"
            }}
          </button>

          <!-- SUCCESS -->
          <p
            v-if="message"
            class="text-sm text-green-400"
          >
            {{ message }}
          </p>

          <!-- ERROR -->
          <p
            v-if="errorMessage"
            class="text-sm text-red-400"
          >
            {{ errorMessage }}
          </p>
        </div>

      </form>
    </div>
  </div>
</template>
```