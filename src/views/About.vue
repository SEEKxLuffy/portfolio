<script setup lang="ts">
</script>

<template>
  <section
    class="min-h-screen w-full overflow-x-hidden bg-slate-950 px-4 pb-20 pt-32 text-white sm:px-6 sm:pb-24 sm:pt-36 lg:px-8 lg:pb-32"
  >
    <div class="mx-auto w-full max-w-6xl">

      <!-- ================================================= -->
      <!-- PAGE INTRO -->
      <!-- ================================================= -->

      <div class="max-w-3xl">
        <div class="mb-5 flex items-center gap-3">
          <span class="h-px w-8 bg-blue-500"></span>

          <p
            class="text-xs font-semibold uppercase tracking-[0.28em] text-blue-400 sm:text-sm"
          >
            About Me
          </p>
        </div>

        <h1
          class="text-4xl font-bold leading-[1.05] tracking-[-0.035em] sm:text-5xl md:text-6xl"
        >
          Building the web,
          <span class="text-slate-500">
            one project at a time.
          </span>
        </h1>

        <p
          class="mt-6 max-w-2xl text-sm leading-7 text-slate-400 sm:mt-7 sm:text-base sm:leading-8 lg:text-lg"
        >
          I'm a frontend developer focused on creating clean, responsive,
          and practical web experiences while continuously improving my
          development skills.
        </p>
      </div>


      <!-- ================================================= -->
      <!-- MAIN CONTENT -->
      <!-- ================================================= -->

      <div
        class="mt-12 grid gap-5 sm:mt-16 lg:grid-cols-12"
      >

        <!-- =============================================== -->
        <!-- PROFILE -->
        <!-- =============================================== -->

        <div
          class="group relative overflow-hidden rounded-3xl border border-white/[0.08] bg-slate-900/60 p-6 backdrop-blur-sm transition duration-300 hover:border-blue-500/20 sm:p-8 lg:col-span-4"
        >
          <!-- SUBTLE BACKGROUND -->
          <div
            class="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-blue-600/[0.08] blur-3xl"
          ></div>

          <div class="relative">

            <!-- AVATAR -->
            <div
              class="flex h-16 w-16 items-center justify-center rounded-2xl border border-blue-500/20 bg-blue-500/10 text-2xl font-bold text-blue-400"
            >
              M
            </div>

            <h2
              class="mt-7 text-2xl font-bold tracking-tight"
            >
              Manish Tamang
            </h2>

            <p
              class="mt-2 text-sm font-medium text-blue-400"
            >
              Frontend Developer
            </p>

            <p
              class="mt-5 text-sm leading-7 text-slate-400 sm:text-base sm:leading-8"
            >
              I enjoy turning ideas into functional interfaces and
              building websites that are visually clean, responsive,
              and easy to use.
            </p>

            <!-- PROFILE DETAILS -->
            <div
              class="mt-8 border-t border-white/[0.07] pt-6"
            >
              <div class="space-y-5">

                <div>
                  <p
                    class="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500"
                  >
                    Location
                  </p>

                  <p
                    class="mt-1.5 text-sm font-medium text-slate-200"
                  >
                    Nepal
                  </p>
                </div>

                <div>
                  <p
                    class="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500"
                  >
                    Primary Focus
                  </p>

                  <p
                    class="mt-1.5 text-sm font-medium text-slate-200"
                  >
                    Frontend Development
                  </p>
                </div>

                <div>
                  <p
                    class="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500"
                  >
                    Currently
                  </p>

                  <p
                    class="mt-1.5 text-sm font-medium text-blue-400"
                  >
                    Learning & Building
                  </p>
                </div>

              </div>
            </div>

          </div>
        </div>


        <!-- =============================================== -->
        <!-- JOURNEY -->
        <!-- =============================================== -->

        <div
          class="overflow-hidden rounded-3xl border border-white/[0.08] bg-slate-900/60 p-6 sm:p-8 lg:col-span-8"
        >

          <!-- HEADER -->
          <div class="flex items-start gap-4">

            <div
              class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-blue-500/10 bg-blue-500/10 text-blue-400"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="21"
                height="21"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                <path
                  d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z"
                />
              </svg>
            </div>

            <div class="min-w-0">
              <p
                class="text-xs font-medium text-slate-500 sm:text-sm"
              >
                My Journey
              </p>

              <h2
                class="mt-0.5 text-xl font-bold tracking-tight sm:text-2xl"
              >
                From learning to building
              </h2>
            </div>

          </div>


          <!-- DESCRIPTION -->
          <div
            class="mt-7 max-w-3xl space-y-4 sm:mt-8 sm:space-y-5"
          >
            <p
              class="text-sm leading-7 text-slate-400 sm:text-base sm:leading-8"
            >
              My interest in web development started with creating
              websites and understanding how the web works. Since then,
              I've continued developing my skills through practice,
              projects, and hands-on experience.
            </p>

            <p
              class="text-sm leading-7 text-slate-400 sm:text-base sm:leading-8"
            >
              I currently focus on Vue, TypeScript, responsive design,
              APIs, and modern frontend development while also
              expanding my knowledge of backend development and
              databases.
            </p>
          </div>


          <!-- DEVELOPMENT AREAS -->
          <div
            class="mt-9 grid gap-3 sm:mt-10 sm:grid-cols-3 sm:gap-4"
          >

            <!-- FRONTEND -->
            <div
              class="rounded-2xl border border-white/[0.06] bg-white/[0.025] p-5 transition duration-200 hover:border-blue-500/20 hover:bg-white/[0.04]"
            >
              <div
                class="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="19"
                  height="19"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.8"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="m16 18 6-6-6-6" />
                  <path d="m8 6-6 6 6 6" />
                  <path d="m14.5 4-5 16" />
                </svg>
              </div>

              <p class="mt-4 text-sm font-semibold text-white">
                Frontend
              </p>

              <p
                class="mt-2 text-xs leading-6 text-slate-500 sm:text-sm"
              >
                Responsive and modern web interfaces.
              </p>
            </div>


            <!-- VUE -->
            <div
              class="rounded-2xl border border-white/[0.06] bg-white/[0.025] p-5 transition duration-200 hover:border-blue-500/20 hover:bg-white/[0.04]"
            >
              <div
                class="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="19"
                  height="19"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.8"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M12 2 2 7l10 5 10-5-10-5Z" />
                  <path d="m2 17 10 5 10-5" />
                  <path d="m2 12 10 5 10-5" />
                </svg>
              </div>

              <p class="mt-4 text-sm font-semibold text-white">
                Vue + TypeScript
              </p>

              <p
                class="mt-2 text-xs leading-6 text-slate-500 sm:text-sm"
              >
                Building component-based applications.
              </p>
            </div>


            <!-- BACKEND -->
            <div
              class="rounded-2xl border border-white/[0.06] bg-white/[0.025] p-5 transition duration-200 hover:border-blue-500/20 hover:bg-white/[0.04]"
            >
              <div
                class="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="19"
                  height="19"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.8"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <ellipse cx="12" cy="5" rx="9" ry="3" />
                  <path
                    d="M3 5v14c0 1.7 4 3 9 3s9-1.3 9-3V5"
                  />
                  <path
                    d="M3 12c0 1.7 4 3 9 3s9-1.3 9-3"
                  />
                </svg>
              </div>

              <p class="mt-4 text-sm font-semibold text-white">
                Backend
              </p>

              <p
                class="mt-2 text-xs leading-6 text-slate-500 sm:text-sm"
              >
                Exploring APIs, Node.js and PostgreSQL.
              </p>
            </div>

          </div>
        </div>

      </div>


      <!-- ================================================= -->
      <!-- QUICK FACTS -->
      <!-- ================================================= -->

      <div
        class="mt-5 grid gap-3 sm:mt-6 sm:grid-cols-2 lg:grid-cols-4"
      >

        <div
          class="rounded-2xl border border-white/[0.08] bg-slate-900/60 p-5 transition duration-200 hover:border-blue-500/20"
        >
          <p
            class="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500"
          >
            Frontend
          </p>

          <p
            class="mt-2 text-sm font-semibold text-white"
          >
            Vue + TypeScript
          </p>
        </div>

        <div
          class="rounded-2xl border border-white/[0.08] bg-slate-900/60 p-5 transition duration-200 hover:border-blue-500/20"
        >
          <p
            class="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500"
          >
            Styling
          </p>

          <p
            class="mt-2 text-sm font-semibold text-white"
          >
            Tailwind CSS
          </p>
        </div>

        <div
          class="rounded-2xl border border-white/[0.08] bg-slate-900/60 p-5 transition duration-200 hover:border-blue-500/20"
        >
          <p
            class="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500"
          >
            Backend
          </p>

          <p
            class="mt-2 text-sm font-semibold text-white"
          >
            Node + Express
          </p>
        </div>

        <div
          class="rounded-2xl border border-white/[0.08] bg-slate-900/60 p-5 transition duration-200 hover:border-blue-500/20"
        >
          <p
            class="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500"
          >
            Database
          </p>

          <p
            class="mt-2 text-sm font-semibold text-white"
          >
            PostgreSQL
          </p>
        </div>

      </div>


      <!-- ================================================= -->
      <!-- CLOSING STATEMENT -->
      <!-- ================================================= -->

      <div
        class="mt-5 overflow-hidden rounded-3xl border border-blue-500/10 bg-blue-500/[0.035] px-5 py-8 text-center sm:mt-6 sm:px-10 sm:py-10"
      >
        <p
          class="mx-auto max-w-3xl text-sm leading-7 text-slate-400 sm:text-base sm:leading-8"
        >
          <span class="text-slate-300">
            Learning by building,
          </span>
          improving through practice, and creating something better
          with every project.
        </p>
      </div>

    </div>
  </section>
</template>