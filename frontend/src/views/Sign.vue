<template>
  <div>
    <h1>Inscription</h1>
    <p>Merci de remplir le formulaire ci-dessous pour vous inscrire</p>
    <hr />

    <div>
      <label for="email">Nom d'utilisateur</label>
      <input type="text" id="email" required v-model="user.email" name="email" />
      <p class="errorMessage"></p>
    </div>
    <div>
      <label for="psw">Mot de passe</label>
      <input type="password" id="psw" required v-model="user.psw" name="psw" />
      <p class="errorMessage"></p>
      <button @click="saveUser" id="sign">S'inscrire</button>
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
        .catch((err) => {
          document.getElementById("error").innerHTML = err;
          console.log(err);
        });
    },
    //fonction to validate inputs
    validation(champ) {
      let target = champ.target;
      let valeur = target.value;
      let titreChamp = target.id;
      let messageErreur = target.nextElementSibling;
      const masques = {
        email: /^[a-zA-Z0-9_-]{4,15}$/g,
        psw: /^[a-zA-Z0-9_\-#?!@$ %^&*]{4,15}$/g,
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
            this.user.email = "";
            messageErreur.innerHTML = erreur[i];
          }
        }
      }
    },
  },
  //fonction to hide buttons
  mounted() {
    let coordonnees = document.querySelectorAll("input");
    coordonnees.forEach((x) => x.addEventListener("change", this.validation));
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
  margin-top: 25px;
  width: 25%;
  font-size: 12px;
  background-color: white;
  color: black;
}

/* sign size */
#sign {
  font-size: 20px;
}

/* big red error */
#error {
  color: red;
  font-size: 24px;
}
</style>
