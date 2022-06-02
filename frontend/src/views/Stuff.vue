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
    <div id="selectItem">
      <p>&Ecirc;tes-vous sûr de vouloir ajouter l'objet dans votre inventaire ?</p>
      <button @click="putItem" id="putItem">Oui</button><button @click="closeItem" id="closeItem">Non</button>
    </div>
  </div>
  <div class="item-bloc" id="mainG">Main gauche</div>
  <div class="item-bloc" id="mainD">Main droite</div>
  <div class="slots">
    <div class="rang1">
      <div id="slot1">slot1</div>
      <div id="slot2">Slot2</div>
      <div id="slot3">Slot3</div>
      <div id="slot4">Slot4</div>
    </div>
    <div class="rang2">
      <div id="slot5">slot5</div>
      <div id="slot6">slot6</div>
      <div id="slot7">slot7</div>
      <div id="slot8">slot8</div>
    </div>
    <div class="rang3">
      <div id="slot9">Slot 9</div>
      <div id="slot10">Slot</div>
      <div id="slot11">Slot</div>
      <div id="slot12">Slot</div>
    </div>
    <div class="rang4">
      <div id="slot13">Slot</div>
      <div id="slot14">Slot</div>
      <div id="slot15">Slot</div>
      <div id="slot16">Slot</div>
    </div>
  </div>
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

    /* fonction to close item selection*/
    closeItem() {
      let seeItem = document.getElementById("item");
      seeItem.style.display = "none";
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
.slots {
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 100%;
}
.rang1,
.rang2,
.rang3,
.rang4 {
  display: flex;
  justify-content: space-around;
  width: 100%;
}
.rang1 > div,
.rang2 > div,
.rang3 > div,
.rang4 > div {
  display: flex;
  gap: 5px;
  width: 100px;
  height: 100px;
  border: solid white;
  justify-content: center;
  align-items: center;
}
</style>
