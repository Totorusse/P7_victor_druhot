<template>
  <h1>{{ heros }}</h1>
  <div id="user-nav">
    <button @click="story" class="story-button">Chroniques</button>
    <button @click="stat" class="stat-button">Statistiques</button>
    <button @click="stuff" class="stuff-button">Inventaire</button>
  </div>

  <hr />
  <ul class="list">
    <li class="list-item" v-for="item in herosDescr" :key="item">
      {{ item }}
    </li>
  </ul>
</template>

<script>
import DataService from "../services/DataService";
import router from "../router/index";

export default {
  name: "Stat",
  data() {
    return {
      userSession: sessionStorage.getItem("userName"),
      heros: {},
      herosDescr: {},
    };
  },

  mounted() {
    let userSession = sessionStorage.getItem("userName");
    /* display all news */
    DataService.getAllInfo(userSession)
      .then((response) => {
        this.heros = response.data[0][0].heros;
        this.herosDescr = response.data[1];
        console.log(response.data[1]);
      })
      .catch((e) => {
        console.log(e);
      });
  },

  methods: {
    story() {
      router.push("/story");
    },
    stat() {
      router.push("/stat");
    },
    stuff() {
      router.push("/stuff");
    },
  },
};
</script>

<style scoped>
/* Set  style for view only */
a {
  background-color: white;
}

.list-item {
  border: solid;
  margin-top: 8px;
  list-style-type: none;
  background-color: white;
  color: black;
  border-radius: 8px;
}

.list {
  list-style-type: none;
  padding: 0;
  margin: 0;
}
</style>
