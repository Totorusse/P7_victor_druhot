<template>
  <div>
    <h1>Actu</h1>
    <!-- To get Id from URL -->
    <h1 id="routeNumber" class="routeNumber">{{ $route.params.id }}</h1>
    <hr />
  </div>
  <div>
    <router-link to="/actu" class="publish">Retour à l'actu</router-link>
    <div class="bloc__actu">
      <h4>{{ actu.titre }}</h4>
      <p>{{ actu.description }}</p>
      <button @click="deletePub">Supprimer</button>
      <button @click="modifyPub">Modifier</button>
    </div>
    <div class="block__update" id="update">
      <div class="update">
        <div>
          <label for="titre">Nouveau titre</label><br />
          <input type="text" class="form-control" id="titre" required v-model="actu.titre" name="titre" />
        </div>
        <div>
          <label for="description">Nouvelle description </label><br />
          <input type="text" id="description" required v-model="actu.description" name="description" /><br />
          <button @click="updatePub">Mettre à jour</button>
        </div>
      </div>
    </div>
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
    };
  },
  mounted() {
    const id = document.getElementById("routeNumber").innerHTML;
    DataService.get(id)
      .then((response) => {
        this.actu = response.data;
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  },
  methods: {
    /* fonction to delete news */
    deletePub() {
      const id = document.getElementById("routeNumber").innerHTML;
      DataService.delete(id)
        .then((response) => {
          console.log(response.data);
          router.push("/actu");
        })
        .catch((e) => {
          console.log(e);
        });
    },
    /* display form to modify */
    modifyPub() {
      document.getElementById("update").style.display = "initial";
    },
    /* fonction to update news */
    updatePub() {
      const id = document.getElementById("routeNumber").innerHTML;
      var data = {
        titre: this.actu.titre,
        description: this.actu.description,
      };
      DataService.update(id, data)
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

.routeNumber {
  display: none;
}

.bloc__actu {
  border: solid;
  border-color: black;
  padding: 0;
  margin-top: 4px;
  list-style-type: none;
  background-color: dodgerblue;
  margin-bottom: 20px;
}

.update {
  padding: 10px;
  line-height: 30px;
  border: solid;
}

.block__update {
  display: none;
}

a {
  background-color: dodgerblue;
}
</style>
