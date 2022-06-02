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
  <div id="item">
    {{ item }}
    <div id="selectItem"><button @click="putItem" id="putItem">Equiper</button></div>
  </div>
  <div class="item-bloc" id="mainG">Main gauche</div>
  <div class="item-bloc" id="mainD">Main droite</div>
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
      item: {},
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
    let seeItem = document.getElementById("item");
    seeItem.style.display = "none";
    let userSession = sessionStorage.getItem("userName");
    /* display all news */
    DataService.getAllInfo(userSession)
      .then((response) => {
        this.heros = response.data[0][0].heros;
        this.herosDescr = response.data[1];
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
      let seeItem = document.getElementById("item");
      DataService.itemCode(code)
        .then((response) => {
          seeItem.style.display = "initial";
          console.log(response.data.item[0][0]);
          this.item.nom = response.data.item[0][0].nom;
          this.item.type = response.data.item[0][0].type;
          this.item.id = response.data.item[0][0].id;
          //this.item.image = response.data.item[0][0].image;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    /* fonction to add item in stuff*/
    putItem() {
      let idPerso = sessionStorage.getItem("userName");
      let dataItem = {
        itemPut: this.item.nom,
        user: idPerso,
      };

      DataService.putItem(dataItem)
        .then((response) => {
          console.log(response.data);
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

.item-bloc {
  border: solid white;
  display: inline-block;
  margin: 15px;
  padding: 15px;
}
</style>
