<template>
  <div>
    <h1>Actu</h1>
    <hr />
  </div>
  <div>
    <router-link to="/pub" class="publish">Publier une actu</router-link>
    <h4>Toute l'actualité</h4>
    <ul class="list">
      <li class="list__item" v-for="item in actu" :key="item" :data-id="`${item.id}`">
        <router-link :to="`/actu/${item.id}`" class="link">
          <h4>{{ item.titre }}</h4>
          <p class="userName">(Créé par {{ item.userName }} le {{ item.createdAt }})</p>
          <p>{{ item.description }}</p>
          <div v-if="item.image">
            <img :src="`${item.image}`" />
          </div>
        </router-link>
        <button @click="like">J'aime</button><button @click="dislike">Je n'aime pas</button><br />
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
        <router-link :to="`/actu/${item.id}/comment`" class="link">Commentaires </router-link>

        <button @click="countComments">Voir les commentaires</button>
        <div class="commentsParent">
          <div class="comments" id="comments" v-for="item2 in comment" :key="item2">
            <div v-if="item2.pubId == item.id" class="commentsPar">
              {{ item2.userName }} (le {{ item2.createdAt }}): {{ item2.text }}
            </div>
          </div>
        </div>
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
      comment: {},
    };
  },
  mounted() {
    console.log(this.actu[0]);
    /* display all news */
    DataService.getAll()
      .then((response) => {
        this.actu = response.data.actuAndComments[0];
        this.comment = response.data.actuAndComments[1];
      })
      .catch((e) => {
        console.log(e);
      });
  },
  methods: {
    /* fonction to show comment input*/
    addComment(event) {
      let target = event.target;
      let commentDiv = target.nextSibling.nextSibling;
      commentDiv.style.display = "initial";
    },
    /* fonction to publish comment */
    pubComment(event) {
      let target = event.target;
      let commentDiv = target.closest("div");
      let input = commentDiv.querySelector("input");

      let comment = {
        text: input.value,
        userName: sessionStorage.getItem("userName"),
        pubId: input.dataset.id,
      };
      DataService.pubComment(comment)
        .then((response) => {
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    /* fonction to count et show comments */
    countComments(comm) {
      let comment = comm.target;
      let comments = comment.nextElementSibling;
      let numberComments = comments.getElementsByClassName("commentsPar").length;
      comments.style.visibility = "initial";
      comment.innerHTML = `Commentaires: ${numberComments}`;
      console.log(comments);
      console.log(numberComments);
    },

    /* fonction to like comment */
    like(event) {
      let target = event.target;
      let likeLi = target.closest("li");
      let number = { value: 1, userName: sessionStorage.getItem("userName"), actuId: likeLi.dataset.id };
      DataService.like(number)
        .then((response) => {
          console.log(response.data);
        })
        .then(() => {
          target.disabled = "true";
          target.style.color = "green";
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

.commentsParent {
  visibility: hidden;
}
</style>
