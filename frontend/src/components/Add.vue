<template>
  <div class="submit-form">
    <div class="form-group">
      <label for="title">Email</label>
      <input type="text" class="form-control" id="title" required v-model="tutorial.title" name="title" />
    </div>
    <div class="form-group">
      <label for="description">Mot de passe</label>
      <input
        class="form-control"
        id="description"
        required
        v-model="tutorial.description"
        name="description"
      />
      <button @click="saveUser" class="btn btn-success">Submit</button>
    </div>
  </div>
</template>

<script>
import DataService from "../services/DataService";
export default {
  name: "Add",
  data() {
    return {
      tutorial: {
        id: null,
        title: "",
        description: "",
        published: false,
      },
      submitted: false,
    };
  },
  methods: {
    saveUser() {
      var data = {
        title: this.tutorial.title,
        description: this.tutorial.description,
      };
      DataService.create(data)
        .then((response) => {
          this.tutorial.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
};
</script>
<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>
