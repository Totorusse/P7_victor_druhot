<template>
  <h1>Jesus powa</h1>
  <hr />
  <div>
    Liste des joueurs connectés
    <ul class="list">
      <li class="list__item" v-for="item in users" :key="item">
        <h1 id="list__titre">Pseudo : {{ item.email }}</h1>
        <ul>
          <li v-for="(value, name) in item" :key="value">{{ name }}: {{ value }}</li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
import DataService from "../services/DataService";

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
    /* fonction to choose character*/
    choosePerso(event) {
      let target = event.target;
      let user = target.closest("li");
      let idPerso = user.dataset.id;
      let heros = target.previousElementSibling.value;
      let dataPerso = {
        user: idPerso,
        heros: heros,
      };
      console.log(idPerso);

      DataService.persoChoosed(dataPerso)
        .then((response) => {
          console.log(response.data);
          location.reload();
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
