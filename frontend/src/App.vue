<template>
  <div id="main">
    <div id="nav">
      <img id="logo" src="./assets/logo.png" />

      <div id="hidden">
        <button @click="profile" class="nav__button">Mon profil ({{ userSession }})</button><br />
        <button @click="logOut" class="nav__button">Se déconnecter</button>
      </div>
    </div>
  </div>
  <div id="router"><router-view /></div>
</template>

<script>
import router from "./router/index";

export default {
  name: "App",
  data() {
    return {
      userSession: sessionStorage.getItem("userName"),
    };
  },

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
  text-align: center;
  color: white;
  background-color: #122542;
  margin: auto;
  max-width: 900px;
  box-sizing: border-box;
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

/* Set a style for  buttons */
/* Set a style for  buttons */
button {
  padding: 6px 6px;
  margin: 8px 8px 0 0;
  border: 1px solid #ccc;
  box-sizing: border-box;
  text-decoration: none;
  color: black;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  overflow: hidden;
}

/* Add bg color */
body {
  background-color: #122542;
}

/* Set  size for the images */
img {
  width: 150px;
}

/* Set  position of top buttons */
#hidden {
  position: absolute;
  top: 0;
  right: 0px;
  width: 150px;
}

/* Set  size for logo */
#logo {
  width: 50%;
  height: 100%;
  max-height: 500px;
  object-fit: contain;
}

/* Set  position of nav */
#nav {
  position: fixed;
  top: 0;
  left: 0;
  background-color: white;
  z-index: 1;
  width: 100%;
  height: 80px;
  padding-bottom: 20px;
  border: solid;
  border-color: #122542;
  margin: auto;
}

/* Set  position of nav button*/
.nav__button {
  position: relative;
  top: 10px;
  right: 15px;
  max-width: 125px;
  width: 100%;
}
#router {
  margin-top: 120px;
}

@media screen and (max-width: 600px) {
  button {
    width: 55%;
  }

  #hidden {
    position: absolute;
    top: px;
    right: 0px;
    width: 150px;
  }

  #logo {
    position: absolute;
    left: 15px;
    top: 15px;
    height: 80px;
  }
}
</style>
