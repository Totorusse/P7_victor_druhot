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
        <p class="userName">
          (Créé par {{ item.userName }} le <span class="date">{{ item.createdAt }})</span>
        </p>
        <p>{{ item.description }}</p>

        <div class="buttons" v-if="item.userName == userSession || userSession == 'admin'">
          <button @click="deleteComment">Supprimer</button>
          <button @click="modifyComment">Modifier</button>
        </div>

        <div class="block__update" id="update">
          <div class="update">
            <div>
              <label for="description">Nouveau commentaire </label><br />
              <input
                type="text"
                id="description"
                required
                v-model="comment.description"
                name="description"
              /><br />
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
import router from "../router/index";

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
      })
      .then(() => {
        /* keep only date */
        for (let i in this.comment) {
          this.comment[i].createdAt = this.comment[i].createdAt.split("T").shift();
        }
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
          router.push(`/actu/${idRoute}`);
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

a {
  background-color: dodgerblue;
}

.block__update {
  display: none;
}

.buttons {
  margin-bottom: 15px;
}

.comment {
  display: none;
}

.list__item {
  list-style-type: none;
  border: solid;
  border-color: black;
  color: black;
  list-style-type: none;
  background-color: white;
  border-radius: 8px;
}

label {
  font-size: 16px;
  font-weight: bold;
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

.routeNumber {
  display: none;
}

.update {
  padding: 10px;
  line-height: 30px;
  border: solid;
}

.userName {
  font-size: 10px;
}
</style>
