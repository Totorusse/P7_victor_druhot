<template>
  <h1>{{ heros }}</h1>
  <div id="user-nav">
    <button @click="story" class="story-button">Chroniques</button>
    <button @click="stat" class="stat-button">Statistiques</button>
    <button @click="stuff" class="stuff-button">Inventaire</button>
  </div>

  <hr />
  <div>
    <div>{{ herosDescr }}</div>
    <ul class="list">
      <li class="list__item" v-for="item in actu" :key="item" :data-id="`${item.id}`">
        <router-link :to="`/actu/${item.id}`" class="link" id="pub__link">
          <h1 id="list__titre">{{ item.titre }}</h1>
          <p class="userName">
            (Créé par {{ item.userName }} le <span class="date">{{ item.createdAt }})</span>
          </p>
          <div class="image" v-if="item.image">
            <img :src="`${item.image}`" />
          </div>
          <p class="description__text">{{ item.description }}</p>
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
            placeholder="Que pensez-vous de ma publication ?"
          /><br />
          <button @click="pubComment">Publier votre commentaire</button><br />
        </div>

        <router-link :to="`/actu/${item.id}`" class="link" id="comment__link">
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
import router from "../router/index";

export default {
  name: "Actu",
  data() {
    return {
      userSession: sessionStorage.getItem("userName"),
      heros: {},
      herosDescr: {},
    };
  },

  mounted() {
    let userSession = sessionStorage.getItem("userName");
    /* display all news */
    DataService.getAllInfo(userSession)
      .then((response) => {
        this.heros = response.data[0][0].heros;
        this.herosDescr = response.data[1];
        console.log(response.data[1]);
      })
      .catch((e) => {
        console.log(e);
      });
  },

  methods: {
    story() {
      router.push("/story");
    },
    stat() {
      router.push("/stat");
    },
    stuff() {
      router.push("/stuff");
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
  display: none;
  height: 50px;
  border-radius: 20px;
}

.commentsParent {
  display: none;
}

#comment__link {
  padding: 0;
  margin: 0 0 5px 0;
}

#commentText {
  width: 70%;
  border: solid;
  border-radius: 12px;
  text-align: center;
}

.description__text {
  margin: 5px 0 0 0;
  font-size: 18px;
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

#pub__link {
  margin-bottom: 0;
}

.userName {
  margin-top: -10px;
  font-size: 12px;
}
</style>
