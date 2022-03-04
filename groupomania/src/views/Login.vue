<template>
  <div>
    <h1>Connexion</h1>
    <hr />
    <div>
      <label for="email">Nom d'utilisateur</label>
      <input type="text" class="form-control" id="email" required v-model="user.email" name="email" />
      <p class="errorMessage"></p>
    </div>
    <div>
      <label for="psw">Mot de passe</label>
      <input type="password" id="psw" required v-model="user.psw" name="psw" />
      <p class="errorMessage"></p>

      <button @click="checkUser" id="log">Se connecter</button>
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
      document.getElementById("hidden").style.display = "none";
    }
    let coordonnees = document.querySelectorAll("input");
    coordonnees.forEach((x) => x.addEventListener("change", this.validation));
  },
  methods: {
    //fonction to validate inputs
    validation(champ) {
      let target = champ.target;
      let valeur = target.value;
      let titreChamp = target.id;
      let messageErreur = target.nextElementSibling;
      const masques = {
        email: /^[a-z0-9_-]{4,15}$/g,
        psw: /^([a-z0-9_\-#?!@$ %^&*]).{3,}$/g,
      };
      const erreur = {
        email: "Veuillez saisir un champ correct (minimum 4 caractères alphanumérique)",
        psw: "Veuillez saisir un champ correct (minimum 4 caractères)",
      };
      for (let i in masques) {
        if (i == titreChamp) {
          if (valeur.match(masques[i]) != null) {
            messageErreur.innerHTML = "";
          } else {
            valeur = "";
            messageErreur.innerHTML = erreur[i];
          }
        }
      }
    },
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
  margin: 30px 0;
  display: inline-block;
  border: 1px solid #ccc;
  box-sizing: border-box;
}

/* Set a style for  button */
button {
  background-color: #ffd7d7;
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

/* label size */
label {
  font-size: 20px;
  margin: 20px;
}

/* log size */
#log {
  font-size: 20px;
}

/* Small size for return button */
.retour {
  margin-top: 25px;
  width: 25%;
  font-size: 12px;
  background-color: white;
  color: black;
}

/* big red error */
#error {
  color: red;
  font-size: 24px;
}
</style>
