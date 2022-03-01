<template>
  <div>
    <h1>Commentaires</h1>
    <!-- To get Id from URL -->
    <h1 id="routeNumber" class="routeNumber">{{ $route.params.id }}</h1>
    <hr />
  </div>
  <div>
    <router-link to="/actu" class="publish">Retour à l'actu</router-link>
    <ul class="list">
      <li class="list__item" v-for="item in comment" :key="item" :data-id="`${item.id}`">
        <h4>{{ item.text }}</h4>
        <p class="userName">(Créé par {{ item.userName }} le {{ item.date }})</p>
        <p>{{ item.description }}</p>

        <div class="buttons" v-if="item.userName == userSession">
          <button @click="deleteComment">Supprimer</button>
          <button @click="modifyComment">Modifier</button>
        </div>

        <div class="block__update" id="update">
          <div class="update">
            <div>
              <label for="description">Nouveau commentaire </label><br />
              <input type="text" id="description" required v-model="comment.description" name="description" />
              <button @click="updateComment">Mettre à jour</button>
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
      comment: {},
      userSession: sessionStorage.getItem("userName"),
    };
  },
  mounted() {
    /* display all news */
    const id = document.getElementById("routeNumber").innerHTML;
    DataService.getAllComments(id)
      .then((response) => {
        this.comment = response.data;
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  },
  methods: {
    /* fonction to delete news */
    deleteComment(event) {
      /* get id */
      let target = event.target;
      let list = target.closest("li");
      let id = list.dataset.id;
      const userName = sessionStorage.getItem("userName");
      /* request to delete comment */
      let dataDel = {
        id: id,
        userName: userName,
      };
      DataService.deleteComment(dataDel)
        .then((response) => {
          console.log(response.data);
        })
        .then(() => {
          location.reload();
        })
        .catch((e) => {
          console.log(e);
        });
    },
    /* display form to modify */
    modifyComment(event) {
      let target = event.target;
      let commentDiv = target.closest("div").nextSibling;
      commentDiv.style.display = "initial";
    },
    /* fonction to update news */
    updateComment(event) {
      /* get id */
      let target = event.target;
      let list = target.closest("li");
      let id = list.dataset.id;
      const userName = sessionStorage.getItem("userName");
      /* get text */
      let commentDiv = target.closest("div");
      let text = commentDiv.querySelector("input").value;
      /* request to update comment */
      const idRoute = document.getElementById("routeNumber").innerHTML;

      let dataDel = {
        id: id,
        userName: userName,
        text: text,
      };
      DataService.updateComment(idRoute, dataDel)
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

.routeNumber {
  display: none;
}

.update {
  padding: 10px;
  line-height: 30px;
  border: solid;
}

.block__update {
  display: none;
}

.userName {
  font-size: 10px;
}
</style>
