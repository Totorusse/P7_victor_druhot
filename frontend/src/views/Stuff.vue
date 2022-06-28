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
  <div class="item-bloc">
    Main gauche : <span id="mainG" @click="showEquipBloc">{{ mainG }}</span>
  </div>
  <div class="item-bloc">
    Main droite :<span id="mainD" @click="showEquipBloc">{{ mainD }}</span>
  </div>
  <div id="equipDetails" class="hidden">
    <button @click="showEquipDetails">Détails</button><button @click="stock">Stocker</button
    ><button @click="showPlayers">Donner</button><button @click="dropFromHands">Jeter</button
    ><button @click="closeEquipBloc">X</button>
  </div>
  <div id="equipItemDetails" class="hidden">
    <div>Image (A ajouter) ; Nom : {{ itemDetail.nom }} ; Type : {{ itemDetail.type }}</div>
    <button @click="closeEquipDetails">X</button>
  </div>

  <div>Heros slots : {{ herosDescrFiltered.slot }}</div>
  <div>Items+ : {{ slotSupSum }}</div>
  <div>Total slots : {{ slotSupSum + herosDescrFiltered.slot }}</div>
  <div>Slots utilisés : {{ slotUsed }}</div>

  <div class="slots" id="slots">
    <div class="rang1">
      <button>
        <div id="slot1" class="divButton" @click="showDetailsBloc">{{ slots.slot1 }}</div>
      </button>
      <button>
        <div id="slot2" class="divButton" @click="showDetailsBloc">{{ slots.slot2 }}</div>
      </button>
      <button>
        <div id="slot3" class="divButton" @click="showDetailsBloc">{{ slots.slot3 }}</div>
      </button>
      <button>
        <div id="slot4" class="divButton" @click="showDetailsBloc">{{ slots.slot4 }}</div>
      </button>
    </div>
    <div class="rang2">
      <button>
        <div id="slot5" class="divButton" @click="showDetailsBloc">{{ slots.slot5 }}</div>
      </button>
      <button>
        <div id="slot6" class="divButton" @click="showDetailsBloc">{{ slots.slot6 }}</div>
      </button>
      <button>
        <div id="slot7" class="divButton" @click="showDetailsBloc">{{ slots.slot7 }}</div>
      </button>
      <button>
        <div id="slot8" class="divButton" @click="showDetailsBloc">{{ slots.slot8 }}</div>
      </button>
    </div>
    <div class="rang3">
      <button>
        <div id="slot9" class="divButton" @click="showDetailsBloc">{{ slots.slot9 }}</div>
      </button>
      <button>
        <div id="slot10" class="divButton" @click="showDetailsBloc">{{ slots.slot10 }}</div>
      </button>
      <button>
        <div id="slot11" class="divButton" @click="showDetailsBloc">{{ slots.slot11 }}</div>
      </button>
      <button>
        <div id="slot12" class="divButton" @click="showDetailsBloc">{{ slots.slot12 }}</div>
      </button>
    </div>
    <div class="rang4">
      <button>
        <div id="slot13" class="divButton" @click="showDetailsBloc">{{ slots.slot13 }}</div>
      </button>
      <button>
        <div id="slot14" class="divButton" @click="showDetailsBloc">{{ slots.slot14 }}</div>
      </button>
      <button>
        <div id="slot15" class="divButton" @click="showDetailsBloc">{{ slots.slot15 }}</div>
      </button>
      <button>
        <div id="slot16" class="divButton" @click="showDetailsBloc">{{ slots.slot16 }}</div>
      </button>
    </div>
  </div>
  <div id="details" class="hidden">
    <button @click="showDetails">Détails</button><button @click="equip">Equiper</button
    ><button @click="showPlayers">Donner</button><button @click="dropFromBag">Jeter</button
    ><button @click="closeDetailsBloc">X</button>
  </div>
  <div id="itemDetails" class="hidden">
    <div>Image (A ajouter) ; Nom : {{ itemDetail.nom }} ; Type : {{ itemDetail.type }}</div>
    <button @click="closeDetails">X</button>
  </div>
  <div id="players" class="hidden">
    <button v-for="players in connectedPlayers" :key="players" @click="give">
      {{ players }}
    </button>
    <button @click="closePlayers">X</button>
  </div>
  <div id="receivedItem">
    <button @click="putReceivedItem">Item reçu : {{ itemReceived }} ; Ajouter?</button>
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
      connectedPlayers: {},
      mainG: {},
      mainD: {},
      mainGType: {},
      mainDType: {},
      heros: {},
      herosDescr: [],
      herosDescrFiltered: [],
      item: {},
      itemDetail: {},
      itemReceived: {},
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
    /* display all infos */
    DataService.getAllInfo(userSession)
      .then((response) => {
        this.heros = response.data[0][0].heros;
        this.mainG = response.data[0][0].mainG;
        this.mainD = response.data[0][0].mainD;
        this.herosDescr = response.data[1];
        this.slots = response.data[2][0];
        this.stuffList = response.data[3];
        this.connectedPlayers = response.data[4].map(({ email }) => email);
        this.itemReceived = response.data[5][0]["received"];
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
    /* calc number of slots used*/
    slotNumber() {
      let equipedStuff = this.slots;
      let slotUsed = 0;
      for (let x in equipedStuff) {
        if (equipedStuff[x]) {
          slotUsed += 1;
        }
      }
      return (this.slotUsed = slotUsed);
    },
    /* calc extra slots from stuff*/
    slotTotal() {
      let stuffList = this.stuffList;
      let equipedStuff = this.slots;
      let slotSupSum = 0;
      for (let x in stuffList) {
        for (let y in equipedStuff) {
          if (equipedStuff[y] == stuffList[x].nom) {
            slotSupSum += stuffList[x].slotSup;
            this.slotSupSum = slotSupSum;
          }
        }
      }
      return (this.slotSupSum = slotSupSum);
    },

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
              slot1: this.slots.slot1,
              slot2: this.slots.slot2,
              slot3: this.slots.slot3,
              slot4: this.slots.slot4,
              slot5: this.slots.slot5,
              slot6: this.slots.slot6,
              slot7: this.slots.slot7,
              slot8: this.slots.slot8,
              slot9: this.slots.slot9,
              slot10: this.slots.slot10,
              slot11: this.slots.slot11,
              slot12: this.slots.slot12,
              slot13: this.slots.slot13,
              slot14: this.slots.slot14,
              slot15: this.slots.slot15,
              slot16: this.slots.slot16,
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
              .then(this.slotNumber())
              .then(this.slotTotal())
              .catch((e) => {
                console.log(e);
              });

            return;
          }
        }
      }
    } /* fonction to add  RECEIVED item in stuff*/,
    putReceivedItem() {
      let idPerso = sessionStorage.getItem("userName");
      let receivedItem = this.itemReceived;
      let testSlot = this.slotSupSum + this.herosDescrFiltered.slot;
      console.log(receivedItem);

      if (this.slotUsed >= testSlot) {
        alert("Inventaire plein");
      } else {
        for (let slot in this.slots) {
          if (this.slots[slot] == null) {
            this.slots[slot] = receivedItem;
            this.itemReceived = null;
            let dataItems = {
              slot1: this.slots.slot1,
              slot2: this.slots.slot2,
              slot3: this.slots.slot3,
              slot4: this.slots.slot4,
              slot5: this.slots.slot5,
              slot6: this.slots.slot6,
              slot7: this.slots.slot7,
              slot8: this.slots.slot8,
              slot9: this.slots.slot9,
              slot10: this.slots.slot10,
              slot11: this.slots.slot11,
              slot12: this.slots.slot12,
              slot13: this.slots.slot13,
              slot14: this.slots.slot14,
              slot15: this.slots.slot15,
              slot16: this.slots.slot16,
              user: idPerso,
              receivedItem: this.receivedItem,
            };
            DataService.receivedItem(dataItems)
              .then((response) => {
                console.log(response.data);
              })
              .then(this.slotNumber())
              .then(this.slotTotal())
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
      let target = e.target.innerHTML;
      let slot = e.target.id;
      sessionStorage.setItem("target", target);
      sessionStorage.setItem("slot", slot);
      document.getElementById("details").style.display = "initial";
      for (let x in this.stuffList) {
        if (this.stuffList[x].nom == target) {
          this.itemDetail = this.stuffList[x];
          console.log(this.itemDetail.nom);
        }
      }
    } /* fonction to show equiped items*/,
    showEquipBloc(e) {
      let equipTarget = e.target.innerHTML;
      let main = e.target.id;
      sessionStorage.setItem("equipTarget", equipTarget);
      sessionStorage.setItem("main", main);

      document.getElementById("equipDetails").style.display = "initial";
      for (let x in this.stuffList) {
        if (this.stuffList[x].nom == equipTarget) {
          this.itemDetail = this.stuffList[x];
        }
      }
    },
    /* fonction to close detailsBloc*/
    closeDetailsBloc() {
      document.getElementById("details").style.display = "none";
    },
    /* fonction to close equiped items*/
    closeEquipBloc() {
      document.getElementById("equipDetails").style.display = "none";
    },
    /* fonction to show item details*/
    showDetails() {
      document.getElementById("itemDetails").style.display = "initial";
      let item = sessionStorage.getItem("target");
      for (let x in this.stuffList) {
        if (this.stuffList[x].nom == item) {
          this.itemDetail = this.stuffList[x];
        }
      }
    },
    /* fonction to show item equiped*/
    showEquipDetails() {
      console.log("yo");
      document.getElementById("equipItemDetails").style.display = "initial";
      let item = sessionStorage.getItem("equipTarget");
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
    /* fonction to close equiped items*/
    closeEquipDetails() {
      document.getElementById("equipItemDetails").style.display = "none";
    },
    /* fonction to equip item*/
    equip() {
      let mainG = document.getElementById("mainG").innerHTML;
      let mainD = document.getElementById("mainD").innerHTML;
      let idPerso = sessionStorage.getItem("userName");

      let item = sessionStorage.getItem("target");
      let slot = sessionStorage.getItem("slot");

      //Gestion de l'équipement en fonction du type d'objet
      for (let x in this.stuffList) {
        if (this.stuffList[x].nom == item) {
          console.log(this.stuffList[x].type);
          if (this.stuffList[x].type == "objet") {
            alert("Vous ne pouvez pas équiper cet objet malandrin");
          } else if (this.stuffList[x].type == "arme2M" && (mainG || mainD)) {
            alert("Veuillez laisser vos mains libres pour utiliser une arme à 2 mains");
          } else if (this.stuffList[x].type == "arme1M" && mainG && mainD) {
            alert("Veuillez laisser vos mains libres pour utiliser une arme à 2 mains");
          } else if (
            this.stuffList[x].type == "arme1M" &&
            (this.mainGType == "arme2M" || this.mainDType == "arme2M")
          ) {
            alert("Vos 2 mains sont déjà prises !!!");
          } else {
            if (window.confirm("Equiper?")) {
              if (window.confirm("Main gauche? Sinon main droite")) {
                mainG = item;
                this.mainG = item;
                this.mainGType = this.itemDetail.type;
              } else {
                mainD = item;
                this.mainD = item;
                this.mainDType = this.itemDetail.type;
              }

              // Vide l'inventaire de l'objet choisi
              for (let item in this.slots) {
                if ((item = slot)) {
                  this.slots[item] = null;
                }
              }
              let dataItems = {
                slot1: this.slots.slot1,
                slot2: this.slots.slot2,
                slot3: this.slots.slot3,
                slot4: this.slots.slot4,
                slot5: this.slots.slot5,
                slot6: this.slots.slot6,
                slot7: this.slots.slot7,
                slot8: this.slots.slot8,
                slot9: this.slots.slot9,
                slot10: this.slots.slot10,
                slot11: this.slots.slot11,
                slot12: this.slots.slot12,
                slot13: this.slots.slot13,
                slot14: this.slots.slot14,
                slot15: this.slots.slot15,
                slot16: this.slots.slot16,
                user: idPerso,
                mainG: mainG,
                mainD: mainD,
              };

              DataService.equipItem(dataItems)
                .then((response) => {
                  console.log(response.data);
                })
                .then(this.slotNumber)
                .then(this.slotTotal)

                .catch((e) => {
                  console.log(e);
                });
            }
          }
        }
      }
    },
    /* fonction to stock item*/
    stock() {
      let item = sessionStorage.getItem("equipTarget");
      let main = sessionStorage.getItem("main");
      let idPerso = sessionStorage.getItem("userName");
      let testSlot = this.slotSupSum + this.herosDescrFiltered.slot;

      if (this.slotUsed >= testSlot) {
        alert("Veuillez laisser de la place dans le sac");
      } else {
        if (main == "mainG") {
          this.mainG = null;
          this.mainGType = null;
        } else if (main == "mainD") {
          this.mainD = null;
          this.mainDType = null;
        }
        for (let slot in this.slots) {
          if (this.slots[slot] == null) {
            this.slots[slot] = item;
            let dataItems = {
              slot1: this.slots.slot1,
              slot2: this.slots.slot2,
              slot3: this.slots.slot3,
              slot4: this.slots.slot4,
              slot5: this.slots.slot5,
              slot6: this.slots.slot6,
              slot7: this.slots.slot7,
              slot8: this.slots.slot8,
              slot9: this.slots.slot9,
              slot10: this.slots.slot10,
              slot11: this.slots.slot11,
              slot12: this.slots.slot12,
              slot13: this.slots.slot13,
              slot14: this.slots.slot14,
              slot15: this.slots.slot15,
              slot16: this.slots.slot16,
              mainG: this.mainG,
              mainD: this.mainD,
              user: idPerso,
              item: item,
            };
            DataService.equipItem(dataItems)
              .then((response) => {
                console.log(response.data);
              })
              .then(this.slotNumber)
              .then(this.slotTotal)

              .catch((e) => {
                console.log(e);
              });
            return;
          }
        }
      }
    },
    /* fonction to show player to give item*/
    showPlayers() {
      document.getElementById("players").style.display = "initial";
    },
    /* fonction to show player to give item*/
    closePlayers() {
      let players = document.getElementById("players");
      players.style.display = "none";
    },
    /* fonction to give item*/
    give(e) {
      let receiver = e.target.innerHTML;
      let itemToGive = sessionStorage.getItem("target");
      let slot = sessionStorage.getItem("slot");
      let giver = sessionStorage.getItem("userName");

      if (window.confirm(`Donner à ${receiver}?`)) {
        // Vide l'inventaire de l'objet choisi
        for (let item in this.slots) {
          if ((item = slot)) {
            this.slots[item] = null;
          }
        }
        let dataItems = {
          slot1: this.slots.slot1,
          slot2: this.slots.slot2,
          slot3: this.slots.slot3,
          slot4: this.slots.slot4,
          slot5: this.slots.slot5,
          slot6: this.slots.slot6,
          slot7: this.slots.slot7,
          slot8: this.slots.slot8,
          slot9: this.slots.slot9,
          slot10: this.slots.slot10,
          slot11: this.slots.slot11,
          slot12: this.slots.slot12,
          slot13: this.slots.slot13,
          slot14: this.slots.slot14,
          slot15: this.slots.slot15,
          slot16: this.slots.slot16,
          user: giver,
          receiver: receiver,
          itemToGive: itemToGive,
        };
        DataService.giveItem(dataItems)
          .then((response) => {
            console.log(response.data);
          })
          .then(() => {
            location.reload();
          })
          .catch((e) => {
            console.log(e);
          });
      }
    },
    /* fonction to drop equiped item*/
    dropFromHands() {
      let main = sessionStorage.getItem("main");
      let idPerso = sessionStorage.getItem("userName");
      if (window.confirm("Vraiment?")) {
        if (main == "mainG") {
          this.mainG = null;
          this.mainGType = null;
        } else if (main == "mainD") {
          this.mainD = null;
          this.mainDType = null;
        }
        let dataItems = {
          mainG: this.mainG,
          mainD: this.mainD,
          user: idPerso,
        };
        DataService.equipItem(dataItems)
          .then((response) => {
            console.log(response.data);
          })
          .then(this.slotNumber())
          .then(this.slotTotal())
          .catch((e) => {
            console.log(e);
          });
      }
    },
    /* fonction to drop item from bag*/
    dropFromBag() {
      //let slotSelected = sessionStorage.getItem("slot");
      let idPerso = sessionStorage.getItem("userName");
      let item = sessionStorage.getItem("target");

      if (window.confirm("Really?")) {
        for (let slot in this.slots) {
          if (this.slots[slot] == item) {
            this.slots[slot] = null;
            let dataItems = {
              slot1: this.slots.slot1,
              slot2: this.slots.slot2,
              slot3: this.slots.slot3,
              slot4: this.slots.slot4,
              slot5: this.slots.slot5,
              slot6: this.slots.slot6,
              slot7: this.slots.slot7,
              slot8: this.slots.slot8,
              slot9: this.slots.slot9,
              slot10: this.slots.slot10,
              slot11: this.slots.slot11,
              slot12: this.slots.slot12,
              slot13: this.slots.slot13,
              slot14: this.slots.slot14,
              slot15: this.slots.slot15,
              slot16: this.slots.slot16,
              user: idPerso,
            };
            DataService.equipItem(dataItems)
              .then((response) => {
                console.log(response.data);
              })
              .then(this.slotNumber())
              .then(this.slotTotal())
              .catch((e) => {
                console.log(e);
              });
            return;
          }
        }
      }
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
.divButton {
  border: solid;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
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
