import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import LoginView from "@/views/LoginView.vue";
import ManageControllersView from "@/views/ManageControllersView.vue";
import AnalyticsDashboard from "@/views/AnalyticsDashboard.vue";
import AdvertisementCentralView from "@/views/AdvertisementCentralView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
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
    path: "/manage/:name",
    name: "manage-controllers",
    component: ManageControllersView,
    meta: { requiresAuth: true },
  },
  {
    path: "/analytics",
    name: "analytics-dashboard",
    component: AnalyticsDashboard,
    meta: { requiresAuth: true },
  },
  {
    path: "/advertisements",
    name: "advertisement-central",
    component: AdvertisementCentralView,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.VUE_APP_BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
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
