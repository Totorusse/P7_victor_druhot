<template>
  <div id="nav">
    <img src="./assets/logo.png" />
    <div id="hidden">
      <button @click="logOut">Se déconnecter</button>
      <button @click="profile">Mon profil</button>
    </div>
    <router-view />
  </div>
</template>

<script>
import router from "./router/index";

export default {
  name: "App",
  /* function to hide buttons */
  mounted() {
    if (router.currentRoute.value.name == "Home") {
      document.getElementById("hidden").style.display = "none";
    }
  },
  methods: {
    delayedFunction() {
      location.reload();
    },
    logOut() {
      sessionStorage.setItem("token", "");
      router.push("/");
      window.setTimeout(this.delayedFunction, 500);
    },
    profile() {
      router.push("/profile");
    },
  },
};
</script>

<style>
/* Set  style for the whole app */
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  max-width: 900px;
  margin: auto;
}

/* Set a style for  links */
a {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  box-sizing: border-box;
  text-decoration: none;
  background-color: #ffd7d7;
  color: black;
  border: none;
  border-radius: 20px;
  cursor: pointer;
}

/* Add a hover effect for buttons */
a:hover {
  opacity: 0.8;
}

/* Add padding to containers */
.container {
  padding: 16px;
}

/* Set  size for the images */
img {
  width: 50%;
}

#button__hidden {
  display: initial;
}
</style>
