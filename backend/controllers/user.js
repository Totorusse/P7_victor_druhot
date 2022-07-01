const db = require("../models");
const User = db.user;
const Gift = db.gift;
const Perso = db.perso;
const Stuff = db.stuff;

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
    { heros: obj.heros.nom, isConnected: obj.isConnected },
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
            token: jwt.sign({ userId: user._id }, "RANDOM_TOKEN_SECRET", { expiresIn: "24h" }),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

// Put  item  in character hands
exports.equipItem = (req, res, next) => {
  const obj = req.body;
  console.log(obj);
  Promise.all([
    User.update(
      {
        mainG: obj.mainG,
        mainD: obj.mainD,
        slot1: obj.slot1,
        slot2: obj.slot2,
        slot3: obj.slot3,
        slot4: obj.slot4,
        slot5: obj.slot5,
        slot6: obj.slot6,
        slot7: obj.slot7,
        slot8: obj.slot8,
        slot9: obj.slot9,
        slot10: obj.slot10,
        slot11: obj.slot11,
        slot12: obj.slot12,
        slot13: obj.slot13,
        slot14: obj.slot14,
        slot15: obj.slot15,
        slot16: obj.slot16,
      },
      {
        where: {
          email: obj.user,
        },
      }
    ),
  ])
    .then((data) => {
      if (data) {
        res.send({
          message: "Objet équipé !",
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

// Give  item  to other  character
exports.giveItem = (req, res, next) => {
  const obj = req.body;
  console.log(obj);
  Promise.all([
    User.update(
      {
        slot1: obj.slot1,
        slot2: obj.slot2,
        slot3: obj.slot3,
        slot4: obj.slot4,
        slot5: obj.slot5,
        slot6: obj.slot6,
        slot7: obj.slot7,
        slot8: obj.slot8,
        slot9: obj.slot9,
        slot10: obj.slot10,
        slot11: obj.slot11,
        slot12: obj.slot12,
        slot13: obj.slot13,
        slot14: obj.slot14,
        slot15: obj.slot15,
        slot16: obj.slot16,
      },
      {
        where: {
          email: obj.user,
        },
      }
    ),
    /*  User.update(
      {
        received: obj.itemToGive,
      },
      {
        where: {
          email: obj.receiver,
        },
      }
    ),*/
  ])
    .then((data) => {
      if (data) {
        res.send({
          message: "Objet donné !",
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

// Give  EQUIPED item  to other  character
exports.giveEquipedItem = (req, res, next) => {
  const obj = req.body;
  console.log(obj);
  Promise.all([
    User.update(
      {
        mainG: obj.mainG,
        mainD: obj.mainD,
      },
      {
        where: {
          email: obj.user,
        },
      }
    ),
    /*
    User.update(
      {
        received: obj.itemToGive,
      },
      {
        where: {
          email: obj.receiver,
        },
      }
    ),*/
  ])
    .then((data) => {
      if (data) {
        res.send({
          message: "Objet donné !",
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

// Received  item in bag
exports.receivedItem = (req, res, next) => {
  const obj = req.body;
  console.log(obj);
  Promise.all([
    User.update(
      {
        slot1: obj.slot1,
        slot2: obj.slot2,
        slot3: obj.slot3,
        slot4: obj.slot4,
        slot5: obj.slot5,
        slot6: obj.slot6,
        slot7: obj.slot7,
        slot8: obj.slot8,
        slot9: obj.slot9,
        slot10: obj.slot10,
        slot11: obj.slot11,
        slot12: obj.slot12,
        slot13: obj.slot13,
        slot14: obj.slot14,
        slot15: obj.slot15,
        slot16: obj.slot16,
        received: obj.receivedItem,
      },
      {
        where: {
          email: obj.user,
        },
      }
    ),
    Gift.destroy({
      where: { item: obj.receivedItem },
    }),
  ])
    .then((data) => {
      if (data) {
        res.send({
          message: "Objet dans l'inventaire !",
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

exports.getAll = (req, res, next) => {
  Promise.all([
    User.findAll({
      where: {
        isConnected: true,
      },
      attributes: { exclude: ["psw"] },
    }),
    Perso.findAll(),
    Gift.findAll(),
    Stuff.findAll(),
  ])
    .then((allInfo) =>
      res.send({
        allInfo,
      })
    )
    .catch((error) => {
      res.status(400)({
        error,
      });
    });
};
