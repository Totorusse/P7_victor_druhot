import axios from "axios";
export default axios.create({
  baseURL: "https://www.projet-ora.com/",
  headers: {
    "Content-type": "application/json",
  },
});

//Dev   baseURL: "http://localhost:3000/",
//Prod     baseURL: "https://www.projet-ora.com/",
