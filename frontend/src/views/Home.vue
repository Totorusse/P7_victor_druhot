<template>
  <h1>Bienvenue !!!</h1>
  <router-link to="/login">Se connecter</router-link>
  <router-link to="/sign">S'inscrire</router-link>
  <router-view />
</template>

<script>
import router from "../router/index";

export default {
  name: "accueil",
  //fonction to hide buttons
  mounted() {
    if (router.currentRoute.value.name == "Home") {
      document.getElementById("hidden").style.display = "none";
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
