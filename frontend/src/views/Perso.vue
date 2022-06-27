<template>
  <h1>Choisir mon personnage</h1>
  <hr />
  <div class="main">
    <form class="code">
      <input type="text" placeholder="Code" id="code" /><button @click="sendCode" id="sendCode">
        Nouveau
      </button>
    </form>
    <div class="perso-chosen">
      Perso : {{ perso.nom }}
      <div class="image" v-if="perso.image">
        <img :src="`${perso.image}`" />
      </div>
      <span class="select"><button @click="choosePerso" id="choose">Sélectionner</button></span>
    </div>
  </div>
</template>

<script>
import DataService from "../services/DataService";
import router from "../router/index";

export default {
  name: "perso",
  data() {
    return {
      perso: {},
    };
  },

  mounted() {},

  methods: {
    /* fonction to send code for character*/
    sendCode() {
      let codeValue = document.getElementById("code").value;
      let code = { code: codeValue };
      DataService.persoCode(code)
        .then((response) => {
          this.perso.nom = response.data.perso[0][0].nom;
          this.perso.image = response.data.perso[0][0].image;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    /* fonction to choose character*/
    choosePerso() {
      let idPerso = sessionStorage.getItem("userName");
      let dataPerso = {
        heros: this.perso,
        user: idPerso,
        isConnected: true,
      };
      sessionStorage.setItem("userHeros", this.perso.nom);

      DataService.persoChoosed(dataPerso)
        .then(() => {
          router.push("/story");
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
};
</script>

<style scoped>
/* Set  style for view only */
* {
  box-sizing: border-box;
}
a {
  background-color: white;
}

.description__text {
  margin: 5px 0 0 0;
  font-size: 18px;
}

img {
  height: 250px;
  width: 250px;
  object-fit: cover;
}

.list__item {
  border: solid;
  margin: 8px;
  list-style-type: none;
  background-color: white;
  border-radius: 8px;
  width: 45%;
  color: black;
  padding: 15px;
}

.list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  list-style-type: none;
  padding: 0;
  margin: 0;
}

#list__titre {
  margin-top: -5px;
}

.publish {
  width: 100%;
  border-radius: 20px;
  background-color: #ffd7d7;
}

#pub__link {
  margin-bottom: 0;
}

.userName {
  margin-top: -10px;
  font-size: 12px;
}
</style>
