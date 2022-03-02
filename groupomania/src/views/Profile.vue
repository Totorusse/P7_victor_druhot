<template>
  <div>
    <h1>Mon profil</h1>
    <button @click="DelAccount">Supprimer mon compte</button>
    <hr />
  </div>
  <div>
    <router-link to="/actu" class="publish">Retour à l'actu</router-link>
    <h4>Mes publications</h4>
    <ul class="list">
      <li class="list__item" v-for="item in actu" :key="item">
        <router-link :to="`/actu/${item.id}`" class="link">
          <h4>{{ item.titre }}</h4>
          <p class="userName">(Créé par {{ item.userName }})</p>
          <p>{{ item.description }}</p>
          <div v-if="item.image">
            <img :src="`${item.image}`" />
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import DataService from "../services/DataService";

export default {
  name: "Actu",
  data() {
    return {
      actu: {},
    };
  },
  /* display posted news */
  mounted() {
    let user = sessionStorage.getItem("userName");
    DataService.getMyProfile(user)
      .then((response) => {
        this.actu = response.data;
      })
      .catch((e) => {
        console.log(e);
      });
  },
  methods: {
    /* fonction to delete account*/
    DelAccount() {
      if (confirm("Voulez-vous vraiment supprimer votre compte ?") == true) {
        console.log("ok");
        let user = sessionStorage.getItem("userName");
        DataService.DeleteAccount(user)
          .then((response) => {
            console.log(response);
          })
          .catch((e) => {
            console.log(e);
          });
      }
    },
  },
};
</script>

<style scoped>
/* Set  style for view only */
.list__item {
  border: solid;
  border-color: black;
  padding: 0;
  margin-top: 4px;
  list-style-type: none;
  background-color: dodgerblue;
}

.list {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.publish {
  width: 100%;
  border-radius: 20px;
  background-color: #ffd7d7;
}

.userName {
  font-size: 10px;
}

a {
  background-color: dodgerblue;
}

.comment {
  display: none;
}
</style>
