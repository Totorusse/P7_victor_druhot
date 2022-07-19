<template>
  <div>
    <div class="main">
      <h1>ORA</h1>
      <h2>L'appel souterrain</h2>
      <div class="logo"><img id="logo" src="../assets/Logo_accueil.svg" /></div>
    </div>
    <h2>INSCRIPTION</h2>

    <div>
      <label for="email">Identifiant</label>
      <input type="text" id="email" required v-model="user.email" name="email" />
      <p class="errorMessage"></p>
    </div>
    <div>
      <label for="psw">Mot de passe</label>
      <input type="password" id="psw" required v-model="user.psw" name="psw" />
      <p class="errorMessage"></p>
      <button @click="saveUser" id="sign">CR&Eacute;ER LE COMPTE</button>
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
h1 {
  color: #ffb300;
  letter-spacing: 8px;
}
h2 {
  font-size: 18px;
  letter-spacing: 4px;
}

/* Full-width inputs */
input[type="text"],
input[type="password"] {
  width: 100%;
  padding: 12px 20px;
  display: inline-block;
  border: 1px solid #ccc;
  box-sizing: border-box;
  border: none;
  border-radius: 5px;
  background-color: #2a3849;
}

input::placeholder {
  color: white;
  letter-spacing: 2px;
}

/* Small size for return button */
.retour {
  font-size: 12px;
  background-color: #122542;
  color: gray;
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

/* Set  size for logo */
.logo {
  display: flex;
  justify-content: center;
  padding: 25px;
}
#logo {
  position: relative;
  width: 70px;
}
.main {
  margin-top: 150px;
}
</style>
