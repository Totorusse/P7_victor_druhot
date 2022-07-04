<template>
  <h1>Jesus powa</h1>
  <div id="user-nav">
    <button @click="joueur">Joueurs</button>
    <button @click="stat">Heros</button>
    <button @click="equipement">Equipement</button>
    <button @click="don">Dons d'objets</button>
  </div>
  <hr />
  <h2>Liste des héros</h2>
  <div class="modifUser">id du joueur à modifier : <input id="user" type="text" /></div>
  <div class="modifUser">Champ à modifier : <input id="champ" type="text" /></div>
  <div class="modifUser">Valeur à modifier : <input id="value" type="text" /></div>
  <button @click="updateUser">Mettre à jour</button>
  <div>
    <ul class="list">
      <li class="list__item" v-for="item in heros" :key="item">
        <h1 id="list__titre">Héros : {{ item.nom }}</h1>
        <ul>
          <li v-for="(value, name) in item" :key="value">{{ name }}: {{ value }}</li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
import DataService from "../services/DataService";
import router from "../router/index";

export default {
  name: "perso",
  data() {
    return {
      users: {},
      heros: {},
      gift: {},
      stuff: {},
    };
  },

  mounted() {
    /* display all news */
    DataService.getAllUsers()
      .then((response) => {
        this.users = response.data.allInfo[0];
        this.heros = response.data.allInfo[1];
        this.gift = response.data.allInfo[2];
        this.stuff = response.data.allInfo[3];
      })
      .catch((e) => {
        console.log(e);
      });
  },

  methods: {
    joueur() {
      router.push("/admin");
    },
    stat() {
      router.push("/admin/heros");
    },
    equipement() {
      router.push("/admin/stuff");
    },
    don() {
      router.push("/admin/don");
    },

    /* fonction to update user */
    updateUser() {
      const id = document.getElementById("user").value;
      const champ = document.getElementById("champ").value;
      const value = document.getElementById("value").value;
      console.log(id);
      console.log(champ);
      console.log(value);

      const data = { id: id, champ: champ, value: value };
      /* request to update */
      DataService.updateUser(data)
        .then((response) => {
          console.log(response.data);
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
  text-align: left;
}

#list__titre {
  margin-top: -5px;
  text-align: center;
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
