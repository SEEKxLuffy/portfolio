import { createRouter, createWebHistory } from "vue-router";

// Public pages
import Home from "../views/Home.vue";
import Projects from "../views/Projects.vue";
import Skills from "../views/Skills.vue";
import Education from "../views/Education.vue";
import Experience from "../views/Experience.vue";
import Interests from "../views/Interests.vue";
import Contact from "../views/Contact.vue";

// Admin pages
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
    // ADMIN
    // ==========================

    {
      path: "/admin",
      name: "AdminDashboard",
      component: AdminDashboard,
    },

    {
      path: "/admin/profile",
      name: "AdminProfile",
      component: AdminProfile,
    },

    {
      path: "/admin/projects",
      name: "AdminProjects",
      component: AdminProjects,
    },

    {
      path: "/admin/skills",
      name: "AdminSkills",
      component: AdminSkills,
    },

    {
      path: "/admin/education",
      name: "AdminEducation",
      component: AdminEducation,
    },

    {
      path: "/admin/experience",
      name: "AdminExperience",
      component: AdminExperience,
    },

    {
      path: "/admin/interests",
      name: "AdminInterests",
      component: AdminInterests,
    },

    {
      path: "/admin/messages",
      name: "AdminMessages",
      component: AdminMessages,
    },
  ],
});

export default router;