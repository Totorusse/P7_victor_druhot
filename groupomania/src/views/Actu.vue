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
          {{ item.description }}
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
a {
  background-color: dodgerblue;
}
</style>
