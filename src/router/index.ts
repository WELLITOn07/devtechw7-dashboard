import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: () => import("@/views/HomeView.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/LoginView.vue"),
  },
  {
    path: "/manage/:name",
    name: "manage-controllers",
    component: () => import("@/views/ManageControllersView.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/analytics",
    name: "analytics-dashboard",
    component: () => import("@/views/AnalyticsDashboard.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/advertisements",
    name: "advertisement-central",
    component: () => import("@/views/AdvertisementCentralView.vue"),
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.VUE_APP_BASE_URL),
  routes,
});

router.beforeEach((to, _, next) => {
  const isAuthenticated = !!sessionStorage.getItem("access_token");
  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: "login" });
  } else if (to.name === "login" && isAuthenticated) {
    next({ name: "home" });
  } else {
    next();
  }
});

export default router;
