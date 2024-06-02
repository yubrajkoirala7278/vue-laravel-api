import { createRouter, createWebHistory } from "vue-router";

const routes = [
  // ====backend======
  {
    path: "/admin",
    name: "private",
    component: () => import("@/layouts/auth/auth_layout.vue"),
    children: [
      {
        path: "home",
        name: "admin-home",
        component: () => import("@/modules/backend/home/home_view.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "product",
        name: "admin-product",
        component: () => import("@/modules/backend/products/product_view.vue"),
        meta: { requiresAuth: true },
      },
    ],
  },
  // ======frontend=======
  {
    path: "/",
    name: "public",
    component: () => import("@/layouts/app/app_layout.vue"),
    children: [
      {
        path: "login",
        name: "login",
        component: () => import("@/modules/auth/login_view.vue"),
        meta: { guestOnly: true },  // Add meta property to indicate guest-only route
      },
      {
        path: "/",
        name: "home",
        component: () => import("@/modules/frontend/home/home_view.vue"),
      },
      {
        path: "/:pathMatch(.*)*",
        name: "error-page",
        component: () => import("@/modules/frontend/home/home_view.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const auth = JSON.parse(localStorage.getItem("auth"));
  const isLoggedIn = auth && auth.access_token;

  if (to.matched.some(record => record.meta.requiresAuth) && !isLoggedIn) {
    // Redirect to login if trying to access a protected route without being logged in
    next({ name: 'login' });
  } else if (to.matched.some(record => record.meta.guestOnly) && isLoggedIn) {
    // Redirect to /admin/home if trying to access a guest-only route while logged in
    next({ name: 'admin-home' });
  } else {
    next();
  }
});

export default router;
