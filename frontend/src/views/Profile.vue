<template>
  <div>
    <h1>Mon profil</h1>
    <button @click="DelAccount">Supprimer mon compte</button>
    <hr />
  </div>
  <div>
    <router-link to="/actu" class="publish">Retour à l'actu</router-link>
    <h1>Mes publications</h1>
    <ul class="list">
      <li class="list__item" v-for="item in actu" :key="item">
        <router-link :to="`/actu/${item.id}`" class="link">
          <h4>{{ item.titre }}</h4>
          <p class="userName">(Créé par {{ item.userName }})</p>
          <div v-if="item.image">
            <img :src="`${item.image}`" />
          </div>
          <p>{{ item.description }}</p>
        </router-link>
      </li>
    </ul>

    <h1>Mes commentaires</h1>
    <ul class="list">
      <li class="list__item" v-for="item2 in comments" :key="item2">
        <router-link :to="`/actu/${item2.pubId}`" class="link">
          <h4 class="comment">{{ item2.text }}</h4>
          <p class="comment">Publication N°{{ item2.pubId }}</p>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import DataService from "../services/DataService";
import router from "../router/index";

export default {
  name: "Actu",
  data() {
    return {
      actu: {},
      comments: {},
    };
  },
  /* display posted news */
  mounted() {
    let user = sessionStorage.getItem("userName");
    DataService.getMyProfile(user)
      .then((response) => {
        this.actu = response.data[0];
        this.comments = response.data[1];
      })
      .catch((e) => {
        console.log(e);
      });
  },
  methods: {
    /* fonction to reload page*/
    delayedFunction() {
      location.reload();
    },
    /* fonction to delete account*/
    DelAccount() {
      if (confirm("Voulez-vous vraiment supprimer votre compte ?") == true) {
        let user = sessionStorage.getItem("userName");
        DataService.deleteAccount(user)
          .then((response) => {
            console.log(response);
          })
          .then(() => {
            sessionStorage.setItem("token", "");
            router.push("/");
            window.setTimeout(this.delayedFunction, 500);
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
a {
  background-color: white;
}

.comment {
  margin: 0;
}

.list__item {
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

img {
  width: 100%;
  height: 100%;
  max-height: 250px;
  object-fit: contain;
}

.publish {
  width: 100%;
  border-radius: 20px;
  background-color: #ffd7d7;
}

.userName {
  font-size: 10px;
}
</style>
