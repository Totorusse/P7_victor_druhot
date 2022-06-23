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
  <!-- <div v-for="h in filteredHeros" :key="h">Items Héros : {{ h.slot }}</div> -->
  <div>Heros slots : {{ herosDescrFiltered.slot }}</div>
  <div>Items+ : {{ slotSupSum }}</div>
  <div>Total slots : {{ slotSupSum + herosDescrFiltered.slot }}</div>
  <div>Slots utilisés : {{ slotUsed }}</div>

  <div class="slots" id="slots">
    <div class="rang1">
      <button @click="showDetailsBloc">
        <div id="slot1">{{ slots.Slot1 }}</div>
      </button>
      <button @click="showDetailsBloc">
        <div id="slot2">{{ slots.Slot2 }}</div>
      </button>
      <button @click="showDetailsBloc">
        <div id="slot3">{{ slots.Slot3 }}</div>
      </button>
      <button @click="showDetailsBloc">
        <div id="slot4">{{ slots.Slot4 }}</div>
      </button>
    </div>
    <div class="rang2">
      <button @click="showDetailsBloc">
        <div id="slot5">{{ slots.Slot5 }}</div>
      </button>
      <button @click="showDetailsBloc">
        <div id="slot6">{{ slots.Slot6 }}</div>
      </button>
      <button @click="showDetailsBloc">
        <div id="slot7">{{ slots.Slot7 }}</div>
      </button>
      <button @click="showDetailsBloc">
        <div id="slot8">{{ slots.Slot8 }}</div>
      </button>
    </div>
    <div class="rang3">
      <button @click="showDetailsBloc">
        <div id="slot9">{{ slots.Slot9 }}</div>
      </button>
      <button @click="showDetailsBloc">
        <div id="slot10">{{ slots.Slot10 }}</div>
      </button>
      <button @click="showDetailsBloc">
        <div id="slot11">{{ slots.Slot11 }}</div>
      </button>
      <button @click="showDetailsBloc">
        <div id="slot12">{{ slots.Slot12 }}</div>
      </button>
    </div>
    <div class="rang4">
      <button @click="showDetailsBloc">
        <div id="slot13">{{ slots.Slot13 }}</div>
      </button>
      <button @click="showDetailsBloc">
        <div id="slot14">{{ slots.Slot14 }}</div>
      </button>
      <button @click="showDetailsBloc">
        <div id="slot15">{{ slots.Slot15 }}</div>
      </button>
      <button @click="showDetailsBloc">
        <div id="slot16">{{ slots.Slot16 }}</div>
      </button>
    </div>
  </div>
  <div id="details" class="hidden">
    <button @click="showDetails">Détails</button><button @click="equip">Equiper</button
    ><button @click="give">Donner</button><button @click="drop">Jeter</button
    ><button @click="closeDetailsBloc">X</button>
  </div>
  <div id="itemDetails" class="hidden">
    <div>Image (A ajouter) ; Nom : {{ itemDetail.nom }} ; Type : {{ itemDetail.type }}</div>
    <button @click="closeDetails">X</button>
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
      herosDescrFiltered: [],
      item: {},
      itemDetail: {},
      slots: {},
      stuffList: [],
      slotSupSum: 0,
      slotUsed: 0,
    };
  },
  computed: {
    /* get user Heros filtering heros list with heros user */
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
        this.slots = response.data[2][0];
        this.stuffList = response.data[3];
      })
      .then(() => {
        /* new description tab filtered with right heros*/
        let herosDescr = this.herosDescr;
        let heros = this.heros;
        for (let x in herosDescr) {
          if (herosDescr[x].nom == heros) {
            this.herosDescrFiltered = herosDescr[x];
          }
        }
      })
      .then(() => {
        /* calc extra slots from stuff*/
        let stuffList = this.stuffList;
        let equipedStuff = this.slots;
        let slotSupSum = this.slotSupSum;
        for (let x in stuffList) {
          for (let y in equipedStuff) {
            if (equipedStuff[y] == stuffList[x].nom) {
              slotSupSum += stuffList[x].slotSup;
              this.slotSupSum = slotSupSum;
            }
          }
        }
      })
      .then(() => {
        /* calc number of slots used*/
        let equipedStuff = this.slots;
        let slotUsed = 0;
        for (let x in equipedStuff) {
          if (equipedStuff[x] != null && equipedStuff[x] != "") {
            slotUsed += 1;
            this.slotUsed = slotUsed;
          }
        }
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
          this.item.nom = response.data.item[0][0].nom;
          this.item.type = response.data.item[0][0].type;
          this.item.id = response.data.item[0][0].id;
          this.item.isUsed = response.data.item[0][0].isUsed;
          //this.item.image = response.data.item[0][0].image;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    /* fonction to add item in stuff*/
    putItem() {
      let idPerso = sessionStorage.getItem("userName");
      let seeItem = document.getElementById("item");
      let testSlot = this.slotSupSum + this.herosDescrFiltered.slot;
      console.log(testSlot);

      if (this.item.isUsed == true) {
        alert("Objet déjà utilisé");
      } else if (this.slotUsed >= testSlot) {
        alert("Inventaire plein");
      } else {
        for (let slot in this.slots) {
          if (this.slots[slot] == null) {
            this.slots[slot] = this.item.nom;
            let dataItems = {
              Slot1: this.slots.Slot1,
              Slot2: this.slots.Slot2,
              Slot3: this.slots.Slot3,
              Slot4: this.slots.Slot4,
              Slot5: this.slots.Slot5,
              Slot6: this.slots.Slot6,
              Slot7: this.slots.Slot7,
              Slot8: this.slots.Slot8,
              Slot9: this.slots.Slot9,
              Slot10: this.slots.Slot10,
              Slot11: this.slots.Slot11,
              Slot12: this.slots.Slot12,
              Slot13: this.slots.Slot13,
              Slot14: this.slots.Slot14,
              Slot15: this.slots.Slot15,
              Slot16: this.slots.Slot16,
              user: idPerso,
              updatedSlot: this.item.nom,
              updatedSlotId: this.item.id,
            };
            DataService.putItem(dataItems)
              .then((response) => {
                console.log(response.data);
              })
              .then(() => {
                seeItem.style.display = "none";
              })
              .then(() => {
                window.location.reload();
              })
              .catch((e) => {
                console.log(e);
              });

            return;
          }
        }
      }
    },
    /* fonction to show detailsBloc*/
    showDetailsBloc(e) {
      let target = e.target.firstChild.innerHTML;
      console.log(target);
      sessionStorage.setItem("target", target);
      document.getElementById("details").style.display = "initial";
    },
    /* fonction to close detailsBloc*/
    closeDetailsBloc() {
      document.getElementById("details").style.display = "none";
    },

    /* fonction to show item details*/
    showDetails() {
      console.log("yo");
      document.getElementById("itemDetails").style.display = "initial";
      let item = sessionStorage.getItem("target");
      for (let x in this.stuffList) {
        if (this.stuffList[x].nom == item) {
          this.itemDetail = this.stuffList[x];
        }
      }
    },
    /* fonction to close detailsBloc*/
    closeDetails() {
      document.getElementById("itemDetails").style.display = "none";
    },
    /* fonction to equip item*/
    equip() {
      console.log("yo");
    },
    /* fonction to give item*/
    give() {
      console.log("yo");
    },
    /* fonction to drop item*/
    drop() {
      console.log("yo");
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
.hidden {
  display: none;
}
.visible {
  display: initial;
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
.rang1 > button,
.rang2 > button,
.rang3 > button,
.rang4 > button {
  display: flex;
  gap: 5px;
  width: 100px;
  height: 100px;
  border: solid white;
  justify-content: center;
  align-items: center;
}
</style>
