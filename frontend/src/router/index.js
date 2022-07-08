import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";
import Sign from "../views/Sign.vue";
import Login from "../views/Login.vue";
import ListPerso from "../views/List-perso.vue";
import Perso from "../views/Perso.vue";
import Stuff from "../views/Stuff.vue";
import Story from "../views/Story.vue";
import Stat from "../views/Stat.vue";
import Admin from "../views/Admin.vue";
import AdminStuff from "../views/AdminStuff.vue";
import AdminGift from "../views/AdminGift.vue";
import AdminHeros from "../views/AdminHeros.vue";

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
    path: "/admin",
    name: "admin",
    component: Admin,
  },
  {
    path: "/list-perso",
    name: "list-pers",
    component: ListPerso,
  },
  {
    path: "/perso",
    name: "perso",
    component: Perso,
  },
  {
    path: "/stuff",
    name: "stuff",
    component: Stuff,
  },
  {
    path: "/admin/stuff",
    name: "AdminStuff",
    component: AdminStuff,
  },
  {
    path: "/admin/heros",
    name: "AdminHeros",
    component: AdminHeros,
  },
  {
    path: "/admin/don",
    name: "AdminGift",
    component: AdminGift,
  },
  {
    path: "/story",
    name: "story",
    component: Story,
  },
  {
    path: "/stat",
    name: "stat",
    component: Stat,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
