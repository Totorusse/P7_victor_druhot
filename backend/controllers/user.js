const db = require("../models");
const User = db.user;
const Comment = db.comment;
const sequelize = require("sequelize");
const Op = db.Sequelize.Op;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Create and Save a new user
exports.create = (req, res) => {
  try {
    // Validate request
    if (!req.body.email || !req.body.psw) {
      res.status(400).send({
        message: "Remplir le formulaire!",
      });
      return;
    }
    User.findOne({ where: { email: req.body.email } }).then((user) => {
      if (user) {
        return res.status(500).send({ message: "Utilisateur ou mot de passe erroné !" });
      }
      bcrypt.hash(req.body.psw, 10).then((hash) => {
        // Create a user
        const user = {
          email: req.body.email,
          psw: hash,
        };
        // Save user in the database
        User.create(user).then((data) => {
          res.send(data);
        });
      });
    });
  } catch (err) {
    res.status(500).json({ error });
  }
};

// Put chosen character in DB
exports.choosePerso = (req, res, next) => {
  const obj = req.body;
  console.log(obj);
  User.update(
    { heros: obj.heros },
    {
      where: {
        email: obj.user,
      },
    }
  )
    .then((data) => {
      if (data) {
        res.send({
          message: "Heros choisi !",
        });
      } else {
        res.send({
          message: `Erreur survenue!`,
        });
      }
    })
    .catch(() => {
      res.status(500).send({
        message: "Error updating",
      });
    });
};

// Retrieve user from the database.
exports.login = (req, res, next) => {
  User.findOne({ where: { email: req.body.email } })
    .then((user) => {
      if (!user) {
        return res.status(500).send({ message: "Utilisateur ou mot de passe erroné !" });
      }
      bcrypt
        .compare(req.body.psw, user.psw)
        .then((valid) => {
          if (!valid) {
            return res.status(401).send({ message: "Utilisateur ou mot de passe erroné !" });
          }
          res.status(200).json({
            admin: user.isAdmin,
            token: jwt.sign({ userId: user._id }, "RANDOM_TOKEN_SECRET", { expiresIn: "2h" }),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

// Delete user from the database.
exports.deleteProfile = (req, res, next) => {
  const user = req.body.user;

  Promise.all([
    User.destroy({
      where: { email: user },
    }),
    Actu.destroy({
      where: { userName: user },
    }),
    Comment.destroy({
      where: { userName: user },
    }),
  ])
    .then((data) => {
      if (data) {
        res.send({
          message: "User was deleted successfully!",
        });
      } else {
        res.send({
          message: "Cannot delete User",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete User ",
      });
    });
};

exports.getAllUsers = (req, res, next) => {
  Promise.all([
    User.findAll({
      attributes: ["email", "heros"],
    }),
  ])
    .then((users) =>
      res.send({
        users,
      })
    )
    .catch((error) => {
      res.status(400)({
        error,
      });
    });
};
