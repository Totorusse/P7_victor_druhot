<template>
  <div>
    <h1>Connexion</h1>
    <hr />
    <div>
      <label for="email">Nom d'utilisateur</label>
      <input type="text" class="form-control" id="email" required v-model="user.email" name="email" />
    </div>
    <div>
      <label for="psw">Mot de passe</label>
      <input type="password" id="psw" required v-model="user.psw" name="psw" />
      <button @click="checkUser">Se connecter</button>
      <p id="error"></p>
    </div>
    <router-link to="/sign" class="retour">Pas encore inscrit ?</router-link>
  </div>
</template>

<script>
import DataService from "../services/DataService";
import router from "../router/index";

export default {
  name: "Login",
  data() {
    return {
      user: {
        id: null,
        email: "",
        psw: "",
      },
    };
  },
  //fonction to hide buttons
  mounted() {
    if (router.currentRoute.value.name == "login") {
      console.log("ok");
      document.getElementById("hidden").style.display = "none";
    }
  },
  methods: {
    delayedFunction() {
      location.reload();
    },
    checkUser() {
      var data = {
        email: this.user.email,
        psw: this.user.psw,
      };
      DataService.log(data)
        .then((response) => {
          if (response.data.token) {
            sessionStorage.setItem("token", response.data.token);
            sessionStorage.setItem("userName", data.email);
            router.push("/actu");
            window.setTimeout(this.delayedFunction, 500);
          }
        })
        .catch((e) => {
          console.log(e);
          document.getElementById("error").innerHTML = e.response.data.message;
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
