<template>
  <h1>{{ heros }}</h1>
  <div id="user-nav">
    <div class="nav">
      <button @click="story" class="story-button"><span class="button-text">Chroniques</span></button>
      <button @click="stat" class="stat-button"><span class="button-text">Statistiques</span></button>
      <button @click="stuff" class="stuff-button"><span class="button-text">Inventaire</span></button>
    </div>
  </div>

  <div class="main">
    <ul class="list">
      <li class="list-item" v-for="h in filteredHeros" :key="h">Force : {{ h.stat1 }}</li>
      <li class="list-item" v-for="h in filteredHeros" :key="h">Force : {{ h.stat2 }}</li>
      <li class="list-item" v-for="h in filteredHeros" :key="h">Force : {{ h.stat3 }}</li>
      <li class="list-item" v-for="h in filteredHeros" :key="h">Force : {{ h.stat4 }}</li>
      <li class="list-item" v-for="h in filteredHeros" :key="h">Force : {{ h.stat5 }}</li>
      <li class="list-item" v-for="h in filteredHeros" :key="h">Force : {{ h.stat6 }}</li>
      <li class="list-item" v-for="h in filteredHeros" :key="h">Force : {{ h.stat7 }}</li>
      <li class="list-item" v-for="h in filteredHeros" :key="h">Force : {{ h.stat8 }}</li>
    </ul>
  </div>
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
      herosDescr: [],
    };
  },
  computed: {
    filteredHeros: function () {
      let userHeros = sessionStorage.getItem("userHeros");
      return this.herosDescr.filter(function (herosTab) {
        return herosTab.nom === userHeros;
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

.story-button,
.stat-button,
.stuff-button {
  height: 80px;
  width: 33%;
  background-image: url(../assets/logo.png);
  background-position: top;
  background-size: 30%;
  background-repeat: no-repeat;
  padding: 25px;
  border: none;
  background-color: #503717;
  color: white;
}
.story-button {
  background-image: url(../assets/story.svg);
}

.stat-button {
  background-image: url(../assets/stat.svg);
}

.stuff-button {
  background-image: url(../assets/stuff2.svg);
}

.button-text {
  position: relative;
  bottom: -20px;
  letter-spacing: 1.5px;
}

.list-item {
  list-style-type: none;
  background-color: white;
  color: black;
}

.list {
  list-style-type: none;
  padding: 0;
  margin: 0;
}
#user-nav {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100px;
  background-color: #503717;
}
.nav {
  padding-top: 20px;
}
.main {
  position: absolute;
  left: 0;
  top: 100px;
  width: 100%;
  height: calc(100% - 100px);
  background-color: white;
  background-image: url(../assets/logo.png);
  background-position: center;
  background-size: 100%;
  background-repeat: no-repeat;
}
</style>
