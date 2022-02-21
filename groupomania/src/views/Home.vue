<template>
  <h1>Bienvenue !!!</h1>
  <router-link to="/login">Se connecter</router-link>
  <router-link to="/sign">S'inscrire</router-link>
  <router-view />
</template>

<script>
export default {
  name: "accueil",
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
