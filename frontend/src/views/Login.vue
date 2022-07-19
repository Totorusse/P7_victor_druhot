<template>
  <div>
    <div class="main">
      <h1>ORA</h1>
      <h2>L'appel souterrain</h2>
      <div class="logo"><img id="logo" src="../assets/Logo_accueil.svg" /></div>
    </div>
    <div>
      <input
        type="text"
        class="form-control"
        id="email"
        required
        v-model="user.email"
        name="email"
        placeholder="Identifiant"
      />
      <p class="errorMessage"></p>
    </div>
    <div>
      <input type="password" id="psw" required v-model="user.psw" name="psw" placeholder="**********" />
      <p class="errorMessage"></p>

      <button class="button1" @click="checkUser" id="log">CONNEXION</button>
      <p id="error"></p>
    </div>
    <router-link to="/sign" class="retour">Créer un compte</router-link>
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
            sessionStorage.setItem("isConnected", true);
            if (response.data.admin === true) {
              router.push("/admin");
              window.setTimeout(this.delayedFunction, 500);
            } else {
              router.push("/perso");
              window.setTimeout(this.delayedFunction, 500);
            }
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
  display: inline-block;
  border: 1px solid #ccc;
  box-sizing: border-box;
  border: none;
  border-radius: 5px;
  background-color: #2a3849;
  color: white;
}

input::placeholder {
  color: white;
  letter-spacing: 2px;
}

/* log size */
#log {
  font-size: 20px;
}

/* Small size for return button */
.retour {
  font-size: 12px;
  background-color: #122542;
  color: gray;
}

/* big red error */
#error {
  color: red;
  font-size: 24px;
}
/* Add a hover effect for links */
h1 {
  color: #ffb300;
  letter-spacing: 8px;
}
h2 {
  font-size: 18px;
  letter-spacing: 4px;
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
