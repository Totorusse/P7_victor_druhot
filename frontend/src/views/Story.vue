<template>
  <h1>{{ heros }}</h1>

  <div id="user-nav">
    <button @click="story" class="story-button">Chroniques</button>
    <button @click="stat" class="stat-button">Statistiques</button>
    <button @click="stuff" class="stuff-button">Inventaire</button>
  </div>

  <hr />

  <ul class="list">
    <li class="list-item" v-for="h in filteredHeros" :key="h">
      {{ h }}
    </li>
  </ul>
</template>

<script>
import DataService from "../services/DataService";
import router from "../router/index";

export default {
  name: "Story",
  data() {
    return {
      userSession: sessionStorage.getItem("userName"),
      heros: {},
      herosDescr: [],
    };
  },
  computed: {
    filteredHeros: function () {
      let test = "Drumlim";
      return this.herosDescr.filter(function (herosTab) {
        return herosTab.nom === test;
      });
    },
  },
  mounted() {
    let userSession = sessionStorage.getItem("userName");
    /* display all news */
    DataService.getAllInfo(userSession)
      .then((response) => {
        this.heros = response.data[0][0].heros;
        this.herosDescr = response.data[1];
      })
      .then(() => {
        console.log(this.heros);
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
