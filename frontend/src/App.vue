<template>
  <div id="main"></div>
  <router-view></router-view>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      userSession: sessionStorage.getItem("userName"),
    };
  },

  /* function to hide buttons */
  mounted() {},
  methods: {},
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
  box-sizing: border-box;
  text-decoration: none;
  background-color: #2a3849;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  letter-spacing: 2px;
}

/* Add a hover effect for links */
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
  padding: 0 15px;
}

/* Set  size for the images */
img {
  width: 150px;
}
</style>
