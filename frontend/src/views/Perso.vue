<template>
  <div class="main">
    <h1>ORA</h1>
    <h2>L'appel souterrain</h2>
    <div class="logo"><img id="logo" src="../assets/Logo_accueil.svg" /></div>
  </div>
  <div>
    <form class="code">
      <input type="text" id="code" /><button @click="sendCode" id="sendCode" class="w50 button1">
        NOUVEAU
      </button>
    </form>
    <div class="perso-chosen">
      <span class="nom"> {{ perso.nom }}</span>
      <div class="image" v-if="perso.image">
        <img :src="`${perso.image}`" />
      </div>
      <span class="select"
        ><button class="button1" @click="choosePerso" id="choose">S&Eacute;LECTIONNER</button></span
      >
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
h1 {
  color: #ffb300;
  letter-spacing: 8px;
}
h2 {
  font-size: 18px;
  letter-spacing: 4px;
}
/* Set  size for logo */
.logo {
  display: flex;
  justify-content: center;
  padding: 25px;
}
#logo {
  position: relative;
  width: 70px;
}
.main {
  margin-top: 55px;
}
.description__text {
  margin: 5px 0 0 0;
  font-size: 18px;
}

.w50 {
  width: 45%;
}

.userName {
  margin-top: -10px;
  font-size: 12px;
}

input {
  background-color: #2a3849;
  color: #ffb300;
  padding: 14px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 45%;
  font-size: 15px;
  margin-right: 10px;
}

.perso-chosen {
  margin-top: 50px;
}

.nom {
  font-size: 22px;
  padding: 15px;
}

.image {
  padding: 15px;
}
.image img {
  object-fit: cover;
  width: 200px;
  height: 200px;
  border-radius: 100%;
}
</style>
