//const fs = require("fs");
const db = require("../models");
const Perso = db.perso;
const User = db.user;
const Stuff = db.stuff;
const { Op } = require("sequelize");

exports.getAllInfo = (req, res, next) => {
  let userName = req.query.userSession;
  Promise.all([
    User.findAll({
      attributes: ["heros"],
      where: {
        email: userName,
      },
    }),
    Perso.findAll(),
    User.findAll({
      attributes: [
        "Slot1",
        "Slot2",
        "Slot3",
        "Slot4",
        "Slot5",
        "Slot6",
        "Slot7",
        "Slot8",
        "Slot9",
        "Slot10",
        "Slot11",
        "Slot12",
        "Slot13",
        "Slot14",
        "Slot15",
        "Slot16",
      ],
      where: {
        email: userName,
      },
    }),
    Stuff.findAll(),
  ])
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
};

exports.getItemCode = (req, res, next) => {
  console.log(req.body.code);
  Promise.all([
    Stuff.findAll({
      where: {
        code: req.body.code,
      },
    }),
  ])
    .then((item) =>
      res.send({
        item,
      })
    )
    .catch((error) => {
      res.status(400)({
        error,
      });
    });
};

// Put item  in character empty slot
exports.itemPut = (req, res, next) => {
  const obj = req.body;
  console.log(obj);
  Promise.all([
    User.update(
      {
        Slot1: obj.Slot1,
        Slot2: obj.Slot2,
        Slot3: obj.Slot3,
        Slot4: obj.Slot4,
        Slot5: obj.Slot5,
        Slot6: obj.Slot6,
        Slot7: obj.Slot7,
        Slot8: obj.Slot8,
        Slot9: obj.Slot9,
        Slot10: obj.Slot10,
        Slot11: obj.Slot11,
        Slot12: obj.Slot12,
        Slot13: obj.Slot13,
        Slot14: obj.Slot14,
        Slot15: obj.Slot15,
        Slot16: obj.Slot16,
      },
      {
        where: {
          email: obj.user,
        },
      }
    ),
    Stuff.update(
      { isUsed: 1 },
      {
        where: {
          id: obj.updatedSlotId,
        },
      }
    ),
  ])

    .then((data) => {
      if (data) {
        res.send({
          message: "Objet ajouté !",
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
