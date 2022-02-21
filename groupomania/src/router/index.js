import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";
import Sign from "../views/Sign.vue";
import Login from "../views/Login.vue";
import Actu from "../views/Actu.vue";
import ActuId from "../views/ActuId.vue";
import Pub from "../views/Pub.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/sign",
    name: "sign",
    component: Sign,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/actu",
    name: "actu",
    component: Actu,
  },
  {
    path: "/actu/:id",
    name: "actuId",
    component: ActuId,
  },
  {
    path: "/pub",
    name: "pub",
    component: Pub,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
