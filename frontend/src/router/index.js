import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";
import Sign from "../views/Sign.vue";
import Login from "../views/Login.vue";
import Actu from "../views/Actu.vue";
import ListPerso from "../views/List-perso.vue";
import Perso from "../views/Perso.vue";
import Stuff from "../views/Stuff.vue";
import Story from "../views/Story.vue";
import Stat from "../views/Stat.vue";
import ActuId from "../views/ActuId.vue";
import Pub from "../views/Pub.vue";
import Comments from "../views/Comments.vue";
import Profile from "../views/Profile.vue";
import Admin from "../views/Admin.vue";
import AdminStuff from "../views/AdminStuff.vue";
import AdminGift from "../views/AdminGift.vue";
import AdminHeros from "../views/AdminHeros.vue";
import AdminHerosEquip from "../views/AdminHerosEquip.vue";

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
    path: "/admin/herosEquip",
    name: "AdminHerosEquip",
    component: AdminHerosEquip,
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
  {
    path: "/actu/:id",
    name: "actuId",
    component: ActuId,
  },
  {
    path: "/actu/:id/comment",
    name: "comments",
    component: Comments,
  },
  {
    path: "/profile",
    name: "profile",
    component: Profile,
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
