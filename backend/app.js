const express = require("express");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/user");
const actuRoutes = require("./routes/actu");
const persoRoutes = require("./routes/perso");
const path = require("path");

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
  next();
});

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

//liste des routes de l'application
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/", userRoutes);
app.use("/", actuRoutes);
app.use("/", persoRoutes);

module.exports = app;
