<template>
  <h1>Actu</h1>
  <hr />
  <div>
    <router-link to="/pub" class="publish">Publier une actu</router-link>
    <h1>Toute l'actualité</h1>
    <ul class="list">
      <li class="list__item" v-for="item in actu" :key="item" :data-id="`${item.id}`">
        <router-link :to="`/actu/${item.id}`" class="link">
          <h1 id="list__titre">{{ item.titre }}</h1>
          <p class="userName">
            (Créé par {{ item.userName }} le <span class="date">{{ item.createdAt }})</span>
          </p>
          <div class="image" v-if="item.image">
            <img :src="`${item.image}`" />
          </div>
          <p>{{ item.description }}</p>
        </router-link>
        <button @click="addComment" id="addComm">Ajouter un commentaire</button><br />
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

        <router-link :to="`/actu/${item.id}`" class="link" id="link">
          <button @click="countComments" class="numberComment"></button>
          <div class="commentsParent">
            <div class="comments" id="comments" v-for="item2 in comment" :key="item2">
              <p v-if="item2.pubId == item.id" class="commentsPar">
                {{ item2.userName }} (le {{ item2.createdAt }}): {{ item2.text }}
              </p>
            </div>
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
      comment: {},
    };
  },

  mounted() {
    /* display all news */
    DataService.getAll()
      .then((response) => {
        this.actu = response.data.actuAndComments[0];
        this.comment = response.data.actuAndComments[1];
      })
      .then(() => {
        /* keep only date */
        for (let i in this.actu) {
          this.actu[i].createdAt = this.actu[i].createdAt.split("T").shift();
        }
        for (let j in this.comment) {
          this.comment[j].createdAt = this.comment[j].createdAt.split("T").shift();
        }
      })
      .then(() => {
        /* count number of comments */
        this.countComments();
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
          location.reload();
        })
        .catch((e) => {
          console.log(e);
        });
    },
    /* fonction to count et show comments */
    countComments() {
      let numberComments = document.getElementsByClassName("commentsParent");
      let length = numberComments.length;
      let numberInner = document.getElementsByClassName("numberComment");
      for (let i = 0; i < length; i++) {
        let number = numberComments[i].querySelectorAll("p").length;
        numberInner[i].innerHTML = `Voir les commentaires : ${number}`;
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

#addComm {
  margin-bottom: 15px;
}

.comment {
  display: none;
  height: 50px;
  border-radius: 20px;
}

.commentsParent {
  display: none;
}

#commentText {
  width: 70%;
  border: solid;
}

img {
  width: 100%;
  height: 100%;
  max-height: 500px;
  object-fit: contain;
}

.list__item {
  border: solid;
  margin-top: 8px;
  list-style-type: none;
  background-color: white;
  border-radius: 8px;
}

.list {
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

.userName {
  margin-top: -10px;
  font-size: 12px;
}
</style>
