<template>
  <h1>ORA</h1>
  <h2>L'appel souterrain</h2>
  <img id="logo" src="../assets/Logo_accueil.svg" />

  <router-link to="/login">Se connecter</router-link>
  <router-link to="/sign">S'inscrire</router-link>
  <router-view></router-view> 
</template>

<script>

export default {
  name: "accueil",
  //fonction to hide buttons
  mounted() {
  },
  methods: {
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  color: #ffb300;
  letter-spacing: 8px;
}
h2 {
  font-size: 18px;
  letter-spacing: 4px;
}
/* Set  size for logo */
#logo {
  position: relative;
  display: block;
  width: 100px;
  margin: auto;
  padding: 15px;
}
</style>
