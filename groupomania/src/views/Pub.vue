<template>
  <div>
    <h1>Publication</h1>
    <hr />
  </div>

  <div>
    <label for="titre">Titre de la publication</label>
    <input type="text" class="form-control" id="titre" required v-model="pub.titre" name="titre" />
    <label for="description">description</label>
    <input type="text" id="description" required v-model="pub.description" name="description" />
    <label for="image">Ajouter une image : </label>
    <input type="file" id="image" name="image" @change="addImage" />
    <button @click="publier">Publier</button>
    <router-link to="/actu" class="retour">Retour à l'actu</router-link>
  </div>
</template>

<script>
import DataService from "../services/DataService";
import router from "../router/index";

export default {
  name: "Pub",
  data() {
    return {
      pub: {
        id: null,
        titre: "",
        description: "",
        userName: "",
        image: "",
        file: "",
      },
    };
  },
  methods: {
    publier() {
      var data = {
        titre: this.pub.titre,
        description: this.pub.description,
        userName: sessionStorage.getItem("userName"),
        image: this.pub.image.split(" ").join("_"),
      };
      const fd = new FormData();
      fd.append("image", this.pub.file);
      DataService.pubImage(fd)
        .then(() => {
          console.log("hooo");
        })
        .catch((e) => {
          console.log(e);
        });
      DataService.pub(data)
        .then((response) => {
          console.log(response.data);
          router.push("/actu");
        })
        .catch((e) => {
          console.log(e);
        });
    },
    addImage(event) {
      this.pub.image = event.target.files[0].name;
      this.pub.file = event.target.files[0];
      console.log(this.pub.file);
    },
  },
};
</script>

<style scoped>
/* Full-width inputs */
input[type="text"],
input[type="password"] {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  box-sizing: border-box;
}

/* Set a style for  button */
button {
  background-color: #24e71d;
  color: rgb(0, 0, 0);
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 100%;
  font-size: 15px;
}

/* Add a hover effect for buttons */
button:hover {
  opacity: 0.8;
}

/* Small size for return button */
.retour {
  width: 50%;
  font-size: 12px;
  line-height: 1px;
  background-color: white;
  color: blue;
}
</style>
