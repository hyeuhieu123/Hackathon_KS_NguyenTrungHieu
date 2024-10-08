import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../components/Dashboard.vue";
import ManagerUser from "../components/ManagerUser.vue";
import ManagerProduct from "../components/ManagerProduct.vue";

const routes = [
  {
    path: "/admin",
    component: Dashboard,
    name: "Dashboard",
  },
  {
    path: "/admin/manager-user",
    component: ManagerUser,
    name: "ManagerUser",
  },
  {
    path: "/admin/manager-product",
    component: ManagerProduct,
    name: "ManagerProduct",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
