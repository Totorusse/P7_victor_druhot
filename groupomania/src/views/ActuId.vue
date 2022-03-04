<template>
  <div>
    <h1>Actu : {{ actu.titre }}</h1>
    <!-- To get Id from URL -->
    <h1 id="routeNumber" class="routeNumber">{{ $route.params.id }}</h1>
    <hr />
  </div>
  <div>
    <router-link to="/actu" class="publish">Retour à l'actu</router-link>
    <div class="bloc__actu" :data-id="`${actu.id}`">
      <h1 class="titre">{{ actu.titre }}</h1>
      <p class="userName">(Créé par {{ actu.userName }} le {{ actu.createdAt }})</p>
      <div v-if="actu.image">
        <img :src="`${actu.image}`" />
      </div>
      <p>{{ actu.description }}</p>
      <div class="buttons" v-if="actu.userName == userSession || userSession == 'admin'">
        <button @click="deletePub">Supprimer</button>
        <button @click="modifyPub">Modifier</button>
      </div>
    </div>

    <div class="block__update" id="update">
      <div class="update">
        <div>
          <label for="titre">Nouveau titre</label><br />
          <input type="text" class="form-control" id="titre" required v-model="actu.titre" name="titre" />
        </div>

        <div>
          <label for="description">Nouvelle description</label><br />
          <input type="text" id="description" required v-model="actu.description" name="description" /><br />
          <label for="image">Modifier l'image : </label>
          <input type="file" id="image" name="image" @change="addImage" /><br />
          <button @click="updatePub">Mettre à jour</button>
        </div>
      </div>
    </div>

    <ul class="comment__list">
      <li class="comment__list__item" v-for="item in comments" :key="item">
        <router-link :to="`/actu/${actu.id}/comment`" class="link">
          <h4>{{ item.text }}</h4>
          <p class="userName">
            (Créé par {{ item.userName }} le <span class="date">{{ item.createdAt }})</span>
          </p>

          <div class="block__update" id="update">
            <div class="update">
              <div>
                <label for="description">Nouveau commentaire </label><br />
                <input type="text" id="description" required v-model="comment" name="description" />
                <button @click="updateComment">Mettre à jour</button>
              </div>
            </div>
          </div></router-link
        >
      </li>
    </ul>
  </div>
</template>

<script>
import DataService from "../services/DataService";
import router from "../router/index";

export default {
  name: "ActuId",
  data() {
    return {
      actu: {},
      comments: {},
      userSession: sessionStorage.getItem("userName"),
    };
  },
  mounted() {
    const id = document.getElementById("routeNumber").innerHTML;
    DataService.get(id)
      .then((response) => {
        this.actu = response.data[0];
        this.comments = response.data[1];
        console.log(response.data);
      })
      .then(() => {
        /* Change date format */
        this.actu.createdAt = this.actu.createdAt.split("T").shift();
        for (let i in this.comments) {
          this.comments[i].createdAt = this.comments[i].createdAt.split("T").shift();
        }
      })
      .catch((e) => {
        console.log(e);
      });
  },
  methods: {
    /* fonction to delete news */
    deletePub() {
      const id = document.getElementById("routeNumber").innerHTML;
      const userName = sessionStorage.getItem("userName");
      let dataDel = {
        userName: userName,
      };
      DataService.delete(id, dataDel)
        .then((response) => {
          console.log(response);
          router.push("/actu");
        })
        .catch((e) => {
          console.log(e);
        });
    },
    /* display form to modify */
    modifyPub() {
      document.getElementById("update").style.display = "initial";
      this.actu.file = {};
      this.actu.file.name = {};
      localStorage.removeItem("image");
    },
    /* fonction to update image */
    addImage(event) {
      this.actu.image = event.target.files[0].name;
      this.actu.file = event.target.files[0];
      let modifiedName = this.actu.image.split(" ").join("_");
      localStorage.setItem("image", modifiedName);
    },
    /* fonction to update news */
    updatePub() {
      const id = document.getElementById("routeNumber").innerHTML;
      const userName = sessionStorage.getItem("userName");
      const storedImage = localStorage.getItem("image");
      const fd = new FormData();
      fd.append("image", this.actu.file);
      /* request to post image in back */
      DataService.pubImage(fd)
        .then(() => {
          console.log("hooo");
        })
        .catch((e) => {
          console.log(e);
        });
      /* check if image in form */
      let dataUp = storedImage
        ? {
            titre: this.actu.titre,
            description: this.actu.description,
            userName: userName,
            file: storedImage,
          }
        : {
            titre: this.actu.titre,
            description: this.actu.description,
            userName: userName,
          };
      /* request to update */
      DataService.update(id, dataUp)
        .then((response) => {
          console.log(response.data);
          router.push("/actu");
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
  background-color: white;
}

.bloc__actu {
  border: solid;
  border-color: black;
  margin-top: 8px;
  list-style-type: none;
  color: black;
  background-color: white;
  border-radius: 8px;
}

.buttons {
  margin-bottom: 15px;
}

.comment__list {
  list-style-type: none;
  padding: 0;
  margin-top: 8px;
}

.comment__list__item {
  list-style-type: none;
  border: solid;
  border-color: black;
  list-style-type: none;
  background-color: white;
  border-radius: 8px;
}

#description {
  width: 80%;
}

#titre {
  width: 30%;
}
.update {
  margin-top: 15px;
  padding: 10px;
  line-height: 30px;
  border: solid;
}

.block__update {
  display: none;
}

img {
  width: 100%;
  height: 100%;
  max-height: 250px;
  object-fit: contain;
}

.link {
  padding: 0;
  margin: 0;
}

.publish {
  width: 100%;
  border-radius: 20px;
  background-color: #ffd7d7;
}

.routeNumber {
  display: none;
}

.userName {
  font-size: 10px;
}
</style>
