<template>
  <div>
    <h1>Publication</h1>
    <hr />
  </div>

  <div>
    <label for="titre">Titre de la publication</label>
    <input type="text" class="form-control" id="titre" required v-model="pub.titre" name="titre" />
  </div>

  <div>
    <label for="description">description</label>
    <input type="text" id="description" required v-model="pub.description" name="description" />
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
      },
    };
  },
  methods: {
    publier() {
      var data = {
        titre: this.pub.titre,
        description: this.pub.description,
        userName: sessionStorage.getItem("userName"),
      };
      DataService.pub(data)
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
