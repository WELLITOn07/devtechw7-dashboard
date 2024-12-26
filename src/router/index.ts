import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import CoursesView from "../views/CoursesView.vue";
import AnalyticsDashboard from "../views/AnalyticsDashboard.vue";
import AdvertisementCentralView from "../views/AdvertisementCentralView.vue";
import { useAuthStore } from "@/stores/auth";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    meta: { requiresAuth: true },
  },
  {
    path: "/home",
    name: "home",
    component: HomeView,
    meta: { requiresAuth: true },
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/courses",
    name: "courses",
    component: CoursesView,
    meta: { requiresAuth: true },
  },
  {
    path: "/analytics-dashboard",
    name: "analytics-dashboard",
    component: AnalyticsDashboard,
    meta: { requiresAuth: true },
  },
  {
    path: "/advertisement-central",
    name: "advertisement-central",
    component: AdvertisementCentralView,
    meta: { requiresAuth: true },
  },
  // Rota curinga para redirecionar ao Home
  {
    path: "/:pathMatch(.*)*",
    redirect: { name: "home" },
  },
];

const router = createRouter({
  history: createWebHistory("/"),
  routes,
});

router.beforeEach((to, _, next) => {
  const authStore = useAuthStore();
  const isAuthenticated = !!sessionStorage.getItem("access_token");

  if (isAuthenticated !== authStore.isAuthenticated) {
    authStore.setAuthenticated(isAuthenticated);
  }

  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: "login" });
  } else if (to.name === "login" && isAuthenticated) {
    next({ name: "home" });
  } else {
    next();
  }
});

export default router;
