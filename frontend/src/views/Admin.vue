<template>
  <h1>Jesus powa</h1>
  <hr />
  <div>
    Liste des joueurs
    <ul class="list">
      <li class="list__item" v-for="item in users" :key="item" :data-id="`${item.email}`">
        <h1 id="list__titre">{{ item.email }}</h1>
        <p>Heros : {{ item.heros }}</p>
        <div class="herosDiv">
          <label for="heros">Choisir un héros</label><br /><br />
          <select>
            <option value="abbie-lothyne">abbie-lothyne</option>
            <option value="blenir-sunrion">blenir-sunrion</option>
            <option value="drumlin">drumlin</option>
            <option value="erdo">erdo</option>
          </select>
          <button @click="choosePerso" id="choosePerso">Attribuer le héros</button><br />
        </div>
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
    };
  },

  mounted() {
    /* display all news */
    DataService.getAllUsers()
      .then((response) => {
        this.users = response.data.users[0];
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
