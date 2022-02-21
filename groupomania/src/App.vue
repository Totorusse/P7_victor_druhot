<template>
  <div id="nav">
    <img src="./assets/logo.png" />
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
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
</style>
