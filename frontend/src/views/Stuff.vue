<template>
  <h1>{{ heros }}</h1>
  <div id="user-nav">
    <button @click="story" class="story-button">Chroniques</button>
    <button @click="stat" class="stat-button">Statistiques</button>
    <button @click="stuff" class="stuff-button">Inventaire</button>
  </div>

  <hr />
  <form class="code">
    <input type="text" placeholder="Code" id="code" /><button @click="sendCode" id="sendCode">Ajouter</button>
  </form>

  <ul class="list">
    <li class="list-item" v-for="h in filteredHeros" :key="h">{{ h.description }}</li>
    <li class="list-item" v-for="h in filteredHeros" :key="h">{{ h.nom }}</li>
  </ul>
</template>

<script>
import DataService from "../services/DataService";
import router from "../router/index";

export default {
  name: "Stuff",
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
    /* fonction to send code for items*/
    sendCode() {
      let codeValue = document.getElementById("code").value;
      let code = { code: codeValue };
      DataService.itemCode(code)
        .then((response) => {
          this.perso.nom = response.data.perso[0][0].nom;
          this.perso.image = response.data.perso[0][0].image;
        })
        .catch((e) => {
          console.log(e);
        });
    },
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
