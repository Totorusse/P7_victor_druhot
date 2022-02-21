const db = require("../models");
const User = db.user;
const sequelize = require("sequelize");
const Op = db.Sequelize.Op;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Create and Save a new user
exports.create = (req, res) => {
  // Validate request
  if (!req.body.email || !req.body.psw) {
    res.status(400).send({
      message: "Remplir le formulaire!",
    });
    return;
  }
  // Create a user
  const user = {
    email: req.body.email,
    psw: req.body.psw,
  };
  // Save user in the database
  User.create(user)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message + " : Email already exists or wrong password",
      });
    });
};

// Retrieve user from the database.
exports.login = (req, res, next) => {
  User.findOne({ where: { email: req.body.email } })
    .then((data) => {
      if (!data) {
        return res.status(500).send({ message: "Utilisateur non trouvé !" });
      } else if (data.psw != req.body.psw) {
        return res.status(500).send({ message: "Mot de passe non valide !" });
      }
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Utilisateur non trouvé !",
      });
    });
};


// Update a Tutorial by the id in the request
exports.update = (req, res) => {};
// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {};
// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {};
// Find all published Tutorials
exports.findAllPublished = (req, res) => {};
