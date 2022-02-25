<template>
  <div>
    <h1>Actu</h1>
    <hr />
  </div>
  <div>
    <router-link to="/pub" class="publish">Publier une actu</router-link>
    <h4>Toute l'actualité</h4>
    <ul class="list">
      <li class="list__item" v-for="item in actu" :key="item">
        <router-link :to="`/actu/${item.id}`" class="link">
          <h4>{{ item.titre }}</h4>
          <p class="userName">(Créé par {{ item.userName }})</p>
          <p>{{ item.description }}</p>
          <p>{{ item.id }}</p>
          <div v-if="item.image">
            <img :src="`${item.image}`" />
          </div>
        </router-link>
        <button @click="addComment">Ajouter un commentaire</button><br />
        <div class="comment" id="commentDiv">
          <input
            type="text"
            id="commentText"
            required
            v-model="comment.text"
            :data-id="`${item.id}`"
            name="commentText"
          /><br />
          <button @click="pubComment">Publier votre commentaire</button><br />
        </div>
        <router-link :to="`/actu/${item.id}/comment`" class="link">Voir les commentaires </router-link>
      </li>
      <li></li>
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
      comment: {},
    };
  },
  /* display all news */
  mounted() {
    DataService.getAll()
      .then((response) => {
        this.actu = response.data;
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  },
  methods: {
    /* fonction to show comment input*/
    addComment() {
      document.getElementById("commentDiv").style.display = "initial";
    },
    /* fonction to publish comment */
    pubComment() {
      let actuId = document.getElementById("commentText");
      let comment = {
        text: this.comment.text,
        userName: sessionStorage.getItem("userName"),
        pubId: actuId.dataset.id,
      };
      DataService.pubComment(comment)
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
