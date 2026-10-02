
import { createRouter, createWebHistory } from "vue-router";

// Public pages
import Home from "../views/Home.vue";
import Projects from "../views/Projects.vue";
import Skills from "../views/Skills.vue";
import Education from "../views/Education.vue";
import Experience from "../views/Experience.vue";
import Interests from "../views/Interests.vue";
import Contact from "../views/Contact.vue";

// Admin
import AdminLogin from "../views/AdminLogin.vue";
import AdminLayout from "../layouts/AdminLayout.vue";
import AdminDashboard from "../views/AdminDashboard.vue";
import AdminProfile from "../views/AdminProfile.vue";
import AdminProjects from "../views/AdminProjects.vue";
import AdminSkills from "../views/AdminSkills.vue";
import AdminEducation from "../views/AdminEducation.vue";
import AdminExperience from "../views/AdminExperience.vue";
import AdminInterests from "../views/AdminInterests.vue";
import AdminMessages from "../views/AdminMessages.vue";

const router = createRouter({
  history: createWebHistory(),

  routes: [
    // ==========================
    // PUBLIC PORTFOLIO
    // ==========================

    {
      path: "/",
      name: "Home",
      component: Home,
    },

    {
      path: "/about",
      name: "About",
      component: () => import("../views/About.vue"),
    },

    {
      path: "/projects",
      name: "Projects",
      component: Projects,
    },

    {
      path: "/skills",
      name: "Skills",
      component: Skills,
    },

    {
      path: "/education",
      name: "Education",
      component: Education,
    },

    {
      path: "/experience",
      name: "Experience",
      component: Experience,
    },

    {
      path: "/interests",
      name: "Interests",
      component: Interests,
    },

    {
      path: "/contact",
      name: "Contact",
      component: Contact,
    },

    // ==========================
    // ADMIN LOGIN
    // ==========================

    {
      path: "/admin/login",
      name: "AdminLogin",
      component: AdminLogin,
    },

    // ==========================
    // ADMIN PANEL
    // ==========================

    {
      path: "/admin",
      component: AdminLayout,
      meta: {
        requiresAuth: true,
      },

      children: [
        {
          path: "",
          name: "AdminDashboard",
          component: AdminDashboard,
        },

        {
          path: "profile",
          name: "AdminProfile",
          component: AdminProfile,
        },

        {
          path: "skills",
          name: "AdminSkills",
          component: AdminSkills,
        },

        {
          path: "education",
          name: "AdminEducation",
          component: AdminEducation,
        },

        {
          path: "experience",
          name: "AdminExperience",
          component: AdminExperience,
        },

        {
          path: "projects",
          name: "AdminProjects",
          component: AdminProjects,
        },

        {
          path: "interests",
          name: "AdminInterests",
          component: AdminInterests,
        },

        {
          path: "messages",
          name: "AdminMessages",
          component: AdminMessages,
        },
      ],
    },
  ],
});

// ==========================
// AUTHENTICATION GUARD
// ==========================

router.beforeEach((to) => {
  const isLoggedIn =
    localStorage.getItem("adminLoggedIn") === "true";

  // Block protected admin pages
  if (to.meta.requiresAuth && !isLoggedIn) {
    return {
      name: "AdminLogin",
    };
  }

  // Logged-in admin should not return to login
  if (to.name === "AdminLogin" && isLoggedIn) {
    return {
      name: "AdminDashboard",
    };
  }

  return true;
});

export default router;
