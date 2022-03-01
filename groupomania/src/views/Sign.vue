<template>
  <div>
    <h1>Inscription</h1>
    <p>Merci de remplir le formulaire ci-dessous pour vous inscrire</p>
    <hr />

    <div>
      <label for="email">Nom d'utilisateur</label>
      <input type="text" id="email" required v-model="user.email" name="email" />
    </div>
    <div>
      <label for="psw">Mot de passe</label>
      <input type="text" id="psw" required v-model="user.psw" name="psw" />
      <button @click="saveUser">S'inscrire</button>
      <p id="error"></p>
      <router-link to="/login" class="retour">Déjà inscrit ?</router-link>
    </div>
  </div>
</template>

<script>
import DataService from "../services/DataService";
import router from "../router/index";

export default {
  name: "Sign",
  data() {
    return {
      user: {
        id: null,
        email: "",
        psw: "",
      },
    };
  },
  methods: {
    saveUser() {
      var data = {
        email: this.user.email,
        psw: this.user.psw,
      };
      DataService.create(data)
        .then((response) => {
          this.user.id = response.data.id;
          console.log(response.data);
          sessionStorage.setItem("userName", response.data.email);
          router.push("/login");
        })
        .catch((e) => {
          document.getElementById("error").innerHTML = e.response.data.message;
          console.log(e);
        });
    },
  },
  //fonction to hide buttons
  mounted() {
    if (router.currentRoute.value.name == "sign") {
      console.log("ok");
      document.getElementById("hidden").style.display = "none";
    }
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
  background-color: #ffd7d7;
  color: black;
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

/* big red error */
#error {
  color: red;
  font-size: 24px;
}
</style>
